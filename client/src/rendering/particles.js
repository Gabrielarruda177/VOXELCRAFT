/**
 * Particles System — Spawns 3D micro-voxel debris, combat hit particles,
 * critical strike golden sparks, portal vortexes, water splash and torch flame embers.
 */

import * as THREE from 'three';
import { BlockType } from '../world/blockTypes.js';

const BLOCK_COLORS = {
  [BlockType.GRASS]:           0x5a9e37,
  [BlockType.DIRT]:            0x8B6914,
  [BlockType.STONE]:           0x888888,
  [BlockType.SAND]:            0xe8d68a,
  [BlockType.SNOW]:            0xf0f0f0,
  [BlockType.WOOD_LOG]:        0x6b4226,
  [BlockType.LEAVES]:          0x3a7a20,
  [BlockType.COAL_ORE]:        0x444444,
  [BlockType.IRON_ORE]:        0xb8956a,
  [BlockType.WATER]:           0x3880d0,
  [BlockType.CACTUS]:          0x16a34a,
  [BlockType.WOOD_PLANKS]:     0xb45309,
  [BlockType.COBBLESTONE]:     0x64748b,
  [BlockType.FLOWER_RED]:      0xdc2626,
  [BlockType.FLOWER_YELLOW]:   0xeab308,
  [BlockType.DIAMOND_ORE]:     0x22d3ee,
  [BlockType.OBSIDIAN]:        0x1e1b4b,
  [BlockType.LAVA]:            0xf97316,
  [BlockType.GRAVEL]:          0x6b7280,
  [BlockType.NETHERRACK]:      0x7f1d1d,
  [BlockType.SOUL_SAND]:       0x451a03,
  [BlockType.GLOWSTONE]:       0xfacc15,
  [BlockType.NETHER_QUARTZ_ORE]: 0xf8fafc,
  [BlockType.QUARTZ_BLOCK]:    0xf1f5f9,
  [BlockType.NETHER_PORTAL]:   0xa855f7,
  [BlockType.REDSTONE_ORE]:    0xef4444,
};

let scene = null;
const activeParticles = [];
const MAX_PARTICLES = 120; // FPS Protection cap
const particleGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
const sparkGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);
const critGeo = new THREE.BoxGeometry(0.09, 0.09, 0.09);

// Material Cache to avoid GC spikes and WebGL recompilation
const materialCache = new Map();

function getCachedMaterial(color, isBasic = false) {
  const key = `${color}_${isBasic ? 'basic' : 'lambert'}`;
  if (!materialCache.has(key)) {
    const mat = isBasic
      ? new THREE.MeshBasicMaterial({ color })
      : new THREE.MeshLambertMaterial({ color });
    materialCache.set(key, mat);
  }
  return materialCache.get(key);
}

export function initParticles(s) {
  scene = s;
}

export function spawnBlockBreakParticles(x, y, z, blockType) {
  if (!scene) return;

  const color = BLOCK_COLORS[blockType] || 0xaaaaaa;
  const mat = getCachedMaterial(color, false);
  const count = 8; // Optimized from 12 for smoother 60+ FPS

  for (let i = 0; i < count; i++) {
    if (activeParticles.length >= MAX_PARTICLES) break;

    const mesh = new THREE.Mesh(particleGeo, mat);

    mesh.position.set(
      x + 0.2 + Math.random() * 0.6,
      y + 0.2 + Math.random() * 0.6,
      z + 0.2 + Math.random() * 0.6
    );

    const vx = (Math.random() - 0.5) * 4.0;
    const vy = Math.random() * 3.5 + 1.2;
    const vz = (Math.random() - 0.5) * 4.0;

    const rx = (Math.random() - 0.5) * 8;
    const ry = (Math.random() - 0.5) * 8;

    scene.add(mesh);

    activeParticles.push({
      mesh,
      vx,
      vy,
      vz,
      rx,
      ry,
      life: 0.5 + Math.random() * 0.25,
      age: 0,
    });
  }
}

/**
 * Spawn combat hit sparks / blood particles.
 */
export function spawnHitParticles(x, y, z, color = 0xef4444) {
  if (!scene) return;

  const count = 8;
  for (let i = 0; i < count; i++) {
    const mat = new THREE.MeshLambertMaterial({ color });
    const mesh = new THREE.Mesh(sparkGeo, mat);

    mesh.position.set(x, y, z);

    const vx = (Math.random() - 0.5) * 5.0;
    const vy = Math.random() * 3.5 + 1.0;
    const vz = (Math.random() - 0.5) * 5.0;

    scene.add(mesh);

    activeParticles.push({
      mesh,
      vx,
      vy,
      vz,
      rx: (Math.random() - 0.5) * 8,
      ry: (Math.random() - 0.5) * 8,
      life: 0.45 + Math.random() * 0.2,
      age: 0,
    });
  }
}

/**
 * Spawn glittering golden critical hit particles.
 */
export function spawnCriticalHitParticles(x, y, z) {
  if (!scene) return;

  const colors = [0xfacc15, 0xfef08a, 0xf59e0b, 0xffffff];
  const count = 16;

  for (let i = 0; i < count; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const mat = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(critGeo, mat);

    mesh.position.set(
      x + (Math.random() - 0.5) * 0.4,
      y + (Math.random() - 0.5) * 0.4,
      z + (Math.random() - 0.5) * 0.4
    );

    const angle = Math.random() * Math.PI * 2;
    const speed = 2.5 + Math.random() * 3.5;
    const vx = Math.cos(angle) * speed;
    const vy = Math.random() * 3.0 + 1.2;
    const vz = Math.sin(angle) * speed;

    scene.add(mesh);

    activeParticles.push({
      mesh,
      vx,
      vy,
      vz,
      rx: 8,
      ry: 8,
      life: 0.55 + Math.random() * 0.25,
      age: 0,
    });
  }
}

