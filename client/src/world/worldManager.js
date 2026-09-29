/**
 * World Manager — Infinite procedural world generation with distinct biomes.
 *
 * Biomes:
 *  - Plains / Forest: Rolling green hills, lush grass, oak trees.
 *  - Desert: Smooth golden sand dunes, deep sand layers, sandstone.
 *  - Snowy Mountains: High jagged rocky peaks, snow caps, pine trees.
 *  - Beach & Ocean: Sand shores along sea level, deep water basins.
 *
 * Features continuous chunk loading/unloading centered on the player.
 */

import * as THREE from 'three';
import { Chunk, CHUNK_WIDTH, CHUNK_HEIGHT } from './chunk.js';
import {
  BlockType,
  isSolid as isSolidBlock,
  isFluid,
  isFluidReplaceable,
  FLUID_STATIC,
  FLUID_SOURCE_LEVEL,
} from './blockTypes.js';

const chunks = new Map();
const chunkMeshes = new Map();
const chunkWaterMeshes = new Map();
const chunkLavaMeshes = new Map();

export const SEA_LEVEL = 18;
const RENDER_RADIUS = 3;  // Optimized active chunk radius (7×7 = 49 chunks instead of 121 for huge FPS boost)
const UNLOAD_RADIUS = 4;  // Tighter threshold to prevent VRAM memory leak and massive draw calls

let currentScene = null;
let lastPlayerChunkX = NaN;
let lastPlayerChunkZ = NaN;
const pendingBuildQueue = [];

// ── Fluid bookkeeping (see fluidEngine.js) ─────────────────
const dirtyChunks = new Set();
let meshDeferral = false;
let fluidChangeListener = null;

/**
 * Register a callback fired on every world block mutation so the fluid engine
 * can schedule ticks. Avoids a circular import between world & fluid modules.
 * @param {Function|null} fn - (wx, wy, wz, newType, prevType, prevLevel) => void
 */
export function setFluidChangeListener(fn) {
  fluidChangeListener = fn;
}

/** When true, block writes only mark chunks dirty instead of remeshing. */
export function setMeshDeferral(enabled) {
  meshDeferral = enabled;
}

/**
 * Remesh up to `budget` chunks that were written while deferral was active.
 * @returns {number} how many chunks were rebuilt
 */
export function flushDirtyChunks(scene, budget = 2) {
  if (dirtyChunks.size === 0) return 0;

  const target = currentScene || scene;
  if (!target) { dirtyChunks.clear(); return 0; }

  let rebuilt = 0;
  for (const key of Array.from(dirtyChunks)) {
    if (rebuilt >= budget) break;
    dirtyChunks.delete(key);
    const chunk = chunks.get(key);
    if (chunk) {
      buildChunkMesh(chunk, target);
      rebuilt++;
    }
  }
  return rebuilt;
}

export function getPendingMeshCount() {
  return dirtyChunks.size + pendingBuildQueue.length;
}

// ── Deterministic Noise Functions ─────────────────────────

function hash2D(x, z) {
  let h = (x * 374761393 + z * 668265263 + 1234567) | 0;
  h = ((h ^ (h >> 13)) * 1274126177) | 0;
  return (h & 0x7fffffff) / 0x7fffffff;
}

function smoothNoise(x, z) {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;

  const wx = fx * fx * (3 - 2 * fx);
  const wz = fz * fz * (3 - 2 * fz);

  const h00 = hash2D(ix, iz);
  const h10 = hash2D(ix + 1, iz);
  const h01 = hash2D(ix, iz + 1);
  const h11 = hash2D(ix + 1, iz + 1);

  const top = h00 * (1 - wx) + h10 * wx;
  const bot = h01 * (1 - wx) + h11 * wx;
  return top * (1 - wz) + bot * wz;
}

function fractalNoise(x, z, octaves = 4, persistence = 0.5, lacunarity = 2.0) {
  let total = 0;
  let frequency = 1;
  let amplitude = 1;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    total += smoothNoise(x * frequency, z * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }

  return total / maxValue;
}

export const Dimension = {
  OVERWORLD: 'overworld',
  NETHER: 'nether',
};

let currentDimension = Dimension.OVERWORLD;

export const Biome = {
  OCEAN: 'ocean',
  PLAINS: 'plains',
  FOREST: 'forest',
  DESERT: 'desert',
  SNOWY_MOUNTAINS: 'snowy_mountains',
  NETHER_WASTES: 'nether_wastes',
};

/**
 * Evaluate climate and biome at world coordinate (wx, wz).
 */
