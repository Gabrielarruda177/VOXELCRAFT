/**
 * Chunk — a 16×64×16 volume of blocks.
 *
 * Builds optimized mesh with face culling using a world-block callback
 * for correct cross-chunk border culling. UV-mapped to texture atlas.
 */

import * as THREE from 'three';
import { BlockType, BlockTextures, isTransparent } from './blockTypes.js';
import { getUVsForTexture, getAtlasTexture } from '../rendering/textures/textureAtlas.js';

export const CHUNK_WIDTH = 16;
export const CHUNK_HEIGHT = 64;

const FACES = [
  {
    name: 'top', dir: [0, 1, 0], colorKey: 'top',
    vertices: [[0,1,1],[1,1,1],[1,1,0],[0,1,0]],
    localUVs: [[0,0],[1,0],[1,1],[0,1]],
  },
  {
    name: 'bottom', dir: [0,-1,0], colorKey: 'bottom',
    vertices: [[0,0,0],[1,0,0],[1,0,1],[0,0,1]],
    localUVs: [[0,0],[1,0],[1,1],[0,1]],
  },
  {
    name: 'north', dir: [0,0,-1], colorKey: 'side',
    vertices: [[1,0,0],[0,0,0],[0,1,0],[1,1,0]],
    localUVs: [[0,0],[1,0],[1,1],[0,1]],
  },
  {
    name: 'south', dir: [0,0,1], colorKey: 'side',
    vertices: [[0,0,1],[1,0,1],[1,1,1],[0,1,1]],
    localUVs: [[0,0],[1,0],[1,1],[0,1]],
  },
  {
    name: 'east', dir: [1,0,0], colorKey: 'side',
    vertices: [[1,0,1],[1,0,0],[1,1,0],[1,1,1]],
    localUVs: [[0,0],[1,0],[1,1],[0,1]],
  },
  {
    name: 'west', dir: [-1,0,0], colorKey: 'side',
    vertices: [[0,0,0],[0,0,1],[0,1,1],[0,1,0]],
    localUVs: [[0,0],[1,0],[1,1],[0,1]],
  },
];

let sharedMaterial = null;
let waterMaterial = null;

function getSharedMaterial() {
  if (!sharedMaterial) {
    sharedMaterial = new THREE.MeshLambertMaterial({
      map: getAtlasTexture(),
      alphaTest: 0.2,
      side: THREE.DoubleSide,
    });
  }
  return sharedMaterial;
}

