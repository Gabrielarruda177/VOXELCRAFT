/**
 * Chunk — a 16×64×16 volume of blocks.
 *
 * Builds optimized mesh with face culling using a world-block callback
 * for correct cross-chunk border culling. UV-mapped to texture atlas.
 *
 * Fluids (WATER / LAVA) are stored in a parallel `fluid` array holding one
 * 8-bit level per voxel (see FLUID_* constants in blockTypes.js) and are
 * meshed as dynamic partial-height columns into their own transparent /
 * emissive meshes so flowing fluids render exactly like Minecraft.
 */

import * as THREE from 'three';
import {
  BlockType,
  BlockTextures,
  isTransparent,
  getFluidHeight,
  FLUID_STATIC,
} from './blockTypes.js';
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
let lavaMaterial = null;

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
      opacity: 0.72,
      side: THREE.FrontSide,
      depthWrite: false,
    });

    // Gentle animated swell on the water surface (vertex-stage only, zero cost
    // on the CPU). `aWave.x` flags surface vertices, `aWave.y` carries a
    // world-space phase so the wave stays continuous across chunk borders.
    waterMaterial.userData.time = { value: 0 };
    waterMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uFluidTime = waterMaterial.userData.time;
      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          '#include <common>\nattribute vec2 aWave;\nuniform float uFluidTime;'
        )
        .replace(
          '#include <begin_vertex>',
          '#include <begin_vertex>\ntransformed.y += aWave.x * sin(uFluidTime * 1.55 + aWave.y) * 0.045;'
        );
    };
    waterMaterial.customProgramCacheKey = () => 'voxelcraft-fluid-surface-wave';
  }
  return waterMaterial;
}

function getLavaMaterial() {
  if (!lavaMaterial) {
    const atlas = getAtlasTexture();
    lavaMaterial = new THREE.MeshLambertMaterial({
      map: atlas,
      emissive: 0xff7a12,
      emissiveMap: atlas,
      emissiveIntensity: 0.95,
      side: THREE.FrontSide,
    });
  }
  return lavaMaterial;
}

/**
 * Advance the animated water surface shader clock.
 * @param {number} time - elapsed seconds
 */
export function updateFluidShaderTime(time) {
  if (waterMaterial && waterMaterial.userData.time) {
    waterMaterial.userData.time.value = time;
  }
}

