/**
 * Mob Manager — Entity & AI system for peaceful (Pig) and hostile (Zombie, Skeleton, Spider, Creeper) mobs.
 *
 * Features:
 *  - Realistic Vision Cone (FOV 120°) and Voxel Line-of-Sight (LOS) raycasting.
 *  - Tactical AI:
 *      - Zombie: Slow shambling melee assault (1.8 blocks/s).
 *      - Skeleton: Tactical ranged kiting (8-14 blocks) + shooting arrow projectiles (2.8s reload).
 *      - Spider: Agile crawling, daytime neutral until attacked, pounce leaps at night.
 *      - Creeper: Slow approach (1.8 blocks/s), 1.8s pulsing fuse with audible warning.
 *      - Pig: Peaceful forward-facing wandering and panic fleeing upon taking damage.
 *  - Authentic Day/Night conditional spawning at safe distances (24-38 blocks away).
 *  - Population cap (MAX_MOBS = 10) & auto-despawn (> 50 blocks) for solid 60 FPS on all CPUs.
 */

import * as THREE from 'three';
import { isWorldBlockSolid, getHeight, setBlockAtWorld, getBlockAtWorld } from '../world/worldManager.js';
import { BlockType, getBlockDrop } from '../world/blockTypes.js';
import { getPlayerPosition, damage as damagePlayer } from './player.js';
import {
  playPigSound,
  playSheepSound,
  playZombieSound,
  playMobHitSound,
  playSwordSwingSound,
  playBowShootSound,
  playCreeperFuseSound,
  playExplosionSound,
} from '../engine/soundFx.js';
import { spawnHitParticles, spawnBlockBreakParticles } from '../rendering/particles.js';
import { isDaytime, isNighttime } from '../world/dayNightCycle.js';
import { spawnDrop } from './dropManager.js';

export const MobType = {
  PIG:      'pig',
  SHEEP:    'sheep',
  ZOMBIE:   'zombie',
  SKELETON: 'skeleton',
  SPIDER:   'spider',
  CREEPER:  'creeper',
};

let scene = null;
const mobs = [];
const arrows = [];
const tntEntities = [];
let spawnTimer = 0;
const MAX_MOBS = 10;

// ── Voxel Line-of-Sight (LOS) Raycast ─────────────────────

export function hasLineOfSight(x0, y0, z0, x1, y1, z1) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const dz = z1 - z0;
  const dist = Math.hypot(dx, dy, dz);
  if (dist < 0.3) return true;

  const steps = Math.ceil(dist * 2.2);
  const stepX = dx / steps;
  const stepY = dy / steps;
  const stepZ = dz / steps;

  for (let i = 1; i < steps; i++) {
    const cx = Math.floor(x0 + stepX * i);
    const cy = Math.floor(y0 + stepY * i);
    const cz = Math.floor(z0 + stepZ * i);

    if (isWorldBlockSolid(cx, cy, cz)) {
      return false;
    }
  }
  return true;
}

import {
  createZombieHeadTexture,
  createZombieBodyTexture,
  createZombieLimbTexture,
  createZombieLegsTexture,
  createCreeperFaceTexture,
  createCreeperBodyTexture,
  createSkeletonHeadTexture,
  createSkeletonBodyTexture,
  createSpiderHeadTexture,
  createSpiderBodyTexture,
  createPigFaceTexture,
  createSheepFaceTexture,
} from '../rendering/textures/mobTextures.js';

function createPigModel() {
  const group = new THREE.Group();
  const faceTex = createPigFaceTexture();
  const faceMat = new THREE.MeshLambertMaterial({ map: faceTex });
  const pinkMat = new THREE.MeshLambertMaterial({ color: 0xf472b6 });
  const snoutMat = new THREE.MeshLambertMaterial({ color: 0xfb7185 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.9), pinkMat);
  body.position.set(0, 0.45, 0);
  group.add(body);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.45), [
    pinkMat, pinkMat, pinkMat, pinkMat, pinkMat, faceMat,
  ]);
  head.position.set(0, 0.65, -0.55);
  group.add(head);

  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.12), snoutMat);
  snout.position.set(0, 0.58, -0.80);
  group.add(snout);

  const legGeo = new THREE.BoxGeometry(0.18, 0.35, 0.18);
  const legs = [];
  const legPositions = [
    [-0.24, 0.18, -0.30],
    [0.24, 0.18, -0.30],
    [-0.24, 0.18, 0.30],
    [0.24, 0.18, 0.30],
  ];

  for (const pos of legPositions) {
    const leg = new THREE.Mesh(legGeo, pinkMat);
    leg.position.set(...pos);
    group.add(leg);
    legs.push(leg);
  }

  return {
    group,
    legs,
    head,
    body,
    originalMats: [pinkMat, snoutMat, faceMat],
  };
}