export function getBiomeAt(wx, wz) {
  // Continentalness: Low = Ocean/Beach, High = Land/Mountains
  const continent = fractalNoise(wx * 0.0025, wz * 0.0025, 3);

  if (continent < 0.32) {
    return Biome.OCEAN;
  }

  // Temperature & Moisture evaluation
  const temp = fractalNoise(wx * 0.0035 + 150, wz * 0.0035 + 150, 3);
  const moisture = fractalNoise(wx * 0.004 + 300, wz * 0.004 + 300, 3);

  if (continent > 0.58 && temp < 0.38) {
    return Biome.SNOWY_MOUNTAINS;
  }

  if (temp > 0.62 && moisture < 0.48) {
    return Biome.DESERT;
  }

  if (moisture > 0.52) {
    return Biome.FOREST;
  }

  return Biome.PLAINS;
}

/**
 * Compute procedural terrain height at world coordinate (wx, wz).
 */
export function getHeight(wx, wz) {
  const biome = getBiomeAt(wx, wz);
  const detail = fractalNoise(wx * 0.025, wz * 0.025, 3);

  switch (biome) {
    case Biome.OCEAN: {
      // Shore gently sloping down below sea level
      const depth = fractalNoise(wx * 0.01, wz * 0.01, 2);
      const h = SEA_LEVEL - 2 - depth * 10 + detail * 3;
      return Math.max(3, Math.min(CHUNK_HEIGHT - 6, Math.floor(h)));
    }
    case Biome.DESERT: {
      // Rolling sand dunes
      const dune = Math.sin(wx * 0.03 + wz * 0.015) * 4 + Math.cos(wz * 0.03) * 3;
      const h = 21 + dune + detail * 2.5;
      return Math.max(SEA_LEVEL + 1, Math.min(CHUNK_HEIGHT - 6, Math.floor(h)));
    }
    case Biome.SNOWY_MOUNTAINS: {
      // High dramatic peaks
      const mountain = fractalNoise(wx * 0.015, wz * 0.015, 4);
      const h = 28 + Math.pow(mountain, 1.8) * 32 + detail * 4;
      return Math.max(24, Math.min(CHUNK_HEIGHT - 4, Math.floor(h)));
    }
    case Biome.FOREST: {
      // Rich rolling forest ridges
      const hill = Math.sin(wx * 0.022) * 5 + Math.cos(wz * 0.028) * 4 + Math.sin((wx - wz) * 0.035) * 2.5;
      const h = 23 + hill + detail * 3.0;
      return Math.max(SEA_LEVEL + 1, Math.min(CHUNK_HEIGHT - 6, Math.floor(h)));
    }
    case Biome.PLAINS:
    default: {
      // Gentle rolling green hills
      const hill = Math.sin(wx * 0.02) * 4 + Math.cos(wz * 0.025) * 4 + Math.sin((wx + wz) * 0.04) * 2;
      const h = 22 + hill + detail * 2.5;
      return Math.max(SEA_LEVEL + 1, Math.min(CHUNK_HEIGHT - 6, Math.floor(h)));
    }
  }
}

// ── Trees & Flora Generation ──────────────────────────────

function tryPlaceOakTree(chunk, lx, lz, trunkBase, trunkH) {
  // Trunk
  for (let y = trunkBase; y < trunkBase + trunkH; y++) {
    if (y < CHUNK_HEIGHT) chunk.setBlock(lx, y, lz, BlockType.WOOD_LOG);
  }

  // Canopy
  const leafBase = trunkBase + trunkH - 1;
  for (let dy = 0; dy < 3; dy++) {
    const r = dy < 2 ? 2 : 1;
    for (let dx = -r; dx <= r; dx++) {
      for (let dz = -r; dz <= r; dz++) {
        if (Math.abs(dx) === r && Math.abs(dz) === r && dy < 2) continue;
        const px = lx + dx, py = leafBase + dy, pz = lz + dz;
        if (px >= 0 && px < CHUNK_WIDTH && py >= 0 && py < CHUNK_HEIGHT && pz >= 0 && pz < CHUNK_WIDTH) {
          if (chunk.getBlock(px, py, pz) === BlockType.AIR) {
            chunk.setBlock(px, py, pz, BlockType.LEAVES);
          }
        }
      }
    }
  }
}