function getWaterMaterial() {
  if (!waterMaterial) {
    waterMaterial = new THREE.MeshLambertMaterial({
      map: getAtlasTexture(),
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }
  return waterMaterial;
}

export class Chunk {
  constructor(cx = 0, cy = 0, cz = 0) {
    this.cx = cx;
    this.cy = cy;
    this.cz = cz;
    this.blocks = new Uint8Array(CHUNK_WIDTH * CHUNK_WIDTH * CHUNK_HEIGHT);
    this.mesh = null;
  }

  _index(x, y, z) {
    return x + z * CHUNK_WIDTH + y * CHUNK_WIDTH * CHUNK_WIDTH;
  }

  getBlock(x, y, z) {
    if (x < 0 || x >= CHUNK_WIDTH || y < 0 || y >= CHUNK_HEIGHT || z < 0 || z >= CHUNK_WIDTH) {
      return BlockType.AIR;
    }
    return this.blocks[this._index(x, y, z)];
  }

  setBlock(x, y, z, type) {
    if (x < 0 || x >= CHUNK_WIDTH || y < 0 || y >= CHUNK_HEIGHT || z < 0 || z >= CHUNK_WIDTH) return;
    this.blocks[this._index(x, y, z)] = type;
  }

  /**
   * Build chunk mesh with face culling.
   * Returns { solidMesh, waterMesh } — water is separate for transparency.
   * @param {Function} [getWorldBlock] - (wx, wy, wz) => blockType
   * @returns {{ solidMesh: THREE.Mesh, waterMesh: THREE.Mesh|null }}
   */
  buildMesh(getWorldBlock) {
    const solidPos = [], solidNorm = [], solidUV = [], solidIdx = [];
    const waterPos = [], waterNorm = [], waterUV = [], waterIdx = [];
    let solidVC = 0, waterVC = 0;

    const ox = this.cx * CHUNK_WIDTH;
    const oy = this.cy * CHUNK_HEIGHT;
    const oz = this.cz * CHUNK_WIDTH;

    for (let y = 0; y < CHUNK_HEIGHT; y++) {
      for (let z = 0; z < CHUNK_WIDTH; z++) {
        for (let x = 0; x < CHUNK_WIDTH; x++) {
          const blockType = this.getBlock(x, y, z);
          if (blockType === BlockType.AIR) continue;

          const isWater = blockType === BlockType.WATER;
          const textures = BlockTextures[blockType];
          if (!textures) continue;

          const isPlant = (
            blockType === BlockType.FLOWER_RED ||
            blockType === BlockType.FLOWER_YELLOW ||
            blockType === BlockType.WHEAT_STAGE_1 ||
            blockType === BlockType.WHEAT_STAGE_2 ||
            blockType === BlockType.WHEAT_STAGE_3
          );
          const isTorch = blockType === BlockType.TORCH;

          // ── Cross-Billboard Mesh for Flowers & Crops (X-Mesh) ─
          if (isPlant) {
            const texIdx = textures.top;
            const atlasUV = getUVsForTexture(texIdx);

            const diagQuads = [
              // Diagonal 1: (0.12, 0, 0.12) -> (0.88, 1, 0.88)
              [
                [0.12, 0.0, 0.12, 0, 0],
                [0.88, 0.0, 0.88, 1, 0],
                [0.88, 1.0, 0.88, 1, 1],
                [0.12, 1.0, 0.12, 0, 1],
              ],
              // Diagonal 2: (0.12, 0, 0.88) -> (0.88, 1, 0.12)
              [
                [0.12, 0.0, 0.88, 0, 0],
                [0.88, 0.0, 0.12, 1, 0],
                [0.88, 1.0, 0.12, 1, 1],
                [0.12, 1.0, 0.88, 0, 1],
              ],
            ];

            for (const q of diagQuads) {
              for (let i = 0; i < 4; i++) {
                const [vx, vy, vz, lu, lv] = q[i];
                solidPos.push(x + vx, y + vy, z + vz);
                solidNorm.push(0, 1, 0);
                solidUV.push(
                  atlasUV.uMin + lu * (atlasUV.uMax - atlasUV.uMin),
                  atlasUV.vMin + lv * (atlasUV.vMax - atlasUV.vMin)
                );
              }
              solidIdx.push(solidVC, solidVC + 1, solidVC + 2, solidVC, solidVC + 2, solidVC + 3);
              solidVC += 4;
            }
            continue;
          }

          // ── Centered 3D Model for Placed Torches ───────────────
          if (isTorch) {
            const texIdx = textures.top;
            const atlasUV = getUVsForTexture(texIdx);

            const x0 = 0.42, x1 = 0.58;
            const z0 = 0.42, z1 = 0.58;
            const y0 = 0.0, y1 = 0.65;

            const torchFaces = [
              // Top cap (Flame head)
              [[x0, y1, z1, 0, 1], [x1, y1, z1, 1, 1], [x1, y1, z0, 1, 0], [x0, y1, z0, 0, 0], 0, 1, 0],
              // Front
              [[x0, y0, z1, 0, 0], [x1, y0, z1, 1, 0], [x1, y1, z1, 1, 1], [x0, y1, z1, 0, 1], 0, 0, 1],
              // Back
              [[x1, y0, z0, 0, 0], [x0, y0, z0, 1, 0], [x0, y1, z0, 1, 1], [x1, y1, z0, 0, 1], 0, 0, -1],
              // Left
              [[x0, y0, z0, 0, 0], [x0, y0, z1, 1, 0], [x0, y1, z1, 1, 1], [x0, y1, z0, 0, 1], -1, 0, 0],
              // Right
              [[x1, y0, z1, 0, 0], [x1, y0, z0, 1, 0], [x1, y1, z0, 1, 1], [x1, y1, z1, 0, 1], 1, 0, 0],
            ];

            for (const tf of torchFaces) {
              for (let i = 0; i < 4; i++) {
                const [vx, vy, vz, lu, lv] = tf[i];
                solidPos.push(x + vx, y + vy, z + vz);
                solidNorm.push(tf[4], tf[5], tf[6]);
                solidUV.push(
                  atlasUV.uMin + lu * (atlasUV.uMax - atlasUV.uMin),
                  atlasUV.vMin + lv * (atlasUV.vMax - atlasUV.vMin)
                );
              }
              solidIdx.push(solidVC, solidVC + 1, solidVC + 2, solidVC, solidVC + 2, solidVC + 3);
              solidVC += 4;
            }
            continue;
          }

          for (const face of FACES) {
            const nx = x + face.dir[0];
            const ny = y + face.dir[1];
            const nz = z + face.dir[2];

            let neighbor;
            if (nx >= 0 && nx < CHUNK_WIDTH && ny >= 0 && ny < CHUNK_HEIGHT && nz >= 0 && nz < CHUNK_WIDTH) {
              neighbor = this.getBlock(nx, ny, nz);
            } else if (getWorldBlock) {
              neighbor = getWorldBlock(ox + nx, oy + ny, oz + nz);
            } else {
              neighbor = BlockType.AIR;
            }

            if (isWater) {
              // Water: only render face if neighbor is air (or out of water)
              if (neighbor !== BlockType.AIR) continue;
            } else {
              // Solid: show face if neighbor is transparent (air or water)
              if (!isTransparent(neighbor)) continue;
            }

            const texIdx = textures[face.colorKey];
            const atlasUV = getUVsForTexture(texIdx);

            const pos = isWater ? waterPos : solidPos;
            const norm = isWater ? waterNorm : solidNorm;
            const uv = isWater ? waterUV : solidUV;
            const idx = isWater ? waterIdx : solidIdx;
            const vc = isWater ? waterVC : solidVC;

            for (let i = 0; i < 4; i++) {
              const v = face.vertices[i];
              pos.push(x + v[0], y + v[1], z + v[2]);
              norm.push(face.dir[0], face.dir[1], face.dir[2]);

              const lu = face.localUVs[i][0];
              const lv = face.localUVs[i][1];
              uv.push(
                atlasUV.uMin + lu * (atlasUV.uMax - atlasUV.uMin),
                atlasUV.vMin + lv * (atlasUV.vMax - atlasUV.vMin),
              );
            }

            idx.push(vc, vc + 1, vc + 2, vc, vc + 2, vc + 3);
            if (isWater) waterVC += 4; else solidVC += 4;
          }
        }
      }
    }

    let solidMesh = this._makeMesh(solidPos, solidNorm, solidUV, solidIdx, getSharedMaterial());
    solidMesh.position.set(ox, oy, oz);
    this.mesh = solidMesh;

    let waterMesh = null;
    if (waterPos.length > 0) {
      waterMesh = this._makeMesh(waterPos, waterNorm, waterUV, waterIdx, getWaterMaterial());
      waterMesh.position.set(ox, oy, oz);
      waterMesh.renderOrder = 1;
    }

    return { solidMesh, waterMesh };
  }

  _makeMesh(pos, norm, uv, idx, material) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(norm, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geometry.setIndex(idx);
    return new THREE.Mesh(geometry, material);
  }

  dispose() {
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.mesh = null;
    }
  }
}