function createSheepModel() {
  const group = new THREE.Group();
  const faceTex = createSheepFaceTexture();
  const faceMat = new THREE.MeshLambertMaterial({ map: faceTex });
  const woolMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc });
  const skinMat = new THREE.MeshLambertMaterial({ color: 0x334155 });

  // Fluffy Wool Body
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.60, 0.95), woolMat);
  body.position.set(0, 0.50, 0);
  group.add(body);

  // Head
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), [
    skinMat, skinMat, woolMat, skinMat, skinMat, faceMat,
  ]);
  head.position.set(0, 0.68, -0.55);
  group.add(head);

  // 4 Legs
  const legGeo = new THREE.BoxGeometry(0.16, 0.36, 0.16);
  const legs = [];
  const legPositions = [
    [-0.24, 0.18, -0.30],
    [0.24, 0.18, -0.30],
    [-0.24, 0.18, 0.30],
    [0.24, 0.18, 0.30],
  ];

  for (const pos of legPositions) {
    const leg = new THREE.Mesh(legGeo, skinMat);
    leg.position.set(...pos);
    group.add(leg);
    legs.push(leg);
  }

  return {
    group,
    legs,
    head,
    body,
    originalMats: [woolMat, skinMat, faceMat],
  };
}

function createZombieModel() {
  const group = new THREE.Group();
  const headTex = createZombieHeadTexture();
  const bodyTex = createZombieBodyTexture();
  const armTex = createZombieLimbTexture();
  const legTex = createZombieLegsTexture();

  const headMat = new THREE.MeshLambertMaterial({ map: headTex });
  const bodyMat = new THREE.MeshLambertMaterial({ map: bodyTex });
  const armMat = new THREE.MeshLambertMaterial({ map: armTex });
  const legMat = new THREE.MeshLambertMaterial({ map: legTex });
  const skinMat = new THREE.MeshLambertMaterial({ color: 0x2d5a27 });

  // Head
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.44, 0.44), [
    skinMat, skinMat, skinMat, skinMat, skinMat, headMat,
  ]);
  head.position.set(0, 1.45, 0);
  group.add(head);

  // Torso with Exposed Ribcage
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.65, 0.28), [
    skinMat, skinMat, skinMat, skinMat, skinMat, bodyMat,
  ]);
  torso.position.set(0, 0.90, 0);
  group.add(torso);

  // Arms (Stretched forward in iconic zombie pose)
  const armGeo = new THREE.BoxGeometry(0.16, 0.16, 0.55);
  const leftArm = new THREE.Mesh(armGeo, armMat);
  leftArm.position.set(-0.35, 1.05, -0.26);
  const rightArm = new THREE.Mesh(armGeo, armMat);
  rightArm.position.set(0.35, 1.05, -0.26);
  group.add(leftArm);
  group.add(rightArm);

  // Legs with ragged trousers
  const legGeo = new THREE.BoxGeometry(0.20, 0.60, 0.22);
  const leftLeg = new THREE.Mesh(legGeo, legMat);
  leftLeg.position.set(-0.13, 0.30, 0);
  const rightLeg = new THREE.Mesh(legGeo, legMat);
  rightLeg.position.set(0.13, 0.30, 0);
  group.add(leftLeg);
  group.add(rightLeg);

  return {
    group,
    legs: [leftLeg, rightLeg],
    arms: [leftArm, rightArm],
    head,
    body: torso,
    originalMats: [headMat, bodyMat, armMat, legMat, skinMat],
  };
}

function createSkeletonModel() {
  const group = new THREE.Group();
  const headTex = createSkeletonHeadTexture();
  const bodyTex = createSkeletonBodyTexture();

  const headMat = new THREE.MeshLambertMaterial({ map: headTex });
  const bodyMat = new THREE.MeshLambertMaterial({ map: bodyTex });
  const boneMat = new THREE.MeshLambertMaterial({ color: 0xe2e8f0 });
  const bowMat = new THREE.MeshLambertMaterial({ color: 0x78350f });

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), [
    boneMat, boneMat, boneMat, boneMat, boneMat, headMat,
  ]);
  head.position.set(0, 1.45, 0);
  group.add(head);

  const ribcage = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.60, 0.22), [
    boneMat, boneMat, boneMat, boneMat, boneMat, bodyMat,
  ]);
  ribcage.position.set(0, 0.90, 0);
  group.add(ribcage);

  const armGeo = new THREE.BoxGeometry(0.12, 0.60, 0.12);
  const leftArm = new THREE.Mesh(armGeo, boneMat);
  leftArm.position.set(-0.30, 0.90, 0);
  const rightArm = new THREE.Mesh(armGeo, boneMat);
  rightArm.position.set(0.30, 0.90, 0);
  group.add(leftArm);
  group.add(rightArm);

  // 3D Wooden Bow in left hand
  const bow = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.50, 0.08), bowMat);
  bow.position.set(-0.30, 0.85, -0.20);
  bow.rotation.x = 0.4;
  group.add(bow);

  const legGeo = new THREE.BoxGeometry(0.14, 0.60, 0.14);
  const leftLeg = new THREE.Mesh(legGeo, boneMat);
  leftLeg.position.set(-0.12, 0.30, 0);
  const rightLeg = new THREE.Mesh(legGeo, boneMat);
  rightLeg.position.set(0.12, 0.30, 0);
  group.add(leftLeg);
  group.add(rightLeg);

  return {
    group,
    legs: [leftLeg, rightLeg],
    arms: [leftArm, rightArm],
    head,
    body: ribcage,
    bow,
    originalMats: [headMat, bodyMat, boneMat, bowMat],
  };
}