function tryPlacePineTree(chunk, lx, lz, trunkBase, trunkH) {
  // Tall pine trunk
  for (let y = trunkBase; y < trunkBase + trunkH; y++) {
    if (y < CHUNK_HEIGHT) chunk.setBlock(lx, y, lz, BlockType.WOOD_LOG);
  }

  // Conical pine canopy
  const top = trunkBase + trunkH;
  for (let y = trunkBase + 2; y <= top + 1; y++) {
    const distFromTop = top + 1 - y;
    const r = distFromTop % 2 === 0 ? 2 : 1;
    for (let dx = -r; dx <= r; dx++) {
      for (let dz = -r; dz <= r; dz++) {
        if (Math.abs(dx) === r && Math.abs(dz) === r && r > 1) continue;
        const px = lx + dx, py = y, pz = lz + dz;
        if (px >= 0 && px < CHUNK_WIDTH && py >= 0 && py < CHUNK_HEIGHT && pz >= 0 && pz < CHUNK_WIDTH) {
          if (chunk.getBlock(px, py, pz) === BlockType.AIR) {
            chunk.setBlock(px, py, pz, BlockType.LEAVES);
          }
        }
      }
    }
  }
}

function tryPlaceCactus(chunk, lx, lz, baseH, cactusH) {
  for (let y = baseH; y < baseH + cactusH; y++) {
    if (y < CHUNK_HEIGHT && chunk.getBlock(lx, y, lz) === BlockType.AIR) {
      chunk.setBlock(lx, y, lz, BlockType.CACTUS);
    }
  }
}

function tryPlaceFlower(chunk, lx, y, lz, flowerType) {
  if (lx >= 0 && lx < CHUNK_WIDTH && lz >= 0 && lz < CHUNK_WIDTH && y < CHUNK_HEIGHT) {
    if (chunk.getBlock(lx, y, lz) === BlockType.AIR) {
      chunk.setBlock(lx, y, lz, flowerType);
    }
  }
}

// ── 3D Noise for Caves & Caverns ──────────────────────────

function hash3D(x, y, z) {
  let h = (x * 374761393 + y * 668265263 + z * 982451653 + 1234567) | 0;
  h = ((h ^ (h >> 13)) * 1274126177) | 0;
  return (h & 0x7fffffff) / 0x7fffffff;
}

function smoothNoise3D(x, y, z) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fy = y - iy;
  const fz = z - iz;

  const wx = fx * fx * (3 - 2 * fx);
  const wy = fy * fy * (3 - 2 * fy);
  const wz = fz * fz * (3 - 2 * fz);

  const c000 = hash3D(ix, iy, iz);
  const c100 = hash3D(ix + 1, iy, iz);
  const c010 = hash3D(ix, iy + 1, iz);
  const c110 = hash3D(ix + 1, iy + 1, iz);
  const c001 = hash3D(ix, iy, iz + 1);
  const c101 = hash3D(ix + 1, iy, iz + 1);
  const c011 = hash3D(ix, iy + 1, iz + 1);
  const c111 = hash3D(ix + 1, iy + 1, iz + 1);

  const x00 = c000 * (1 - wx) + c100 * wx;
  const x10 = c010 * (1 - wx) + c110 * wx;
  const x01 = c001 * (1 - wx) + c101 * wx;
  const x11 = c011 * (1 - wx) + c111 * wx;

  const y0 = x00 * (1 - wy) + x10 * wy;
  const y1 = x01 * (1 - wy) + x11 * wy;

  return y0 * (1 - wz) + y1 * wz;
}

export function isCaveAir(wx, wy, wz, surfaceHeight) {
  // Caves form from y=2 up to near surface height
  if (wy < 2 || wy > surfaceHeight) return false;

  // Protect ocean beds from leaking water everywhere
  if (surfaceHeight <= SEA_LEVEL + 1 && wy >= surfaceHeight - 2) return false;

  // Two 3D noise fields intersecting (Worm Cave model)
  const n1 = smoothNoise3D(wx * 0.045, wy * 0.075, wz * 0.045) - 0.5;
  const n2 = smoothNoise3D(wx * 0.045 + 137, wy * 0.075 + 137, wz * 0.045 + 137) - 0.5;

  const density = n1 * n1 + n2 * n2;
  return density < 0.022; // Tunnel threshold
}

// ── Procedural Chunk Generation ───────────────────────────

