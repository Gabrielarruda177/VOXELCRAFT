/**
 * Player — AABB physics, responsive jumping, triple-tap Space flight, height-based fall damage, and health.
 */

import * as THREE from 'three';
import {
  getCamera,
  isPointerLocked,
  getYaw,
  getPitch,
  toggleCameraMode,
  getCameraMode,
  CameraMode,
  updateCameraPosition,
} from '../engine/camera.js';
import { getBlockAtWorld, getSpawnPosition } from '../world/worldManager.js';
import { BlockType, isSolid } from '../world/blockTypes.js';
import { isKeyDown } from '../engine/input.js';
import { playJumpSound, playFlyToggleSound, playHurtSound, playStepSound, playCraftSound } from '../engine/soundFx.js';
import { showCameraModeToast } from '../ui/hud.js';
import { updatePlayerModel } from './playerModel.js';
import { getSelectedBlockType } from '../engine/interaction.js';
import { getSwingProgress } from './hand.js';
import { getEquippedArmorDefense } from '../ui/inventory.js';

// ── Tuning constants ──────────────────────────────────────
const HALF_W = 0.3;
const HEIGHT = 1.8;
const EYE = 1.62;

const GRAVITY = 28;
const JUMP_VEL = 8.6;
const MOVE_SPEED = 5.8;
const FLY_SPEED = 14.0;
const FLY_VERTICAL_SPEED = 10.0;
const SWIM_SPEED = 3.6;
const ACCEL = 65;
const FRICTION = 14;

let stepTimer = 0.0;

const MAX_HEALTH = 20;
const DROWN_TOLERANCE = 6.0;
const DROWN_DPS = 2.0;
const REGEN_DELAY = 5.0;
const REGEN_RATE = 0.5;
const SAFE_FALL_HEIGHT = 3.2; // Safe fall height in blocks (like Minecraft)

// ── State ─────────────────────────────────────────────────
let camera = null;
const pos = new THREE.Vector3();
let velocity = new THREE.Vector3();
let health = MAX_HEALTH;
let hunger = 20; // 20 points = 10 drumsticks
let hungerExhaustion = 0.0;
let onGround = false;
let isFlying = false;
let inWater = false;
let submerged = false;
let underwaterTime = 0;
let moving = false;
let damageFlash = 0;
let regenTimer = 0;
let respawnTimer = 0;

// Fall distance tracking
let fallStartY = 0;
let isFalling = false;

// Jump tracking
let coyoteTimer = 0;
let jumpBufferTimer = 0;
const spacePressTimes = [];
let prevSpaceDown = false;

export function getHunger() {
  return hunger;
}

export function getMaxHunger() {
  return 20;
}

export function feedPlayer(amount) {
  hunger = Math.min(20, hunger + amount);
}

export function consumeFood(amount, heal = 0) {
  feedPlayer(amount);
  if (heal > 0) healPlayer(heal);
}

// ── Public API ─────────────────────────────────────────────

let f4ListenerAdded = false;

export function initPlayer() {
  camera = getCamera();
  health = MAX_HEALTH;
  velocity.set(0, 0, 0);
  isFlying = false;
  const spawn = getSpawnPosition();
  pos.set(spawn.x, spawn.y, spawn.z);
  fallStartY = pos.y;
  isFalling = false;
  if (camera) {
    camera.position.set(pos.x, pos.y + EYE, pos.z);
  }

  if (!f4ListenerAdded) {
    f4ListenerAdded = true;
    window.addEventListener('keydown', (e) => {
      if (e.code === 'F4' || e.code === 'F5') {
        e.preventDefault();
        const mode = toggleCameraMode();
        const labels = [
          '👁 Perspectiva: 1ª Pessoa',
          '🎥 Perspectiva: 3ª Pessoa (Costas)',
          '📸 Perspectiva: 3ª Pessoa (Frontal)',
        ];
        showCameraModeToast(labels[mode]);
        try { playCraftSound(); } catch (err) {}
      }
    });
  }
}