function createSpiderModel() {
  const group = new THREE.Group();
  const headTex = createSpiderHeadTexture();
  const bodyTex = createSpiderBodyTexture();

  const headMat = new THREE.MeshLambertMaterial({ map: headTex });
  const bodyMat = new THREE.MeshLambertMaterial({ map: bodyTex });
  const darkMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });

  const abdomen = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.45, 0.70), [
    darkMat, darkMat, darkMat, darkMat, bodyMat, darkMat,
  ]);
  abdomen.position.set(0, 0.35, 0.40);
  group.add(abdomen);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.35, 0.45), [
    darkMat, darkMat, darkMat, darkMat, darkMat, headMat,
  ]);
  head.position.set(0, 0.30, -0.25);
  group.add(head);

  const legGeo = new THREE.BoxGeometry(0.60, 0.08, 0.08);
  const legs = [];
  for (let i = 0; i < 4; i++) {
    const leftLeg = new THREE.Mesh(legGeo, darkMat);
    leftLeg.position.set(-0.45, 0.22, -0.3 + i * 0.22);
    leftLeg.rotation.z = 0.35;
    group.add(leftLeg);
    legs.push(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, darkMat);
    rightLeg.position.set(0.45, 0.22, -0.3 + i * 0.22);
    rightLeg.rotation.z = -0.35;
    group.add(rightLeg);
    legs.push(rightLeg);
  }

  return {
    group,
    legs,
    head,
    body: abdomen,
    originalMats: [headMat, bodyMat, darkMat],
  };
}

function createCreeperModel() {
  const group = new THREE.Group();
  const faceTex = createCreeperFaceTexture();
  const bodyTex = createCreeperBodyTexture();

  const faceMat = new THREE.MeshLambertMaterial({ map: faceTex });
  const bodyMat = new THREE.MeshLambertMaterial({ map: bodyTex });
  const skinMat = new THREE.MeshLambertMaterial({ color: 0x16a34a });

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.46, 0.46), [
    bodyMat, bodyMat, bodyMat, bodyMat, bodyMat, faceMat,
  ]);
  head.position.set(0, 1.45, 0);
  group.add(head);

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.65, 0.26), bodyMat);
  torso.position.set(0, 0.90, 0);
  group.add(torso);

  const legGeo = new THREE.BoxGeometry(0.20, 0.45, 0.20);
  const legs = [];
  const legPositions = [
    [-0.14, 0.22, -0.16],
    [0.14, 0.22, -0.16],
    [-0.14, 0.22, 0.16],
    [0.14, 0.22, 0.16],
  ];

  for (const pos of legPositions) {
    const leg = new THREE.Mesh(legGeo, bodyMat);
    leg.position.set(...pos);
    group.add(leg);
    legs.push(leg);
  }

  return {
    group,
    legs,
    head,
    body: torso,
    originalMats: [faceMat, bodyMat, skinMat],
  };
}

// ── Spawn & Lifecycle ──────────────────────────────────────

export function initMobManager(s) {
  scene = s;
}

export function spawnMob(type, x, y, z) {
  if (!scene) return null;

  let modelData;
  let maxHp = 10;
  let eyeHeight = 1.4;

  if (type === MobType.PIG) {
    modelData = createPigModel();
    maxHp = 10;
    eyeHeight = 0.6;
  } else if (type === MobType.SHEEP) {
    modelData = createSheepModel();
    maxHp = 10;
    eyeHeight = 0.65;
  } else if (type === MobType.SKELETON) {
    modelData = createSkeletonModel();
    maxHp = 16;
    eyeHeight = 1.45;
  } else if (type === MobType.SPIDER) {
    modelData = createSpiderModel();
    maxHp = 14;
    eyeHeight = 0.35;
  } else if (type === MobType.CREEPER) {
    modelData = createCreeperModel();
    maxHp = 18;
    eyeHeight = 1.45;
  } else {
    modelData = createZombieModel();
    maxHp = 20;
    eyeHeight = 1.45;
  }

  modelData.group.position.set(x, y, z);
  scene.add(modelData.group);

  const mob = {
    type,
    model: modelData,
    pos: new THREE.Vector3(x, y, z),
    vel: new THREE.Vector3(0, 0, 0),
    yaw: 0,
    health: maxHp,
    maxHealth: maxHp,
    eyeHeight,
    state: 'idle',
    stateTimer: Math.random() * 2.0,
    lastSeenPos: null,
    canSeePlayer: false,
    losCheckTimer: Math.random() * 0.25,
    attackCooldown: 0,
    shootCooldown: 2.0,
    fuseTimer: 0,
    isFusing: false,
    isAngered: false,
    burnTimer: 0,
    onGround: true,
    flashRedTimer: 0,
  };

  mobs.push(mob);
  return mob;
}