function generateNetherChunk(cx, cz) {
  const chunk = new Chunk(cx, 0, cz);
  const offX = cx * CHUNK_WIDTH;
  const offZ = cz * CHUNK_WIDTH;

  for (let z = 0; z < CHUNK_WIDTH; z++) {
    for (let x = 0; x < CHUNK_WIDTH; x++) {
      const wx = offX + x;
      const wz = offZ + z;

      for (let y = 0; y < CHUNK_HEIGHT; y++) {
        // Floor & Ceiling
        if (y === 0 || y >= 62) {
          chunk.setBlock(x, y, z, BlockType.NETHERRACK);
          continue;
        }

        // 3D Nether Cavern Noise
        const n1 = smoothNoise3D(wx * 0.05, y * 0.07, wz * 0.05) - 0.5;
        const n2 = smoothNoise3D(wx * 0.03 + 200, y * 0.05 + 200, wz * 0.03 + 200) - 0.5;
        const isSolid = (n1 * n1 + n2 * n2) > 0.035;

        if (isSolid) {
          const r = hash2D(wx * 47 + y * 89, wz * 61 + y * 23);
          if (y <= 20 && r < 0.25) {
            // Soul sand banks near lava
            chunk.setBlock(x, y, z, BlockType.SOUL_SAND);
          } else if (y >= 45 && r > 0.97) {
            // Glowing crystals on roof
            chunk.setBlock(x, y, z, BlockType.GLOWSTONE);
          } else if (r > 0.982) {
            // White Quartz veins
            chunk.setBlock(x, y, z, BlockType.NETHER_QUARTZ_ORE);
          } else {
            chunk.setBlock(x, y, z, BlockType.NETHERRACK);
          }
        } else {
          // Open air or molten lava seas (inert: world-generated fluids never flow)
          if (y <= 16) {
            chunk.setBlockWithFluid(x, y, z, BlockType.LAVA, FLUID_STATIC);
          } else {
            chunk.setBlock(x, y, z, BlockType.AIR);
          }
        }
      }
    }
  }

  return chunk;
}