export function getHealth() { return health; }
export function getMaxHealth() { return MAX_HEALTH; }
export function getDamageFlash() { return damageFlash; }
export function isPlayerFlying() { return isFlying; }
export function getPlayerPosition() { return pos; }
export function getPlayerState() { return { onGround, moving, inWater, submerged, isFlying }; }

export function damage(amount, knockbackDir = null) {
  if (health <= 0) return;
  const def = getEquippedArmorDefense();
  const mitigation = Math.min(0.80, def * 0.04);
  const finalDamage = Math.max(1, amount * (1 - mitigation));

  health = Math.max(0, health - finalDamage);
  damageFlash = 1.0;
  regenTimer = 0;
  playHurtSound();

  if (knockbackDir) {
    velocity.x += knockbackDir.x * 5;
    velocity.z += knockbackDir.z * 5;
    velocity.y = 3.5;
  }
}

export function heal(amount) {
  if (health <= 0) return;
  health = Math.min(MAX_HEALTH, health + amount);
}

export function healPlayer(amount) {
  heal(amount);
}

export function respawn() {
  health = MAX_HEALTH;
  velocity.set(0, 0, 0);
  onGround = false;
  isFlying = false;
  underwaterTime = 0;
  regenTimer = 0;
  const spawn = getSpawnPosition();
  pos.set(spawn.x, spawn.y, spawn.z);
  fallStartY = pos.y;
  isFalling = false;
  if (camera) {
    camera.position.set(pos.x, pos.y + EYE, pos.z);
  }
}

// ── Collision Helpers ─────────────────────────────────────

function solidAt(wx, wy, wz) {
  if (wy < 0) return true;
  return isSolid(getBlockAtWorld(wx, wy, wz));
}

function collides(px, py, pz) {
  const minX = Math.floor(px - HALF_W + 0.001);
  const maxX = Math.floor(px + HALF_W - 0.001);
  const minY = Math.floor(py);
  const maxY = Math.floor(py + HEIGHT - 0.001);
  const minZ = Math.floor(pz - HALF_W + 0.001);
  const maxZ = Math.floor(pz + HALF_W - 0.001);

  for (let y = minY; y <= maxY; y++) {
    for (let z = minZ; z <= maxZ; z++) {
      for (let x = minX; x <= maxX; x++) {
        if (solidAt(x, y, z)) return true;
      }
    }
  }
  return false;
}

function waterAt(wx, wy, wz) {
  return getBlockAtWorld(wx, wy, wz) === BlockType.WATER;
}

// ── Main Update ───────────────────────────────────────────