export function hitMob(mob, damage, knockbackDir) {
  if (!mob || mob.health <= 0) return;

  mob.health -= damage;
  mob.flashRedTimer = 0.22; // Red hit flash effect
  playMobHitSound();
  spawnHitParticles(mob.pos.x, mob.pos.y + mob.eyeHeight * 0.5, mob.pos.z);

  const kb = knockbackDir.clone().multiplyScalar(4.5);
  mob.vel.x += kb.x;
  mob.vel.z += kb.z;
  mob.vel.y = 3.5;

  mob.isAngered = true;

  if (mob.type === MobType.PIG) {
    mob.state = 'flee';
    mob.stateTimer = 4.5;
    playPigSound();
  } else if (mob.type === MobType.SHEEP) {
    mob.state = 'flee';
    mob.stateTimer = 4.5;
    playSheepSound();
  } else {
    mob.state = 'chase';
    mob.lastSeenPos = getPlayerPosition().clone();
    if (mob.type === MobType.ZOMBIE) playZombieSound();
  }

  if (mob.health <= 0) {
    killMob(mob);
  }
}

export function killMob(mob) {
  scene.remove(mob.model.group);
  const idx = mobs.indexOf(mob);
  if (idx !== -1) mobs.splice(idx, 1);

  // Authentic Mob Drops
  if (mob.type === MobType.PIG) {
    spawnDrop(BlockType.PORKCHOP, mob.pos.x, mob.pos.y + 0.5, mob.pos.z);
  } else if (mob.type === MobType.SHEEP) {
    spawnDrop(BlockType.WOOL, mob.pos.x, mob.pos.y + 0.5, mob.pos.z);
    spawnDrop(BlockType.MUTTON, mob.pos.x, mob.pos.y + 0.5, mob.pos.z);
  } else if (mob.type === MobType.ZOMBIE) {
    spawnDrop(BlockType.ROTTEN_FLESH, mob.pos.x, mob.pos.y + 0.5, mob.pos.z);
    if (Math.random() < 0.25) {
      spawnDrop(BlockType.IRON_INGOT, mob.pos.x, mob.pos.y + 0.5, mob.pos.z);
    }
  } else if (mob.type === MobType.SKELETON) {
    spawnDrop(BlockType.BONE, mob.pos.x, mob.pos.y + 0.5, mob.pos.z);
    spawnDrop(BlockType.ARROW, mob.pos.x, mob.pos.y + 0.5, mob.pos.z);
  } else if (mob.type === MobType.SPIDER) {
    spawnDrop(BlockType.STRING, mob.pos.x, mob.pos.y + 0.5, mob.pos.z);
    spawnDrop(BlockType.SPIDER_EYE, mob.pos.x, mob.pos.y + 0.5, mob.pos.z);
  } else if (mob.type === MobType.CREEPER) {
    spawnDrop(BlockType.GUNPOWDER, mob.pos.x, mob.pos.y + 0.5, mob.pos.z);
  }
}

// ── Voxel Spherical Explosions (Creeper & TNT) ─────────────

export function createVoxelExplosion(x, y, z, radius = 2.8, maxDamage = 16) {
  if (!scene) return;

  playExplosionSound();

  const center = new THREE.Vector3(x, y, z);
  const playerPos = getPlayerPosition();
  const toPlayer = playerPos.clone().add(new THREE.Vector3(0, 0.9, 0)).sub(center);
  const distToPlayer = toPlayer.length();

  // Damage Player
  if (distToPlayer < radius * 2.2) {
    const falloff = 1 - (distToPlayer / (radius * 2.2));
    const dmg = Math.max(2, Math.round(maxDamage * falloff));
    damagePlayer(dmg, toPlayer.clone().normalize());
  }

  // Damage surrounding Mobs
  for (const mob of mobs) {
    const d = mob.pos.distanceTo(center);
    if (d < radius * 2.0) {
      hitMob(mob, 14, mob.pos.clone().sub(center).normalize());
    }
  }

  // Spherical Voxel Crater Destruction
  const minX = Math.floor(x - radius);
  const maxX = Math.ceil(x + radius);
  const minY = Math.max(1, Math.floor(y - radius));
  const maxY = Math.min(63, Math.ceil(y + radius));
  const minZ = Math.floor(z - radius);
  const maxZ = Math.ceil(z + radius);

  for (let bz = minZ; bz <= maxZ; bz++) {
    for (let bx = minX; bx <= maxX; bx++) {
      for (let by = minY; by <= maxY; by++) {
        const d = Math.hypot(bx + 0.5 - x, by + 0.5 - y, bz + 0.5 - z);
        if (d <= radius) {
          const currentType = getBlockAtWorld(bx, by, bz);
          if (currentType !== BlockType.AIR && currentType !== BlockType.WATER) {
            spawnBlockBreakParticles(bx, by, bz, currentType);
            setBlockAtWorld(scene, bx, by, bz, BlockType.AIR);

            if (Math.random() < 0.40) {
              const dropItem = getBlockDrop(currentType);
              if (dropItem > 0) {
                spawnDrop(dropItem, bx + 0.5, by + 0.5, bz + 0.5);
              }
            }
          }
        }
      }
    }
  }
}

// ── Active TNT Ignition Entity ─────────────────────────────