function generateChunk(cx, cz) {
  if (currentDimension === Dimension.NETHER) {
    return generateNetherChunk(cx, cz);
  }

  const chunk = new Chunk(cx, 0, cz);
  const offX = cx * CHUNK_WIDTH;
  const offZ = cz * CHUNK_WIDTH;

  // 1. Terrain pass
  for (let z = 0; z < CHUNK_WIDTH; z++) {
    for (let x = 0; x < CHUNK_WIDTH; x++) {
      const wx = offX + x;
      const wz = offZ + z;
      const height = getHeight(wx, wz);
      const biome = getBiomeAt(wx, wz);

      for (let y = 0; y <= height; y++) {
        let block;

        if (y === 0) {
          block = BlockType.STONE; // Bedrock level
        } else if (y < height - 4) {
          block = BlockType.STONE;
        } else if (y < height) {
          // Sub-surface
          if (biome === Biome.DESERT || (biome === Biome.OCEAN && height <= SEA_LEVEL + 1)) {
            block = BlockType.SAND;
          } else {
            block = BlockType.DIRT;
          }
        } else {
          // Top Surface Block
          if (biome === Biome.DESERT) {
            block = BlockType.SAND;
          } else if (biome === Biome.SNOWY_MOUNTAINS) {
            block = height >= 36 ? BlockType.SNOW : BlockType.GRASS;
          } else if (biome === Biome.OCEAN || height <= SEA_LEVEL + 1) {
            block = BlockType.SAND;
          } else {
            block = BlockType.GRASS;
          }
        }

        // 3D Cave Carving Pass: Hollows out tunnels and cave entrances
        if (y >= 2 && isCaveAir(wx, y, wz, height)) {
          if (y <= 8) {
            block = BlockType.LAVA; // Deep molten magma lake
          } else if (y <= SEA_LEVEL - 8) {
            block = BlockType.WATER; // Underground cave pool
          } else {
            block = BlockType.AIR; // Hollow cave passage
          }
        }

        chunk.setBlockWithFluid(x, y, z, block, isFluid(block) ? FLUID_STATIC : FLUID_SOURCE_LEVEL);
      }

      // Water body filling up to sea level
      for (let y = height + 1; y <= SEA_LEVEL; y++) {
        if (chunk.getBlock(x, y, z) === BlockType.AIR) {
          chunk.setBlockWithFluid(x, y, z, BlockType.WATER, FLUID_STATIC);
        }
      }
    }
  }

  // 2. Flora, Trees & Desert Cacti pass
  for (let z = 1; z < CHUNK_WIDTH - 1; z++) {
    for (let x = 1; x < CHUNK_WIDTH - 1; x++) {
      const wx = offX + x;
      const wz = offZ + z;
      const height = getHeight(wx, wz);
      const biome = getBiomeAt(wx, wz);
      const topBlock = chunk.getBlock(x, height, z);
      const noiseVal = hash2D(wx, wz);

      if (height > SEA_LEVEL) {
        if (biome === Biome.PLAINS && topBlock === BlockType.GRASS) {
          // Sparse oak trees
          if (noiseVal < 0.025 && x >= 2 && x < CHUNK_WIDTH - 2 && z >= 2 && z < CHUNK_WIDTH - 2) {
            const th = 4 + Math.floor(hash2D(wx + 555, wz + 777) * 3);
            if (height + th + 4 < CHUNK_HEIGHT) tryPlaceOakTree(chunk, x, z, height + 1, th);
          } else if (noiseVal > 0.94 && noiseVal < 0.97) {
            tryPlaceFlower(chunk, x, height + 1, z, BlockType.FLOWER_RED);
          } else if (noiseVal >= 0.97) {
            tryPlaceFlower(chunk, x, height + 1, z, BlockType.FLOWER_YELLOW);
          }
        } else if (biome === Biome.FOREST && topBlock === BlockType.GRASS) {
          // Dense forest trees
          if (noiseVal < 0.085 && x >= 2 && x < CHUNK_WIDTH - 2 && z >= 2 && z < CHUNK_WIDTH - 2) {
            const th = 4 + Math.floor(hash2D(wx + 444, wz + 666) * 4);
            if (height + th + 4 < CHUNK_HEIGHT) tryPlaceOakTree(chunk, x, z, height + 1, th);
          } else if (noiseVal > 0.96) {
            tryPlaceFlower(chunk, x, height + 1, z, BlockType.FLOWER_RED);
          }
        } else if (biome === Biome.DESERT && topBlock === BlockType.SAND) {
          // Cacti in desert
          if (noiseVal < 0.028) {
            const ch = 2 + (noiseVal > 0.015 ? 1 : 0);
            tryPlaceCactus(chunk, x, z, height + 1, ch);
          }
        } else if (biome === Biome.SNOWY_MOUNTAINS && (topBlock === BlockType.GRASS || topBlock === BlockType.SNOW)) {
          // Pine trees in snowy mountains
          if (noiseVal < 0.035 && x >= 2 && x < CHUNK_WIDTH - 2 && z >= 2 && z < CHUNK_WIDTH - 2) {
            const th = 5 + Math.floor(hash2D(wx + 333, wz + 888) * 4);
            if (height + th + 4 < CHUNK_HEIGHT) tryPlacePineTree(chunk, x, z, height + 1, th);
          }
        }
      }
    }
  }

  // 3. Subterranean Ore pass (Coal, Iron, Gravel & rare Deep Diamond Veins)
  for (let z = 0; z < CHUNK_WIDTH; z++) {
    for (let x = 0; x < CHUNK_WIDTH; x++) {
      const wx = offX + x;
      const wz = offZ + z;
      const height = getHeight(wx, wz);

      for (let y = 1; y < height - 3; y++) {
        if (chunk.getBlock(x, y, z) === BlockType.STONE) {
          const r = hash2D(wx * 31 + y * 97, wz * 53 + y * 13);
          if (y <= 16 && r > 0.992) {
            chunk.setBlock(x, y, z, BlockType.DIAMOND_ORE);
          } else if (y <= 16 && r > 0.987) {
            // Glowing Redstone Ore Veins
            chunk.setBlock(x, y, z, BlockType.REDSTONE_ORE);
          } else if (r < 0.018) {
            chunk.setBlock(x, y, z, BlockType.COAL_ORE);
          } else if (r > 0.982) {
            chunk.setBlock(x, y, z, BlockType.IRON_ORE);
          } else if (r > 0.965 && r <= 0.982) {
            chunk.setBlock(x, y, z, BlockType.GRAVEL);
          }
        }
      }
    }
  }

  // 4. Procedural Dungeon Chamber (Rare Subterranean Treasure Rooms)
  const dungeonHash = hash2D(cx * 911 + 43, cz * 317 + 89);
  if (dungeonHash > 0.92) {
    const dy = 12;
    // 7x7 room from x=4..11, z=4..11
    for (let dx = 4; dx <= 11; dx++) {
      for (let dz = 4; dz <= 11; dz++) {
        for (let y = dy; y <= dy + 4; y++) {
          const isWall = (dx === 4 || dx === 11 || dz === 4 || dz === 11);
          const isFloor = (y === dy);
          const isCeil = (y === dy + 4);

          if (isFloor || isCeil || isWall) {
            const isMoss = hash2D(offX + dx, offZ + dz + y) > 0.5;
            chunk.setBlock(dx, y, dz, isMoss ? BlockType.MOSSY_COBBLESTONE : BlockType.COBBLESTONE);
          } else {
            chunk.setBlock(dx, y, dz, BlockType.AIR);
          }
        }
      }
    }

    // Center Spawner & Chests
    chunk.setBlock(7, dy + 1, 7, BlockType.MONSTER_SPAWNER);
    chunk.setBlock(5, dy + 1, 7, BlockType.CHEST);
    chunk.setBlock(10, dy + 1, 7, BlockType.CHEST);
  }

  return chunk;
}