export class Chunk {
  constructor(cx = 0, cy = 0, cz = 0) {
    this.cx = cx;
    this.cy = cy;
    this.cz = cz;
    this.blocks = new Uint8Array(CHUNK_WIDTH * CHUNK_WIDTH * CHUNK_HEIGHT);
    this.fluid = new Uint8Array(CHUNK_WIDTH * CHUNK_WIDTH * CHUNK_HEIGHT);
    this.mesh = null;
    this.waterMesh = null;
    this.lavaMesh = null;
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
   * Fluid level stored alongside the block grid.
   * 0 = source, 1..7 = flowing, FLUID_STATIC = inert world-generated fluid.
   */
  getFluidLevel(x, y, z) {
    if (x < 0 || x >= CHUNK_WIDTH || y < 0 || y >= CHUNK_HEIGHT || z < 0 || z >= CHUNK_WIDTH) {
      return 0;
    }
    return this.fluid[this._index(x, y, z)];
  }

  setFluidLevel(x, y, z, level) {
    if (x < 0 || x >= CHUNK_WIDTH || y < 0 || y >= CHUNK_HEIGHT || z < 0 || z >= CHUNK_WIDTH) return;
    this.fluid[this._index(x, y, z)] = level;
  }

  /**
   * Write a block and keep the fluid metadata consistent.
   * Non-fluid blocks always have their fluid level cleared.
   */
  setBlockWithFluid(x, y, z, type, level) {
    this.setBlock(x, y, z, type);
    const isFluidBlock = type === BlockType.WATER || type === BlockType.LAVA;
    this.setFluidLevel(x, y, z, isFluidBlock ? (level || 0) : 0);
  }

  /**
   * Build chunk mesh with face culling.
   * Returns { solidMesh, waterMesh, lavaMesh } — fluids live in their own
   * meshes (translucent water, emissive lava).
   * @param {Function} [getWorldBlock] - (wx, wy, wz) => blockType
   * @param {Function} [getWorldFluid] - (wx, wy, wz) => fluidLevel
   * @returns {{ solidMesh: THREE.Mesh, waterMesh: THREE.Mesh|null, lavaMesh: THREE.Mesh|null }}
   */
  buildMesh(getWorldBlock, getWorldFluid) {
    const solidPos = [], solidNorm = [], solidUV = [], solidIdx = [];
    let solidVC = 0;

    const makeFluidBucket = () => ({ pos: [], norm: [], uv: [], idx: [], wave: [], vc: 0 });
    const water = makeFluidBucket();
    const lava = makeFluidBucket();

    const ox = this.cx * CHUNK_WIDTH;
    const oy = this.cy * CHUNK_HEIGHT;
    const oz = this.cz * CHUNK_WIDTH;

    // ── Neighbour samplers with correct cross-chunk fallback ──
    const sampleType = (x, y, z) => {
      if (x >= 0 && x < CHUNK_WIDTH && y >= 0 && y < CHUNK_HEIGHT && z >= 0 && z < CHUNK_WIDTH) {
        return this.getBlock(x, y, z);
      }
      return getWorldBlock ? getWorldBlock(ox + x, oy + y, oz + z) : BlockType.AIR;
    };
    const sampleLevel = (x, y, z) => {
      if (x >= 0 && x < CHUNK_WIDTH && y >= 0 && y < CHUNK_HEIGHT && z >= 0 && z < CHUNK_WIDTH) {
        return this.getFluidLevel(x, y, z);
      }
      return getWorldFluid ? getWorldFluid(ox + x, oy + y, oz + z) : FLUID_STATIC;
    };

    /**
     * Push a single quad described as [vx, vy, vz, lu, lv] tuples.
     */
    const pushQuad = (b, quad, nx, ny, nz, atlasUV, waveFlag, wavePhase) => {
      for (let i = 0; i < 4; i++) {
        const v = quad[i];
        b.pos.push(v[0], v[1], v[2]);
        b.norm.push(nx, ny, nz);
        b.uv.push(
          atlasUV.uMin + v[3] * (atlasUV.uMax - atlasUV.uMin),
          atlasUV.vMin + v[4] * (atlasUV.vMax - atlasUV.vMin)
        );
        b.wave.push(waveFlag, wavePhase);
      }
      b.idx.push(b.vc, b.vc + 1, b.vc + 2, b.vc, b.vc + 2, b.vc + 3);
      b.vc += 4;
    };

    // Side face templates, parameterised by their vertical span [y0, y1].
    const sideQuad = (dir, x, y0, y1, z) => {
      switch (dir) {
        case 'north': return [[1,y0,0,0,0],[0,y0,0,1,0],[0,y1,0,1,1],[1,y1,0,0,1]];
        case 'south': return [[0,y0,1,0,0],[1,y0,1,1,0],[1,y1,1,1,1],[0,y1,1,0,1]];
        case 'east':  return [[1,y0,1,0,0],[1,y0,0,1,0],[1,y1,0,1,1],[1,y1,1,0,1]];
        default:      return [[0,y0,0,0,0],[0,y0,1,1,0],[0,y1,1,1,1],[0,y1,0,0,1]];
      }
    };
    const SIDE_DIRS = [
      ['north', 0, 0, -1, 0, 0, -1],
      ['south', 0, 0, 1, 0, 0, 1],
      ['east', 1, 0, 0, 1, 0, 0],
      ['west', -1, 0, 0, -1, 0, 0],
    ];

    for (let y = 0; y < CHUNK_HEIGHT; y++) {
      for (let z = 0; z < CHUNK_WIDTH; z++) {
        for (let x = 0; x < CHUNK_WIDTH; x++) {
          const blockType = this.getBlock(x, y, z);
          if (blockType === BlockType.AIR) continue;

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

          // ══ Dynamic Fluid Column (Água / Lava) ══════════════
          if (blockType === BlockType.WATER || blockType === BlockType.LAVA) {
            const bucket = blockType === BlockType.WATER ? water : lava;
            const level = this.getFluidLevel(x, y, z);
            const atlasUV = getUVsForTexture(textures.top);
            const phase = (ox + x) * 0.62 + (oz + z) * 0.83;

            const aboveSame = sampleType(x, y + 1, z) === blockType;
            const belowSame = sampleType(x, y - 1, z) === blockType;

            // A fluid with the same fluid on top of it is always a full column.
            const topY = aboveSame ? y + 1 : y + getFluidHeight(level);

            if (!aboveSame) {
              pushQuad(bucket, [
                [x, topY, z + 1, 0, 0],
                [x + 1, topY, z + 1, 1, 0],
                [x + 1, topY, z, 1, 1],
                [x, topY, z, 0, 1],
              ], 0, 1, 0, atlasUV, 1, phase);
            }

            if (!belowSame) {
              pushQuad(bucket, [
                [x, y, z, 0, 0],
                [x + 1, y, z, 1, 0],
                [x + 1, y, z + 1, 1, 1],
                [x, y, z + 1, 0, 1],
              ], 0, -1, 0, atlasUV, 0, phase);
            }

            const colTop = topY - y;
            for (const [name, dx, dy, dz, nx, ny, nz] of SIDE_DIRS) {
              const nType = sampleType(x + dx, y + dy, z + dz);

              let bottomY = y;
              if (nType === blockType) {
                // Same fluid on the side: only the lip above the (lower)
                // neighbour surface is visible, exactly like Minecraft.
                const nAbove = sampleType(x + dx, y + dy + 1, z + dz) === blockType;
                const nHeight = nAbove ? 1 : getFluidHeight(sampleLevel(x + dx, y + dy, z + dz));
                if (nHeight >= colTop - 1e-4) continue;
                bottomY = y + nHeight;
              }

              pushQuad(
                bucket,
                sideQuad(name, x, bottomY, topY, z),
                nx, ny, nz, atlasUV,
                0, phase
              );
            }

            continue;
          }

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
            const neighbor = sampleType(x + face.dir[0], y + face.dir[1], z + face.dir[2]);

            // Solid: show face if neighbor is transparent (air, fluid, plant...)
            if (!isTransparent(neighbor)) continue;

            const texIdx = textures[face.colorKey];
            const atlasUV = getUVsForTexture(texIdx);

            for (let i = 0; i < 4; i++) {
              const v = face.vertices[i];
              solidPos.push(x + v[0], y + v[1], z + v[2]);
              solidNorm.push(face.dir[0], face.dir[1], face.dir[2]);

              const lu = face.localUVs[i][0];
              const lv = face.localUVs[i][1];
              solidUV.push(
                atlasUV.uMin + lu * (atlasUV.uMax - atlasUV.uMin),
                atlasUV.vMin + lv * (atlasUV.vMax - atlasUV.vMin),
              );
            }

            solidIdx.push(solidVC, solidVC + 1, solidVC + 2, solidVC, solidVC + 2, solidVC + 3);
            solidVC += 4;
          }
        }
      }
    }

    const solidMesh = this._makeMesh(solidPos, solidNorm, solidUV, solidIdx, getSharedMaterial());
    solidMesh.position.set(ox, oy, oz);
    this.mesh = solidMesh;

    let waterMesh = null;
    if (water.pos.length > 0) {
      waterMesh = this._makeFluidMesh(water, getWaterMaterial());
      waterMesh.position.set(ox, oy, oz);
      waterMesh.renderOrder = 2;
      this.waterMesh = waterMesh;
    } else {
      this.waterMesh = null;
    }

    let lavaMesh = null;
    if (lava.pos.length > 0) {
      lavaMesh = this._makeFluidMesh(lava, getLavaMaterial());
      lavaMesh.position.set(ox, oy, oz);
      this.lavaMesh = lavaMesh;
    } else {
      this.lavaMesh = null;
    }

    return { solidMesh, waterMesh, lavaMesh };
  }