export function igniteTNT(x, y, z) {
  if (!scene) return;

  setBlockAtWorld(scene, x, y, z, BlockType.AIR);

  const tntGeo = new THREE.BoxGeometry(0.98, 0.98, 0.98);
  const tntMat = new THREE.MeshLambertMaterial({ color: 0xef4444 });
  const mesh = new THREE.Mesh(tntGeo, tntMat);
  mesh.position.set(x + 0.5, y + 0.5, z + 0.5);
  scene.add(mesh);

  playCreeperFuseSound();

  tntEntities.push({
    mesh,
    mat: tntMat,
    pos: new THREE.Vector3(x + 0.5, y + 0.5, z + 0.5),
    timer: 2.2,
    blinkTimer: 0,
  });
}

function updateTNTEntities(dt) {
  for (let i = tntEntities.length - 1; i >= 0; i--) {
    const tnt = tntEntities[i];
    tnt.timer -= dt;
    tnt.blinkTimer += dt * 10;

    if (Math.floor(tnt.blinkTimer) % 2 === 0) {
      tnt.mat.color.setHex(0xffffff);
    } else {
      tnt.mat.color.setHex(0xef4444);
    }

    if (tnt.timer <= 0) {
      scene.remove(tnt.mesh);
      tntEntities.splice(i, 1);
      createVoxelExplosion(tnt.pos.x, tnt.pos.y, tnt.pos.z, 3.8, 20);
    }
  }
}

// ── Player Bow Projectile Arrow ────────────────────────────

export function spawnPlayerArrow(origin, direction) {
  if (!scene) return;

  playBowShootSound();

  const arrowGeo = new THREE.BoxGeometry(0.08, 0.08, 0.6);
  const arrowMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
  const mesh = new THREE.Mesh(arrowGeo, arrowMat);

  mesh.position.copy(origin);
  scene.add(mesh);

  const vel = direction.clone().multiplyScalar(24); // 24 blocks/s

  arrows.push({
    mesh,
    pos: origin.clone(),
    vel,
    life: 5.0,
    isPlayerShot: true,
  });
}

function spawnMobArrow(origin, targetPos) {
  if (!scene) return;

  const arrowGeo = new THREE.BoxGeometry(0.08, 0.08, 0.5);
  const arrowMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });
  const mesh = new THREE.Mesh(arrowGeo, arrowMat);

  mesh.position.copy(origin);
  scene.add(mesh);

  const dir = targetPos.clone().sub(origin).normalize();
  const vel = dir.multiplyScalar(16); // 16 blocks/s

  arrows.push({
    mesh,
    pos: origin.clone(),
    vel,
    life: 4.0,
    isPlayerShot: false,
  });
}

function updateArrows(dt) {
  const playerPos = getPlayerPosition();

  for (let i = arrows.length - 1; i >= 0; i--) {
    const a = arrows[i];
    a.life -= dt;

    a.vel.y -= 12 * dt; // Gravity
    a.pos.addScaledVector(a.vel, dt);
    a.mesh.position.copy(a.pos);

    if (a.isPlayerShot) {
      let hitAny = false;
      for (const mob of mobs) {
        const mobCenter = mob.pos.clone().add(new THREE.Vector3(0, mob.eyeHeight * 0.5, 0));
        if (a.pos.distanceTo(mobCenter) < 0.9) {
          hitMob(mob, 9, a.vel.clone().normalize());
          scene.remove(a.mesh);
          arrows.splice(i, 1);
          hitAny = true;
          break;
        }
      }
      if (hitAny) continue;
    } else {
      const distToPlayer = a.pos.distanceTo(playerPos.clone().add(new THREE.Vector3(0, 0.9, 0)));
      if (distToPlayer < 0.75) {
        damagePlayer(4, a.vel.clone().normalize());
        scene.remove(a.mesh);
        arrows.splice(i, 1);
        continue;
      }
    }

    if (isWorldBlockSolid(Math.floor(a.pos.x), Math.floor(a.pos.y), Math.floor(a.pos.z)) || a.life <= 0) {
      scene.remove(a.mesh);
      arrows.splice(i, 1);
    }
  }
}

// ── Mob Update Loop ────────────────────────────────────────

export function updateMobs(dt) {
  const playerPos = getPlayerPosition();

  // Natural Spawning logic (throttled & balanced)
  spawnTimer += dt;
  if (spawnTimer > 4.0 && mobs.length < MAX_MOBS) {
    spawnTimer = 0;
    trySpawnNaturalMob(playerPos);
  }

  updateArrows(dt);
  updateTNTEntities(dt);

  for (let i = mobs.length - 1; i >= 0; i--) {
    const mob = mobs[i];
    const distToPlayer = mob.pos.distanceTo(playerPos);

    // Auto-despawn distant mobs to conserve 100% CPU
    if (distToPlayer > 52.0) {
      scene.remove(mob.model.group);
      mobs.splice(i, 1);
      continue;
    }

    updateSingleMob(mob, dt, playerPos, distToPlayer);
  }
}