// ── World API & Dynamic Loading ────────────────────────────

export function getBlockAtWorld(wx, wy, wz) {
  if (wy < 0 || wy >= CHUNK_HEIGHT) return BlockType.AIR;

  const cx = Math.floor(wx / CHUNK_WIDTH);
  const cz = Math.floor(wz / CHUNK_WIDTH);
  const key = `${cx},0,${cz}`;
  const chunk = chunks.get(key);

  if (chunk) {
    const lx = ((wx % CHUNK_WIDTH) + CHUNK_WIDTH) % CHUNK_WIDTH;
    const lz = ((wz % CHUNK_WIDTH) + CHUNK_WIDTH) % CHUNK_WIDTH;
    return chunk.getBlock(lx, wy, lz);
  }

  // If chunk not yet loaded, evaluate procedurally on-the-fly
  const height = getHeight(wx, wz);
  if (wy > height) {
    return wy <= SEA_LEVEL ? BlockType.WATER : BlockType.AIR;
  }

  if (wy >= 2 && isCaveAir(wx, wy, wz, height)) {
    if (wy <= 8) return BlockType.LAVA;
    return wy <= SEA_LEVEL - 8 ? BlockType.WATER : BlockType.AIR;
  }

  if (wy === height) {
    const biome = getBiomeAt(wx, wz);
    if (biome === Biome.DESERT || height <= SEA_LEVEL + 1) return BlockType.SAND;
    if (biome === Biome.SNOWY_MOUNTAINS && height >= 36) return BlockType.SNOW;
    return BlockType.GRASS;
  }
  if (wy >= height - 4) {
    const biome = getBiomeAt(wx, wz);
    return biome === Biome.DESERT ? BlockType.SAND : BlockType.DIRT;
  }
  return BlockType.STONE;
}

export function isWorldBlockSolid(wx, wy, wz) {
  return isSolidBlock(getBlockAtWorld(wx, wy, wz));
}

// ── Fluid Level Access ─────────────────────────────────────

function getLoadedChunk(wx, wz) {
  const cx = Math.floor(wx / CHUNK_WIDTH);
  const cz = Math.floor(wz / CHUNK_WIDTH);
  return chunks.get(`${cx},0,${cz}`);
}

/**
 * True when the chunk containing (wx, wz) is currently resident in memory.
 * The fluid engine skips ticks outside the resident window to stay bounded.
 */
export function isChunkLoaded(wx, wz) {
  return getLoadedChunk(wx, wz) !== undefined;
}

/**
 * Read the fluid level stored at a world coordinate.
 * Unloaded chunks fall back to the procedural world-generation guess so border
 * meshing never produces a zero-height sea wall.
 * @returns {number} 0 = source, 1..7 = flowing, FLUID_STATIC = inert
 */
export function getFluidLevelAtWorld(wx, wy, wz) {
  if (wy < 0 || wy >= CHUNK_HEIGHT) return FLUID_SOURCE_LEVEL;

  const cx = Math.floor(wx / CHUNK_WIDTH);
  const cz = Math.floor(wz / CHUNK_WIDTH);
  const chunk = chunks.get(`${cx},0,${cz}`);

  if (chunk) {
    const lx = ((wx % CHUNK_WIDTH) + CHUNK_WIDTH) % CHUNK_WIDTH;
    const lz = ((wz % CHUNK_WIDTH) + CHUNK_WIDTH) % CHUNK_WIDTH;
    return chunk.getFluidLevel(lx, wy, lz);
  }

  // Procedural fallback — mirror the guessed block type.
  const type = getBlockAtWorld(wx, wy, wz);
  return isFluid(type) ? FLUID_STATIC : FLUID_SOURCE_LEVEL;
}

/**
 * Type of fluid at a coordinate, or AIR when there is none.
 */
export function getFluidTypeAtWorld(wx, wy, wz) {
  const type = getBlockAtWorld(wx, wy, wz);
  return isFluid(type) ? type : BlockType.AIR;
}

