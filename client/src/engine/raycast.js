/**
 * Voxel Raycaster — DDA-based ray traversal through voxel grid.
 *
 * Steps through voxels along a ray to find the first solid block hit,
 * plus the face normal and the previous (air) position for block placement.
 * When `includeFluids` is set, the nearest water/lava cell met along the way is
 * reported as `fluidHit` so buckets can scoop fluid without making fluids solid.
 */

import * as THREE from 'three';
import { getBlockAtWorld } from '../world/worldManager.js';
import { CHUNK_HEIGHT } from '../world/chunk.js';
import { isSolid, isFluid } from '../world/blockTypes.js';

const MAX_REACH = 6;

/**
 * Cast a ray from origin in a direction through the voxel grid.
 * @param {THREE.Vector3} origin
 * @param {THREE.Vector3} direction
 * @param {{ includeFluids?: boolean }} [options]
 * @returns {{ hit: {x:number,y:number,z:number}, normal: {x:number,y:number,z:number}, prev: {x:number,y:number,z:number}, fluidHit?: {x:number,y:number,z:number, type:number} }|null}
 */
export function raycastVoxel(origin, direction, options = {}) {
  const includeFluids = options.includeFluids === true;
  const dir = direction.clone().normalize();

  let x = Math.floor(origin.x);
  let y = Math.floor(origin.y);
  let z = Math.floor(origin.z);

  const stepX = dir.x >= 0 ? 1 : -1;
  const stepY = dir.y >= 0 ? 1 : -1;
  const stepZ = dir.z >= 0 ? 1 : -1;

  const tDeltaX = dir.x !== 0 ? Math.abs(1 / dir.x) : Infinity;
  const tDeltaY = dir.y !== 0 ? Math.abs(1 / dir.y) : Infinity;
  const tDeltaZ = dir.z !== 0 ? Math.abs(1 / dir.z) : Infinity;

  let tMaxX = dir.x !== 0
    ? ((dir.x > 0 ? (x + 1 - origin.x) : (origin.x - x)) * tDeltaX)
    : Infinity;
  let tMaxY = dir.y !== 0
    ? ((dir.y > 0 ? (y + 1 - origin.y) : (origin.y - y)) * tDeltaY)
    : Infinity;
  let tMaxZ = dir.z !== 0
    ? ((dir.z > 0 ? (z + 1 - origin.z) : (origin.z - z)) * tDeltaZ)
    : Infinity;

  let prevX = x, prevY = y, prevZ = z;
  let normalX = 0, normalY = 0, normalZ = 0;
  let fluidHit = null;

  for (let i = 0; i < MAX_REACH * 3; i++) {
    // Check current voxel
    if (y >= 0 && y < CHUNK_HEIGHT) {
      const block = getBlockAtWorld(x, y, z);
      if (includeFluids && fluidHit === null && isFluid(block)) {
        fluidHit = { x, y, z, type: block };
      }
      if (isSolid(block)) {
        const result = {
          hit: { x, y, z },
          normal: { x: normalX, y: normalY, z: normalZ },
          prev: { x: prevX, y: prevY, z: prevZ },
        };
        if (fluidHit) result.fluidHit = fluidHit;
        return result;
      }
    }

    prevX = x;
    prevY = y;
    prevZ = z;

    // Step to next voxel
    if (tMaxX < tMaxY) {
      if (tMaxX < tMaxZ) {
        if (tMaxX > MAX_REACH) break;
        x += stepX;
        tMaxX += tDeltaX;
        normalX = -stepX;
        normalY = 0;
        normalZ = 0;
      } else {
        if (tMaxZ > MAX_REACH) break;
        z += stepZ;
        tMaxZ += tDeltaZ;
        normalX = 0;
        normalY = 0;
        normalZ = -stepZ;
      }
    } else {
      if (tMaxY < tMaxZ) {
        if (tMaxY > MAX_REACH) break;
        y += stepY;
        tMaxY += tDeltaY;
        normalX = 0;
        normalY = -stepY;
        normalZ = 0;
      } else {
        if (tMaxZ > MAX_REACH) break;
        z += stepZ;
        tMaxZ += tDeltaZ;
        normalX = 0;
        normalY = 0;
        normalZ = -stepZ;
      }
    }
  }

  // No solid in reach: a fluid on its own is still a valid target, so buckets
  // can scoop an open ocean or a lava lake.
  if (fluidHit) {
    return {
      hit: { x: fluidHit.x, y: fluidHit.y, z: fluidHit.z },
      normal: { x: 0, y: 0, z: 0 },
      prev: { x: fluidHit.x, y: fluidHit.y, z: fluidHit.z },
      fluidHit,
    };
  }

  return null;
}