function trySpawnNaturalMob(playerPos) {
  const angle = Math.random() * Math.PI * 2;
  // Spawn between 24 and 38 blocks away (safe authentic distance)
  const dist = 24 + Math.random() * 14;
  const sx = Math.floor(playerPos.x + Math.cos(angle) * dist);
  const sz = Math.floor(playerPos.z + Math.sin(angle) * dist);
  const sy = getHeight(sx, sz);

  if (sy > 15 && sy < 55) {
    const day = isDaytime();
    if (day) {
      // Daytime: spawn peaceful animals (Pigs & Sheep)
      const passiveCount = mobs.filter((m) => m.type === MobType.PIG || m.type === MobType.SHEEP).length;
      if (passiveCount < 5) {
        const p = Math.random() < 0.5 ? MobType.PIG : MobType.SHEEP;
        spawnMob(p, sx + 0.5, sy + 1, sz + 0.5);
      }
    } else {
      // Nighttime: spawn hostiles
      const r = Math.random();
      if (r < 0.35) spawnMob(MobType.ZOMBIE, sx + 0.5, sy + 1, sz + 0.5);
      else if (r < 0.60) spawnMob(MobType.SKELETON, sx + 0.5, sy + 1, sz + 0.5);
      else if (r < 0.80) spawnMob(MobType.CREEPER, sx + 0.5, sy + 1, sz + 0.5);
      else spawnMob(MobType.SPIDER, sx + 0.5, sy + 1, sz + 0.5);
    }
  }
}

function updateSingleMob(mob, dt, playerPos, distToPlayer) {
  // Sunlight burn for Zombies and Skeletons
  if ((mob.type === MobType.ZOMBIE || mob.type === MobType.SKELETON) && isDaytime()) {
    const topY = getHeight(Math.floor(mob.pos.x), Math.floor(mob.pos.z));
    if (mob.pos.y >= topY) {
      mob.burnTimer += dt;
      if (mob.burnTimer >= 1.0) {
        mob.burnTimer = 0;
        mob.health -= 2;
        spawnHitParticles(mob.pos.x, mob.pos.y + 1, mob.pos.z);
        if (mob.health <= 0) {
          killMob(mob);
          return;
        }
      }
    }
  }

  // Vision Check (throttled)
  mob.losCheckTimer -= dt;
  if (mob.losCheckTimer <= 0) {
    mob.losCheckTimer = 0.30;
    const canSee = hasLineOfSight(mob.pos.x, mob.pos.y + mob.eyeHeight, mob.pos.z, playerPos.x, playerPos.y + 1.2, playerPos.z);
    mob.canSeePlayer = canSee && distToPlayer < 16; // 16 blocks vision radius

    if (mob.canSeePlayer) {
      mob.lastSeenPos = playerPos.clone();
      if (mob.type !== MobType.PIG) {
        // Spider is neutral during daytime unless angered
        if (mob.type === MobType.SPIDER && isDaytime() && !mob.isAngered) {
          mob.state = 'idle';
        } else {
          mob.state = 'chase';
        }
      }
    } else if (distToPlayer > 22 && mob.state === 'chase') {
      mob.state = 'idle';
    }
  }

  // AI Behaviors
  if (mob.type === MobType.PIG) {
    updatePigAI(mob, dt, playerPos, distToPlayer);
  } else if (mob.type === MobType.SHEEP) {
    updateSheepAI(mob, dt, playerPos, distToPlayer);
  } else if (mob.type === MobType.SKELETON) {
    updateSkeletonAI(mob, dt, playerPos, distToPlayer);
  } else if (mob.type === MobType.SPIDER) {
    updateSpiderAI(mob, dt, playerPos, distToPlayer);
  } else if (mob.type === MobType.CREEPER) {
    updateCreeperAI(mob, dt, playerPos, distToPlayer);
  } else {
    updateZombieAI(mob, dt, playerPos, distToPlayer);
  }

  // ── True 3D Voxel Collision & Gravity ─────────────────────
  mob.vel.y -= 24 * dt; // Gravity
  mob.pos.addScaledVector(mob.vel, dt);

  const blockX = Math.floor(mob.pos.x);
  const blockZ = Math.floor(mob.pos.z);
  const mobY = Math.floor(mob.pos.y);

  // Scan downwards for the solid voxel directly beneath the mob's feet
  let solidFloorY = -999;
  const maxScanY = Math.min(63, mobY + 1);
  for (let cy = maxScanY; cy >= 0; cy--) {
    if (isWorldBlockSolid(blockX, cy, blockZ)) {
      solidFloorY = cy + 1;
      break;
    }
  }

  if (solidFloorY >= 0 && mob.pos.y <= solidFloorY) {
    mob.pos.y = solidFloorY;
    mob.vel.y = 0;
    mob.onGround = true;
  } else if (mob.pos.y < -10) {
    // Mob fell into void
    killMob(mob);
    return;
  } else {
    mob.onGround = false;
  }

  // Step up 1 block when hitting solid obstacle
  const nextX = mob.pos.x + mob.vel.x * dt;
  const nextZ = mob.pos.z + mob.vel.z * dt;
  const checkFootY = Math.floor(mob.pos.y);
  if (isWorldBlockSolid(Math.floor(nextX), checkFootY, Math.floor(nextZ))) {
    if (!isWorldBlockSolid(Math.floor(nextX), checkFootY + 1, Math.floor(nextZ))) {
      if (mob.onGround) {
        mob.vel.y = 5.8;
        mob.onGround = false;
      }
    } else {
      mob.vel.x = 0;
      mob.vel.z = 0;
    }
  }

  mob.vel.x *= Math.exp(-8 * dt);
  mob.vel.z *= Math.exp(-8 * dt);

  mob.model.group.position.copy(mob.pos);
  // Rotate by PI so head points forward in the direction of movement
  mob.model.group.rotation.y = mob.yaw + Math.PI;

  // ── Hit Flash & Pain Recoil Animation ──────────────────
  if (mob.flashRedTimer > 0) {
    mob.flashRedTimer -= dt;
    mob.model.group.traverse((child) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((m) => {
          if (m.emissive) {
            m.emissive.setHex(0xef4444);
            m.emissiveIntensity = 0.85;
          }
        });
      }
    });
    mob.model.group.rotation.x = -0.22;
  } else {
    mob.model.group.traverse((child) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((m) => {
          if (m.emissive) {
            m.emissive.setHex(0x000000);
            m.emissiveIntensity = 0.0;
          }
        });
      }
    });
    mob.model.group.rotation.x = 0;
  }

  // ── Limb Walking & Attack Animations ────────────────────
  const speedSq = mob.vel.x * mob.vel.x + mob.vel.z * mob.vel.z;
  const isMoving = speedSq > 0.05;
  const time = performance.now() * 0.005;

  if (mob.model.legs && mob.model.legs.length >= 2) {
    if (mob.type === MobType.SPIDER) {
      for (let i = 0; i < mob.model.legs.length; i++) {
        mob.model.legs[i].rotation.x = isMoving ? Math.sin(time * 2 + i) * 0.35 : 0;
      }
    } else if (mob.model.legs.length === 4) {
      // Quadruped trotting (Pig / Sheep / Creeper)
      mob.model.legs[0].rotation.x = isMoving ? Math.sin(time * 1.5) * 0.5 : 0;
      mob.model.legs[1].rotation.x = isMoving ? -Math.sin(time * 1.5) * 0.5 : 0;
      mob.model.legs[2].rotation.x = isMoving ? -Math.sin(time * 1.5) * 0.5 : 0;
      mob.model.legs[3].rotation.x = isMoving ? Math.sin(time * 1.5) * 0.5 : 0;
    } else if (mob.model.legs.length === 2) {
      // Biped walking (Zombie / Skeleton)
      mob.model.legs[0].rotation.x = isMoving ? Math.sin(time * 1.5) * 0.5 : 0;
      mob.model.legs[1].rotation.x = isMoving ? -Math.sin(time * 1.5) * 0.5 : 0;
    }
  }

  // Zombie Attack Arm Slash
  if (mob.type === MobType.ZOMBIE && mob.model.arms && mob.model.arms.length === 2) {
    if (distToPlayer < 2.0) {
      mob.model.arms[0].rotation.x = -Math.PI * 0.45 + Math.sin(time * 3) * 0.5;
      mob.model.arms[1].rotation.x = -Math.PI * 0.45 + Math.cos(time * 3) * 0.5;
    } else {
      mob.model.arms[0].rotation.x = -Math.PI * 0.5;
      mob.model.arms[1].rotation.x = -Math.PI * 0.5;
    }
  }
}