function buildChunkMesh(chunk, scene) {
  const key = `${chunk.cx},0,${chunk.cz}`;

  // Dispose old mesh if present
  const oldSolid = chunkMeshes.get(key);
  const oldWater = chunkWaterMeshes.get(key);
  const oldLava = chunkLavaMeshes.get(key);
  if (oldSolid) { scene.remove(oldSolid); oldSolid.geometry.dispose(); }
  if (oldWater) { scene.remove(oldWater); oldWater.geometry.dispose(); }
  if (oldLava) { scene.remove(oldLava); oldLava.geometry.dispose(); }
  // Drop the stale entries even when the rebuild produces no fluid mesh,
  // otherwise unloading would dispose an already-disposed geometry again.
  chunkWaterMeshes.delete(key);
  chunkLavaMeshes.delete(key);

  const { solidMesh, waterMesh, lavaMesh } = chunk.buildMesh(getBlockAtWorld, getFluidLevelAtWorld);
  chunkMeshes.set(key, solidMesh);
  scene.add(solidMesh);

  if (waterMesh) {
    chunkWaterMeshes.set(key, waterMesh);
    scene.add(waterMesh);
  }

  if (lavaMesh) {
    chunkLavaMeshes.set(key, lavaMesh);
    scene.add(lavaMesh);
  }
}

/**
 * Initial world generation around spawn.
 * @param {THREE.Scene} scene
 */
export function generateWorld(scene) {
  currentScene = scene;
  console.log(`[World] Generating starting biomes and chunks...`);

  for (let cz = -RENDER_RADIUS; cz <= RENDER_RADIUS; cz++) {
    for (let cx = -RENDER_RADIUS; cx <= RENDER_RADIUS; cx++) {
      const chunk = generateChunk(cx, cz);
      chunks.set(`${cx},0,${cz}`, chunk);
    }
  }

  for (const chunk of chunks.values()) {
    buildChunkMesh(chunk, scene);
  }

  console.log(`[World] Ready! ${chunks.size} chunks generated.`);
}

/**
 * Continuous infinite world update: loads and unloads chunks based on player movement.
 * @param {THREE.Vector3} playerPos
 * @param {THREE.Scene} scene
 */
export function updateWorld(playerPos, scene) {
  if (!scene) return;
  currentScene = scene;

  const pcx = Math.floor(playerPos.x / CHUNK_WIDTH);
  const pcz = Math.floor(playerPos.z / CHUNK_WIDTH);

  // Check if player entered a new chunk or queue is running
  if (pcx !== lastPlayerChunkX || pcz !== lastPlayerChunkZ) {
    lastPlayerChunkX = pcx;
    lastPlayerChunkZ = pcz;

    // 1. Unload far chunks beyond UNLOAD_RADIUS
    for (const [key, chunk] of chunks.entries()) {
      const dist = Math.max(Math.abs(chunk.cx - pcx), Math.abs(chunk.cz - pcz));
      if (dist > UNLOAD_RADIUS) {
        const solidMesh = chunkMeshes.get(key);
        const waterMesh = chunkWaterMeshes.get(key);
        const lavaMesh = chunkLavaMeshes.get(key);
        if (solidMesh) { scene.remove(solidMesh); solidMesh.geometry.dispose(); chunkMeshes.delete(key); }
        if (waterMesh) { scene.remove(waterMesh); waterMesh.geometry.dispose(); chunkWaterMeshes.delete(key); }
        if (lavaMesh) { scene.remove(lavaMesh); lavaMesh.geometry.dispose(); chunkLavaMeshes.delete(key); }
        chunk.dispose();
        chunks.delete(key);
        dirtyChunks.delete(key);
      }
    }

    // 2. Identify missing chunks to generate within RENDER_RADIUS
    for (let dz = -RENDER_RADIUS; dz <= RENDER_RADIUS; dz++) {
      for (let dx = -RENDER_RADIUS; dx <= RENDER_RADIUS; dx++) {
        const cx = pcx + dx;
        const cz = pcz + dz;
        const key = `${cx},0,${cz}`;

        if (!chunks.has(key)) {
          const chunk = generateChunk(cx, cz);
          chunks.set(key, chunk);
          pendingBuildQueue.push(chunk);
        }
      }
    }
  }

  // 3. Incrementally mesh up to 2 pending chunks per frame to keep 60 FPS buttery smooth
  const batchCount = Math.min(2, pendingBuildQueue.length);
  for (let i = 0; i < batchCount; i++) {
    const chunk = pendingBuildQueue.shift();
    if (chunks.has(`${chunk.cx},0,${chunk.cz}`)) {
      buildChunkMesh(chunk, scene);
    }
  }
}

/**
 * Get initial spawn position in plains.
 */
