/**
 * First-Person Minecraft Hand & Held Items / Weapons.
 *
 * Renders the classic 3D Steve arm in the bottom-right viewport.
 * When a block, sword, tool or torch is selected, it is held straight and naturally in the fist.
 * Features walking bobbing and attack/mining swing animations.
 */

import * as THREE from 'three';
import { getCamera, isPointerLocked, getCameraMode, CameraMode } from '../engine/camera.js';
import { getSelectedBlockType, isMiningActive } from '../engine/interaction.js';
import { getPlayerState } from './player.js';
import { getBlockPreviewMesh } from '../rendering/blockPreview.js';
import { BlockType, isWeapon } from '../world/blockTypes.js';

// Base transform relative to camera (anchored in bottom-right corner)
const BASE_X = 0.36;
const BASE_Y = -0.30;
const BASE_Z = -0.44;

const BASE_ROT_X = -0.30;
const BASE_ROT_Y = 0.32;
const BASE_ROT_Z = -0.10;

let handGroup = null;
let armMesh = null;
let sleeveMesh = null;
let heldItemMesh = null;
let currentItemType = -1;

let swingProgress = 1;
let swingSpeed = 5.8;
let bobPhase = 0;
let miningSwingPhase = 0;

export function initHand() {
  const camera = getCamera();
  if (!camera) return;

  handGroup = new THREE.Group();

  const skinMat = new THREE.MeshLambertMaterial({
    color: 0xc68b59,
    depthTest: true,
  });

  const sleeveMat = new THREE.MeshLambertMaterial({
    color: 0x00a8a8,
    depthTest: true,
  });

  // Steve arm forearm & fist
  armMesh = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.10, 0.36), skinMat);
  armMesh.position.set(0, 0, 0.10);
  handGroup.add(armMesh);

  sleeveMesh = new THREE.Mesh(new THREE.BoxGeometry(0.108, 0.108, 0.14), sleeveMat);
  sleeveMesh.position.set(0, 0, 0.23);
  handGroup.add(sleeveMesh);

  updateHeldItem();

  handGroup.position.set(BASE_X, BASE_Y, BASE_Z);
  handGroup.rotation.set(BASE_ROT_X, BASE_ROT_Y, BASE_ROT_Z);
  handGroup.renderOrder = 999;
  camera.add(handGroup);

  document.addEventListener('mousedown', onMouseDown);
}

function onMouseDown(e) {
  if (!isPointerLocked()) return;
  if (e.button === 0 || e.button === 2) {
    swingProgress = 0;
  }
}

function updateHeldItem() {
  const type = getSelectedBlockType();
  if (type === currentItemType) return;
  currentItemType = type;

  if (heldItemMesh) {
    handGroup.remove(heldItemMesh);
    heldItemMesh = null;
  }

  if (currentItemType > 0) {
    const preview = getBlockPreviewMesh(currentItemType, 0.22);
    if (preview) {
      heldItemMesh = preview;

      if (isWeapon(currentItemType)) {
        // Weapon positioning in hand: Hilt inside fist, blade pointing forward/upward straight into the screen
        heldItemMesh.position.set(0.01, 0.04, -0.09);
        heldItemMesh.rotation.set(-0.62, 0.20, -0.12);
      } else if (currentItemType === BlockType.TORCH || currentItemType === BlockType.FLINT_AND_STEEL) {
        // Torch / Flint & steel held upright in fist
        heldItemMesh.position.set(0.01, 0.04, -0.09);
        heldItemMesh.rotation.set(-0.40, 0.20, -0.10);
      } else {
        // Block positioning in hand palm
        heldItemMesh.position.set(0.02, 0.06, -0.12);
        heldItemMesh.rotation.set(0.25, 0.55, -0.08);
      }
      handGroup.add(heldItemMesh);
    }
  }
}

export function updateHand(dt, time) {
  if (!handGroup) return;

  const isFirstPerson = getCameraMode() === CameraMode.FIRST_PERSON;
  handGroup.visible = isFirstPerson;
  if (!isFirstPerson) return;

  updateHeldItem();

  // ── Swing & Mining Animation ─────────────────────────
  let swingRotX = 0;
  let swingRotY = 0;
  let swingRotZ = 0;
  let swingTransY = 0;
  let swingTransZ = 0;

  const isMining = isMiningActive();

  if (isMining) {
    // Continuous rhythmic mining stroke while holding click
    miningSwingPhase += dt * 8.5;
    const s = Math.abs(Math.sin(miningSwingPhase));

    swingRotX = -s * 0.95;
    swingRotY = s * 0.50;
    swingRotZ = -s * 0.35;
    swingTransY = -s * 0.08;
    swingTransZ = -s * 0.12;
  } else {
    miningSwingPhase = 0;
    if (swingProgress < 1) {
      const speed = isWeapon(currentItemType) ? 6.2 : swingSpeed;
      swingProgress = Math.min(1, swingProgress + dt * speed);
      const s = Math.sin(swingProgress * Math.PI);

      swingRotX = -s * 1.05;
      swingRotY = s * 0.60;
      swingRotZ = -s * 0.40;
      swingTransY = -s * 0.09;
      swingTransZ = -s * 0.14;
    }
  }

  // ── Walking Bobbing ──────────────────────────────────
  const ps = getPlayerState();
  let bobX = 0;
  let bobY = 0;

  if (ps.onGround && ps.moving) {
    bobPhase += dt * 10;
    bobX = Math.cos(bobPhase * 0.5) * 0.025;
    bobY = Math.abs(Math.sin(bobPhase)) * 0.035;
  } else if (ps.isFlying && ps.moving) {
    bobPhase += dt * 6;
    bobX = Math.cos(bobPhase * 0.5) * 0.015;
    bobY = Math.sin(bobPhase) * 0.015;
  } else {
    bobPhase = 0;
  }

  handGroup.position.set(
    BASE_X + bobX,
    BASE_Y + bobY + swingTransY,
    BASE_Z + swingTransZ
  );

  handGroup.rotation.set(
    BASE_ROT_X + swingRotX,
    BASE_ROT_Y + swingRotY,
    BASE_ROT_Z + swingRotZ
  );
}

export function getSwingProgress() {
  return swingProgress;
}