function updateCreeperAI(mob, dt, playerPos, distToPlayer) {
  if (mob.state === 'chase') {
    mob.yaw = Math.atan2(playerPos.x - mob.pos.x, playerPos.z - mob.pos.z);
    const speed = 1.8; // Realistic, reactable speed
    mob.vel.x = Math.sin(mob.yaw) * speed;
    mob.vel.z = Math.cos(mob.yaw) * speed;

    // Approach and ignite fuse
    if (distToPlayer < 2.4) {
      if (!mob.isFusing) {
        mob.isFusing = true;
        playCreeperFuseSound();
      }

      mob.fuseTimer += dt;
      mob.vel.x = 0;
      mob.vel.z = 0;

      // Pulsing white inflation visual
      const scale = 1.0 + (mob.fuseTimer / 1.8) * 0.35;
      mob.model.group.scale.set(scale, scale, scale);

      if (mob.fuseTimer >= 1.8) {
        createVoxelExplosion(mob.pos.x, mob.pos.y + 0.5, mob.pos.z, 2.8, 16);
        killMob(mob);
        return;
      }
    } else if (distToPlayer > 4.5 && mob.isFusing) {
      // Player backed away in time! Defuse
      mob.isFusing = false;
      mob.fuseTimer = 0;
      mob.model.group.scale.set(1, 1, 1);
    }
  }
}

function updateZombieAI(mob, dt, playerPos, distToPlayer) {
  if (mob.state === 'chase') {
    mob.yaw = Math.atan2(playerPos.x - mob.pos.x, playerPos.z - mob.pos.z);
    const speed = 1.8; // Authentic slow shambler
    mob.vel.x = Math.sin(mob.yaw) * speed;
    mob.vel.z = Math.cos(mob.yaw) * speed;

    if (distToPlayer < 1.4) {
      mob.attackCooldown -= dt;
      if (mob.attackCooldown <= 0) {
        mob.attackCooldown = 1.2;
        damagePlayer(3, new THREE.Vector3(Math.sin(mob.yaw), 0, Math.cos(mob.yaw)));
      }
    }
  }
}

