/**
 * Texture Atlas — Packs 16×16 textures into a power-of-two (64×64) atlas.
 * Uses NearestFilter and precise UV mapping for crisp voxel rendering with zero bleed.
 */

import * as THREE from 'three';
import { generateAllTextures, TEXTURE_DEFS, TEX_SIZE } from './textureGenerator.js';

export const ATLAS_COLS = 4;
export const ATLAS_ROWS = 18;
const ATLAS_WIDTH = ATLAS_COLS * TEX_SIZE;   // 64px
const ATLAS_HEIGHT = ATLAS_ROWS * TEX_SIZE; // 288px

let atlasTexture = null;

/**
 * Build the texture atlas from all generated textures.
 * @returns {THREE.CanvasTexture}
 */
export function buildAtlas() {
  const textures = generateAllTextures();

  const canvas = document.createElement('canvas');
  canvas.width = ATLAS_WIDTH;
  canvas.height = ATLAS_HEIGHT;
  const ctx = canvas.getContext('2d');

  // Clear with transparent background to preserve alpha in vegetation and items
  ctx.clearRect(0, 0, ATLAS_WIDTH, ATLAS_HEIGHT);

  textures.forEach((tex, index) => {
    const col = index % ATLAS_COLS;
    const row = Math.floor(index / ATLAS_COLS);
    const x = col * TEX_SIZE;
    const y = row * TEX_SIZE;
    ctx.drawImage(tex, x, y);
  });

  atlasTexture = new THREE.CanvasTexture(canvas);
  atlasTexture.magFilter = THREE.NearestFilter;
  atlasTexture.minFilter = THREE.NearestFilter;
  atlasTexture.generateMipmaps = false;
  atlasTexture.colorSpace = THREE.SRGBColorSpace;
  atlasTexture.needsUpdate = true;

  return atlasTexture;
}

/**
 * Get UV coordinates for a texture index in the 4×4 atlas.
 * @param {number} textureIndex
 * @returns {{ uMin: number, vMin: number, uMax: number, vMax: number }}
 */
export function getUVsForTexture(textureIndex) {
  const col = textureIndex % ATLAS_COLS;
  const row = Math.floor(textureIndex / ATLAS_COLS);

  // Slight sub-texel inset to guarantee no edge bleeding across UV boundaries
  const eps = 0.0005;

  const uMin = col / ATLAS_COLS + eps;
  const uMax = (col + 1) / ATLAS_COLS - eps;
  const vMax = 1 - (row / ATLAS_ROWS) - eps;
  const vMin = 1 - ((row + 1) / ATLAS_ROWS) + eps;

  return { uMin, uMax, vMin, vMax };
}

/**
 * Get the built atlas texture.
 * @returns {THREE.CanvasTexture|null}
 */
export function getAtlasTexture() {
  return atlasTexture;
}

/**
 * Total number of textures in the atlas.
 * @returns {number}
 */
export function getTextureCount() {
  return TEXTURE_DEFS.length;
}