export function getSpawnPosition() {
  if (currentDimension === Dimension.NETHER) {
    return { x: 0.5, y: 32, z: 0.5 };
  }
  const height = getHeight(0, 0);
  return { x: 0.5, y: height + 2, z: 0.5 };
}

export function getCurrentDimension() {
  return currentDimension;
}

export function switchDimension(scene, targetDim) {
  if (currentDimension === targetDim || !scene) return;
  currentDimension = targetDim;

  // 1. Clear existing chunks and meshes
  for (const [key, chunk] of chunks.entries()) {
    const solidMesh = chunkMeshes.get(key);
    const waterMesh = chunkWaterMeshes.get(key);
    const lavaMesh = chunkLavaMeshes.get(key);
    if (solidMesh) { scene.remove(solidMesh); solidMesh.geometry.dispose(); }
    if (waterMesh) { scene.remove(waterMesh); waterMesh.geometry.dispose(); }
    if (lavaMesh) { scene.remove(lavaMesh); lavaMesh.geometry.dispose(); }
    chunk.dispose();
  }
  chunks.clear();
  chunkMeshes.clear();
  chunkWaterMeshes.clear();
  chunkLavaMeshes.clear();
  pendingBuildQueue.length = 0;
  dirtyChunks.clear();
  lastPlayerChunkX = NaN;
  lastPlayerChunkZ = NaN;

  // 2. Adjust atmosphere & fog
  if (currentDimension === Dimension.NETHER) {
    scene.fog = new THREE.Fog(0x350808, 25, 95);
    scene.background = new THREE.Color(0x220505);
  } else {
    scene.fog = new THREE.Fog(0x78b9e8, 50, 160);
    scene.background = new THREE.Color(0x78b9e8);
  }

  // 3. Re-generate initial chunks
  for (let cz = -2; cz <= 2; cz++) {
    for (let cx = -2; cx <= 2; cx++) {
      const chunk = generateChunk(cx, cz);
      chunks.set(`${cx},0,${cz}`, chunk);
      buildChunkMesh(chunk, scene);
    }
  }
}

/**
 * Write a block into the world, keeping fluid metadata consistent.
 *
 * The water/lava → obsidian reaction now lives in fluidEngine.js so it also
 * runs for naturally spreading fluids, not only for player placement.
 *
 * @param {THREE.Scene} scene
 * @param {number} wx
 * @param {number} wy
 * @param {number} wz
 * @param {number} type
 * @param {number} [fluidLevel=0] 0 = source, 1..7 = flowing, FLUID_STATIC = inert
 */
export function setBlockAtWorld(scene, wx, wy, wz, type, fluidLevel = FLUID_SOURCE_LEVEL) {
  if (wy < 0 || wy >= CHUNK_HEIGHT) return;

  const cx = Math.floor(wx / CHUNK_WIDTH);
  const cz = Math.floor(wz / CHUNK_WIDTH);
  const key = `${cx},0,${cz}`;
  const chunk = chunks.get(key);
  if (!chunk) return;

  const lx = ((wx % CHUNK_WIDTH) + CHUNK_WIDTH) % CHUNK_WIDTH;
  const lz = ((wz % CHUNK_WIDTH) + CHUNK_WIDTH) % CHUNK_WIDTH;

  const prevType = chunk.getBlock(lx, wy, lz);
  const prevLevel = chunk.getFluidLevel(lx, wy, lz);

  if (prevType === type && !isFluid(type)) return;

  const level = isFluid(type) ? fluidLevel : FLUID_SOURCE_LEVEL;
  chunk.setBlockWithFluid(lx, wy, lz, type, level);

  markChunkDirty(scene, cx, cz);

  // Border neighbor chunk updates
  if (lx === 0)                  markChunkDirty(scene, cx - 1, cz);
  if (lx === CHUNK_WIDTH - 1)    markChunkDirty(scene, cx + 1, cz);
  if (lz === 0)                  markChunkDirty(scene, cx, cz - 1);
  if (lz === CHUNK_WIDTH - 1)    markChunkDirty(scene, cx, cz + 1);

  if (fluidChangeListener) {
    fluidChangeListener(wx, wy, wz, type, prevType, prevLevel);
  }
}

/**
 * Remesh now, or queue the chunk for a batched rebuild when deferral is on.
 */
function markChunkDirty(scene, cx, cz) {
  const key = `${cx},0,${cz}`;
  if (meshDeferral) {
    dirtyChunks.add(key);
    return;
  }
  const chunk = chunks.get(key);
  if (chunk) buildChunkMesh(chunk, scene || currentScene);
}