function updateSkeletonAI(mob, dt, playerPos, distToPlayer) {
  mob.yaw = Math.atan2(playerPos.x - mob.pos.x, playerPos.z - mob.pos.z);

  if (mob.canSeePlayer) {
    if (distToPlayer < 8.0) {
      // Retreat slightly
      mob.vel.x = -Math.sin(mob.yaw) * 1.8;
      mob.vel.z = -Math.cos(mob.yaw) * 1.8;
    } else if (distToPlayer > 14.0) {
      // Approach
      mob.vel.x = Math.sin(mob.yaw) * 1.8;
      mob.vel.z = Math.cos(mob.yaw) * 1.8;
    }

    mob.shootCooldown -= dt;
    if (mob.shootCooldown <= 0 && distToPlayer < 18) {
      mob.shootCooldown = 2.8; // Tactical delay giving player window to dodge
      playSwordSwingSound();
      spawnMobArrow(
        mob.pos.clone().add(new THREE.Vector3(0, 1.2, 0)),
        playerPos.clone().add(new THREE.Vector3(0, 0.9, 0))
      );
    }
  }
}

function updateSpiderAI(mob, dt, playerPos, distToPlayer) {
  if (mob.state === 'chase') {
    mob.yaw = Math.atan2(playerPos.x - mob.pos.x, playerPos.z - mob.pos.z);
    const speed = 2.8;
    mob.vel.x = Math.sin(mob.yaw) * speed;
    mob.vel.z = Math.cos(mob.yaw) * speed;

    // Tactical pounce leap when close
    if (distToPlayer < 4.0 && mob.onGround && Math.random() < 0.04) {
      mob.vel.y = 4.8;
      mob.vel.x *= 1.4;
      mob.vel.z *= 1.4;
      mob.onGround = false;
    }

    if (distToPlayer < 1.3) {
      mob.attackCooldown -= dt;
      if (mob.attackCooldown <= 0) {
        mob.attackCooldown = 1.0;
        damagePlayer(2, new THREE.Vector3(Math.sin(mob.yaw), 0, Math.cos(mob.yaw)));
      }
    }
  }
}

function updatePigAI(mob, dt, playerPos, distToPlayer) {
  if (mob.state === 'flee') {
    mob.stateTimer -= dt;
    const away = mob.pos.clone().sub(playerPos).normalize();
    mob.yaw = Math.atan2(away.x, away.z);
    mob.vel.x = Math.sin(mob.yaw) * 2.8;
    mob.vel.z = Math.cos(mob.yaw) * 2.8;
    if (mob.stateTimer <= 0) mob.state = 'idle';
  } else {
    mob.stateTimer -= dt;
    if (mob.stateTimer <= 0) {
      mob.stateTimer = 2.5 + Math.random() * 3.5;
      mob.yaw += (Math.random() - 0.5) * 1.8;
    }
    // Peaceful stroll forward
    mob.vel.x = Math.sin(mob.yaw) * 0.9;
    mob.vel.z = Math.cos(mob.yaw) * 0.9;
  }
}

function updateSheepAI(mob, dt, playerPos, distToPlayer) {
  if (mob.state === 'flee') {
    mob.stateTimer -= dt;
    const away = mob.pos.clone().sub(playerPos).normalize();
    mob.yaw = Math.atan2(away.x, away.z);
    mob.vel.x = Math.sin(mob.yaw) * 2.8;
    mob.vel.z = Math.cos(mob.yaw) * 2.8;
    if (mob.stateTimer <= 0) mob.state = 'idle';
  } else {
    mob.stateTimer -= dt;
    if (mob.stateTimer <= 0) {
      mob.stateTimer = 3.0 + Math.random() * 4.0;
      mob.yaw += (Math.random() - 0.5) * 1.8;
      if (Math.random() < 0.25) {
        try { playSheepSound(); } catch (err) {}
      }
    }
    // Peaceful stroll forward
    mob.vel.x = Math.sin(mob.yaw) * 0.85;
    mob.vel.z = Math.cos(mob.yaw) * 0.85;
  }
}

export function raycastMob(origin, direction, maxDist = 3.8) {
  let closestMob = null;
  let closestDist = maxDist;

  for (const mob of mobs) {
    if (mob.health <= 0) continue;
    const mobCenter = mob.pos.clone().add(new THREE.Vector3(0, mob.eyeHeight * 0.5, 0));
    const toMob = mobCenter.clone().sub(origin);
    const proj = toMob.dot(direction);
    if (proj > 0 && proj < closestDist) {
      const perpDist = toMob.clone().sub(direction.clone().multiplyScalar(proj)).length();
      if (perpDist < 0.90) {
        closestDist = proj;
        closestMob = mob;
      }
    }
  }

  return closestMob;
}

export function getNearbyMobs() {
  return mobs;
}