export function updatePlayer(dt) {
  if (!camera) camera = getCamera();
  if (!camera) return;

  const locked = isPointerLocked();

  damageFlash = Math.max(0, damageFlash - dt * 2.0);

  inWater = waterAt(Math.floor(pos.x), Math.floor(pos.y + 0.2), Math.floor(pos.z));
  submerged = waterAt(Math.floor(pos.x), Math.floor(pos.y + EYE), Math.floor(pos.z));

  // Space key detection (Triple tap for flight)
  const spaceDown = locked && isKeyDown('Space');
  const now = performance.now() / 1000;

  if (spaceDown && !prevSpaceDown) {
    jumpBufferTimer = 0.15;
    spacePressTimes.push(now);

    while (spacePressTimes.length > 0 && (now - spacePressTimes[0]) > 0.55) {
      spacePressTimes.shift();
    }

    if (spacePressTimes.length >= 3) {
      isFlying = !isFlying;
      velocity.set(0, 0, 0);
      spacePressTimes.length = 0;
      isFalling = false;
      playFlyToggleSound(isFlying);
    }
  }
  prevSpaceDown = spaceDown;

  if (jumpBufferTimer > 0) jumpBufferTimer -= dt;
  if (onGround) {
    coyoteTimer = 0.12;
  } else {
    coyoteTimer = Math.max(0, coyoteTimer - dt);
  }

  // ── Directional inputs (W = Forward, S = Backward, A = Left, D = Right) ──
  let moveFwd = 0; // +1 = W (forward), -1 = S (backward)
  let moveSide = 0; // +1 = D (right), -1 = A (left)

  if (locked) {
    if (isKeyDown('KeyW')) moveFwd += 1;
    if (isKeyDown('KeyS')) moveFwd -= 1;
    if (isKeyDown('KeyD')) moveSide += 1;
    if (isKeyDown('KeyA')) moveSide -= 1;
  }

  const yaw = getYaw();
  // Forward vector: (-sin(yaw), -cos(yaw))
  const fwdX = -Math.sin(yaw);
  const fwdZ = -Math.cos(yaw);
  // Right vector: (cos(yaw), -sin(yaw))
  const rightX = Math.cos(yaw);
  const rightZ = -Math.sin(yaw);

  let tx = 0, tz = 0;
  if (moveFwd !== 0 || moveSide !== 0) {
    tx = fwdX * moveFwd + rightX * moveSide;
    tz = fwdZ * moveFwd + rightZ * moveSide;
    const len = Math.hypot(tx, tz);
    if (len > 0.001) {
      tx /= len;
      tz /= len;
    }
  }

  moving = (moveFwd !== 0 || moveSide !== 0);

  if (isFlying) {
    isFalling = false;
    const targetSpeed = FLY_SPEED;
    const k = 1 - Math.exp(-ACCEL * dt);

    velocity.x += (tx * (moving ? targetSpeed : 0) - velocity.x) * k;
    velocity.z += (tz * (moving ? targetSpeed : 0) - velocity.z) * k;

    let vyTarget = 0;
    if (locked) {
      if (isKeyDown('Space')) vyTarget += FLY_VERTICAL_SPEED;
      if (isKeyDown('ShiftLeft') || isKeyDown('ShiftRight')) vyTarget -= FLY_VERTICAL_SPEED;
    }
    velocity.y += (vyTarget - velocity.y) * k;

    pos.x += velocity.x * dt;
    if (collides(pos.x, pos.y, pos.z)) {
      if (velocity.x > 0) pos.x = Math.floor(pos.x + HALF_W) - HALF_W - 0.001;
      else if (velocity.x < 0) pos.x = Math.floor(pos.x - HALF_W) + 1 + HALF_W + 0.001;
      velocity.x = 0;
    }

    pos.z += velocity.z * dt;
    if (collides(pos.x, pos.y, pos.z)) {
      if (velocity.z > 0) pos.z = Math.floor(pos.z + HALF_W) - HALF_W - 0.001;
      else if (velocity.z < 0) pos.z = Math.floor(pos.z - HALF_W) + 1 + HALF_W + 0.001;
      velocity.z = 0;
    }

    pos.y += velocity.y * dt;
    if (collides(pos.x, pos.y, pos.z)) {
      if (velocity.y > 0) pos.y = Math.floor(pos.y + HEIGHT) - HEIGHT - 0.001;
      else if (velocity.y < 0) pos.y = Math.floor(pos.y) + 1;
      velocity.y = 0;
    }

  } else {
    // Jump execution
    const canJump = (onGround || coyoteTimer > 0) && !inWater;
    if (jumpBufferTimer > 0 && canJump) {
      velocity.y = JUMP_VEL;
      onGround = false;
      coyoteTimer = 0;
      jumpBufferTimer = 0;
      fallStartY = pos.y;
      isFalling = false;
      playJumpSound();
    } else if (inWater && spaceDown) {
      velocity.y = Math.max(velocity.y, 4.5);
      isFalling = false;
    }

    const gravity = inWater ? GRAVITY * 0.3 : GRAVITY;
    velocity.y -= gravity * dt;
    const maxFall = inWater ? 8 : 36;
    if (velocity.y < -maxFall) velocity.y = -maxFall;

    // Track peak falling height
    if (velocity.y < 0) {
      if (!isFalling) {
        isFalling = true;
        fallStartY = pos.y;
      }
    } else {
      isFalling = false;
      fallStartY = pos.y;
    }

    const speed = (submerged ? 0.7 : 1) * (inWater ? SWIM_SPEED : MOVE_SPEED);
    if (moving) {
      const k = 1 - Math.exp(-ACCEL * dt);
      velocity.x += (tx * speed - velocity.x) * k;
      velocity.z += (tz * speed - velocity.z) * k;

      const horizSpeed = Math.hypot(velocity.x, velocity.z);
      if (onGround && !inWater && horizSpeed > 1.2 && !isFlying) {
        stepTimer += dt;
        if (stepTimer >= 0.42) {
          stepTimer = 0.0;
          const underBlock = getBlockAtWorld(Math.floor(pos.x), Math.floor(pos.y - 0.2), Math.floor(pos.z));
          playStepSound(underBlock);
        }
      } else {
        stepTimer = 0.0;
      }
    } else {
      const damp = Math.exp(-FRICTION * dt);
      velocity.x *= damp;
      velocity.z *= damp;
      stepTimer = 0.0;
    }

    const tryStepUp = (dx, dz) => {
      if (!onGround) return false;
      const stepH = 0.55;
      if (!collides(pos.x + dx, pos.y + stepH, pos.z + dz)) {
        pos.y += stepH;
        return true;
      }
      return false;
    };

    pos.x += velocity.x * dt;
    if (collides(pos.x, pos.y, pos.z)) {
      if (!tryStepUp(0, 0)) {
        if (velocity.x > 0) pos.x = Math.floor(pos.x + HALF_W) - HALF_W - 0.001;
        else if (velocity.x < 0) pos.x = Math.floor(pos.x - HALF_W) + 1 + HALF_W + 0.001;
        velocity.x = 0;
      }
    }

    pos.z += velocity.z * dt;
    if (collides(pos.x, pos.y, pos.z)) {
      if (!tryStepUp(0, 0)) {
        if (velocity.z > 0) pos.z = Math.floor(pos.z + HALF_W) - HALF_W - 0.001;
        else if (velocity.z < 0) pos.z = Math.floor(pos.z - HALF_W) + 1 + HALF_W + 0.001;
        velocity.z = 0;
      }
    }

    const wasFalling = velocity.y < 0;
    pos.y += velocity.y * dt;
    onGround = false;

    if (collides(pos.x, pos.y, pos.z)) {
      if (wasFalling) {
        onGround = true;
        const landingY = Math.floor(pos.y) + 1;
        const fallDistance = Math.max(0, fallStartY - landingY);

        pos.y = landingY;
        velocity.y = 0;

        // Minecraft Fall damage calculation (safe up to 3 blocks)
        if (!inWater && fallDistance > SAFE_FALL_HEIGHT) {
          const fallDmg = Math.floor((fallDistance - SAFE_FALL_HEIGHT) * 1.5);
          if (fallDmg > 0) {
            damage(fallDmg);
          }
        }
        isFalling = false;
        fallStartY = pos.y;
      } else {
        pos.y = Math.floor(pos.y + HEIGHT) - HEIGHT - 0.001;
        velocity.y = 0;
      }
    }
  }

  if (pos.y < -10) respawn();

  updateCameraPosition(pos, EYE, solidAt);

  const is3rdPerson = getCameraMode() !== CameraMode.FIRST_PERSON;
  updatePlayerModel(
    dt,
    pos,
    getYaw(),
    getPitch(),
    moving,
    onGround,
    isFlying,
    getSwingProgress(),
    getSelectedBlockType(),
    is3rdPerson
  );

  if (submerged && !isFlying) {
    underwaterTime += dt;
    if (underwaterTime > DROWN_TOLERANCE) damage(DROWN_DPS * dt);
  } else {
    underwaterTime = Math.max(0, underwaterTime - dt * 2.5);
  }

  if (health > 0 && health < MAX_HEALTH && !submerged) {
    regenTimer += dt;
    if (regenTimer > REGEN_DELAY) {
      health = Math.min(MAX_HEALTH, health + REGEN_RATE * dt);
    }
  }

  if (health <= 0) {
    respawnTimer += dt;
    if (locked && isKeyDown('Space') && respawnTimer > 0.8) {
      respawn();
      respawnTimer = 0;
    }
  } else {
    respawnTimer = 0;
  }
}