/**
 * Spawn swirling mystical purple particles for Nether Portal.
 */
export function spawnPortalParticles(x, y, z) {
  if (!scene) return;

  const colors = [0xa855f7, 0xc084fc, 0x7e22ce, 0xe9d5ff];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const mat = new THREE.MeshBasicMaterial({ color });
  const mesh = new THREE.Mesh(sparkGeo, mat);

  mesh.position.set(
    x + (Math.random() - 0.5) * 0.8,
    y + (Math.random() - 0.5) * 0.8,
    z + (Math.random() - 0.5) * 0.8
  );

  const vx = (Math.random() - 0.5) * 0.8;
  const vy = 0.4 + Math.random() * 0.8;
  const vz = (Math.random() - 0.5) * 0.8;

  scene.add(mesh);

  activeParticles.push({
    mesh,
    vx,
    vy,
    vz,
    rx: 4,
    ry: 4,
    life: 0.8 + Math.random() * 0.4,
    age: 0,
  });
}

/**
 * Spawn rising fire ember particles.
 */
export function spawnTorchFlameParticles(x, y, z) {
  if (!scene) return;

  const colors = [0xf97316, 0xfacc15, 0xef4444, 0x78716c];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const mat = new THREE.MeshBasicMaterial({ color });
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.05), mat);

  mesh.position.set(
    x + (Math.random() - 0.5) * 0.15,
    y + 0.45,
    z + (Math.random() - 0.5) * 0.15
  );

  scene.add(mesh);

  activeParticles.push({
    mesh,
    vx: (Math.random() - 0.5) * 0.3,
    vy: 0.6 + Math.random() * 0.5,
    vz: (Math.random() - 0.5) * 0.3,
    rx: 2,
    ry: 2,
    life: 0.4 + Math.random() * 0.3,
    age: 0,
  });
}

/**
 * Spawn water splash droplets.
 */
export function spawnWaterSplashParticles(x, y, z) {
  if (!scene) return;

  const mat = getCachedMaterial(0x9ecbff, true);

  for (let i = 0; i < 8; i++) {
    const mesh = new THREE.Mesh(sparkGeo, mat);
    mesh.position.set(x, y + 0.1, z);

    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 2.5;

    scene.add(mesh);

    activeParticles.push({
      mesh,
      vx: Math.cos(angle) * speed,
      vy: 2.0 + Math.random() * 2.0,
      vz: Math.sin(angle) * speed,
      rx: 4,
      ry: 4,
      life: 0.4 + Math.random() * 0.2,
      age: 0,
      sharedMaterial: true,
    });
  }
}

/**
 * Steam + obsidian spark burst fired when water quenches lava.
 */
export function spawnFluidReactionParticles(x, y, z) {
  if (!scene) return;

  const steamMat = getCachedMaterial(0xe8f4ff, true);
  const sparkMat = getCachedMaterial(0xff8c1a, true);

  for (let i = 0; i < 6; i++) {
    const mesh = new THREE.Mesh(sparkGeo, steamMat);
    mesh.position.set(x, y, z);

    const angle = Math.random() * Math.PI * 2;
    const speed = 0.8 + Math.random() * 1.6;

    scene.add(mesh);

    activeParticles.push({
      mesh,
      vx: Math.cos(angle) * speed,
      vy: 1.6 + Math.random() * 2.4,
      vz: Math.sin(angle) * speed,
      rx: 2,
      ry: 2,
      life: 0.55 + Math.random() * 0.35,
      age: 0,
      gravity: 0.55,
      sharedMaterial: true,
    });
  }

  for (let i = 0; i < 5; i++) {
    const mesh = new THREE.Mesh(critGeo, sparkMat);
    mesh.position.set(x, y, z);

    const angle = Math.random() * Math.PI * 2;
    const speed = 1.6 + Math.random() * 2.2;

    scene.add(mesh);

    activeParticles.push({
      mesh,
      vx: Math.cos(angle) * speed,
      vy: 1.0 + Math.random() * 2.6,
      vz: Math.sin(angle) * speed,
      rx: 6,
      ry: 6,
      life: 0.35 + Math.random() * 0.3,
      age: 0,
      gravity: 0.8,
      sharedMaterial: true,
    });
  }
}

export function updateParticles(dt) {
  for (let i = activeParticles.length - 1; i >= 0; i--) {
    const p = activeParticles[i];
    p.age += dt;

    if (p.age >= p.life) {
      scene.remove(p.mesh);
      p.mesh.geometry.dispose();
      // Cached materials are shared — only dispose the per-particle ones.
      if (!p.sharedMaterial) p.mesh.material.dispose();
      activeParticles.splice(i, 1);
      continue;
    }

    // Apply gravity (steam rises slowly, debris falls at full rate)
    p.vy -= (p.gravity !== undefined ? p.gravity : 1) * 9.8 * dt;

    p.mesh.position.x += p.vx * dt;
    p.mesh.position.y += p.vy * dt;
    p.mesh.position.z += p.vz * dt;

    p.mesh.rotation.x += p.rx * dt;
    p.mesh.rotation.y += p.ry * dt;

    // Shrink before death
    const progress = p.age / p.life;
    const scale = Math.max(0.01, 1 - progress);
    p.mesh.scale.set(scale, scale, scale);
  }
}