  _makeMesh(pos, norm, uv, idx, material) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(pos), 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(new Float32Array(norm), 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(uv), 2));
    
    // Choose Uint16Array if vertex count is small to save GPU VRAM bandwidth
    const maxIdx = pos.length / 3;
    const indexArray = maxIdx < 65535 ? new Uint16Array(idx) : new Uint32Array(idx);
    geometry.setIndex(new THREE.BufferAttribute(indexArray, 1));
    return new THREE.Mesh(geometry, material);
  }

  _makeFluidMesh(bucket, material) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(bucket.pos), 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(new Float32Array(bucket.norm), 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(bucket.uv), 2));
    geometry.setAttribute('aWave', new THREE.Float32BufferAttribute(new Float32Array(bucket.wave), 2));

    const vertexCount = bucket.pos.length / 3;
    const indexArray = vertexCount < 65535
      ? new Uint16Array(bucket.idx)
      : new Uint32Array(bucket.idx);
    geometry.setIndex(new THREE.BufferAttribute(indexArray, 1));
    return new THREE.Mesh(geometry, material);
  }

  dispose() {
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.mesh = null;
    }
    if (this.waterMesh) {
      this.waterMesh.geometry.dispose();
      this.waterMesh = null;
    }
    if (this.lavaMesh) {
      this.lavaMesh.geometry.dispose();
      this.lavaMesh = null;
    }
  }
}
