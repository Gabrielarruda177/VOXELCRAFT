/**
 * Block & Item Preview — builds authentic high-fidelity 3D voxel models
 * for held items, swords, pickaxes, hoes, bows, and flint & steel.
 */

import * as THREE from 'three';
import { BlockType, BlockTextures } from '../world/blockTypes.js';
import { getUVsForTexture, getAtlasTexture } from '../rendering/textures/textureAtlas.js';

const meshCache = new Map();

/**
 * Create a rich, detailed Minecraft-style 3D Voxel Sword.
 */
function createDetailedSwordMesh(swordType = BlockType.IRON_SWORD) {
  const group = new THREE.Group();

  let edgeColor, bladeColor, coreColor, guardColor, gemColor, handleColor, pommelColor;

  if (swordType === BlockType.DIAMOND_SWORD) {
    edgeColor = 0x0891b2;   // Dark cyan bevel
    bladeColor = 0x22d3ee;  // Bright diamond
    coreColor = 0xf0fdf4;   // White-cyan glint
    guardColor = 0x0f172a;  // Deep dark steel
    gemColor = 0x06b6d4;    // Diamond inlay
    handleColor = 0x78350f; // Oak grip
    pommelColor = 0x0f172a; // Steel pommel
  } else if (swordType === BlockType.IRON_SWORD) {
    edgeColor = 0x64748b;   // Dark steel bevel
    bladeColor = 0xe2e8f0;  // Gleaming iron
    coreColor = 0xffffff;   // Chrome reflection
    guardColor = 0x334155;  // Dark cast iron
    gemColor = 0x94a3b8;    // Steel bolt
    handleColor = 0x854d0e; // Leather wrap
    pommelColor = 0x334155; // Iron pommel
  } else if (swordType === BlockType.STONE_SWORD) {
    edgeColor = 0x334155;   // Slate edge
    bladeColor = 0x64748b;  // Cobble body
    coreColor = 0x94a3b8;   // Granite streak
    guardColor = 0x1e293b;  // Dark stone
    gemColor = 0x475569;
    handleColor = 0x78350f;
    pommelColor = 0x1e293b;
  } else {
    // Wooden sword
    edgeColor = 0x78350f;   // Dark wood edge
    bladeColor = 0xb45309;  // Oak plank
    coreColor = 0xfbbf24;   // Pine grain
    guardColor = 0x451a03;  // Hardwood guard
    gemColor = 0xd97706;
    handleColor = 0x451a03;
    pommelColor = 0x451a03;
  }

  const matEdge = new THREE.MeshStandardMaterial({ color: edgeColor, roughness: 0.3, metalness: 0.7 });
  const matBlade = new THREE.MeshStandardMaterial({ color: bladeColor, roughness: 0.25, metalness: 0.8 });
  const matCore = new THREE.MeshStandardMaterial({ color: coreColor, roughness: 0.2, metalness: 0.9, emissive: swordType === BlockType.DIAMOND_SWORD ? 0x083344 : 0x000000, emissiveIntensity: 0.3 });
  const matGuard = new THREE.MeshStandardMaterial({ color: guardColor, roughness: 0.4, metalness: 0.85 });
  const matGem = new THREE.MeshStandardMaterial({ color: gemColor, roughness: 0.2, metalness: 0.6 });
  const matHandle = new THREE.MeshLambertMaterial({ color: handleColor });
  const matPommel = new THREE.MeshStandardMaterial({ color: pommelColor, roughness: 0.4, metalness: 0.85 });

  // 1. Blade Spine & Core
  const bladeCore = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.52, 0.032), matCore);
  bladeCore.position.set(0, 0.32, 0);
  group.add(bladeCore);

  // 2. Outer Blade Edges (Left and Right Bevels)
  const leftEdge = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.48, 0.024), matBlade);
  leftEdge.position.set(-0.034, 0.30, 0);
  group.add(leftEdge);

  const rightEdge = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.48, 0.024), matBlade);
  rightEdge.position.set(0.034, 0.30, 0);
  group.add(rightEdge);

  // 3. Dark Outer Contour Lines
  const leftBorder = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.44, 0.016), matEdge);
  leftBorder.position.set(-0.048, 0.28, 0);
  group.add(leftBorder);

  const rightBorder = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.44, 0.016), matEdge);
  rightBorder.position.set(0.048, 0.28, 0);
  group.add(rightBorder);

  // 4. Pointed Diamond Sword Tip
  const tipPoint = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.055, 0.028), matBlade);
  tipPoint.position.set(0, 0.60, 0);
  group.add(tipPoint);

  const tipHighlight = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.035, 0.034), matCore);
  tipHighlight.position.set(0, 0.60, 0);
  group.add(tipHighlight);

  // 5. Crossguard (Center Block + Wing Quillons)
  const guardMain = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.044, 0.052), matGuard);
  guardMain.position.set(0, 0.05, 0);
  group.add(guardMain);

  const leftQuillon = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.075, 0.056), matGuard);
  leftQuillon.position.set(-0.115, 0.07, 0);
  group.add(leftQuillon);

  const rightQuillon = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.075, 0.056), matGuard);
  rightQuillon.position.set(0.115, 0.07, 0);
  group.add(rightQuillon);

  // Guard Inlay Gem / Diamond
  const guardGem = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.042, 0.062), matGem);
  guardGem.position.set(0, 0.05, 0);
  group.add(guardGem);

  // 6. Handle Grip with Leather Bands
  const handleMain = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.16, 0.036), matHandle);
  handleMain.position.set(0, -0.055, 0);
  group.add(handleMain);

  const gripBand1 = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.024, 0.042), matPommel);
  gripBand1.position.set(0, -0.02, 0);
  group.add(gripBand1);

  const gripBand2 = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.024, 0.042), matPommel);
  gripBand2.position.set(0, -0.08, 0);
  group.add(gripBand2);

  // 7. Pommel Weight
  const pommel = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.048, 0.07), matPommel);
  pommel.position.set(0, -0.155, 0);
  group.add(pommel);

  const pommelGem = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.022, 0.036), matGem);
  pommelGem.position.set(0, -0.18, 0);
  group.add(pommelGem);

  return group;
}

/**
 * Create detailed Pickaxe mesh.
 */
function createDetailedPickaxeMesh(toolType = BlockType.IRON_PICKAXE) {
  const group = new THREE.Group();

  let headColor, coreColor;
  if (toolType === BlockType.DIAMOND_PICKAXE) {
    headColor = 0x22d3ee;
    coreColor = 0xe0f2fe;
  } else if (toolType === BlockType.IRON_PICKAXE) {
    headColor = 0xe2e8f0;
    coreColor = 0xffffff;
  } else if (toolType === BlockType.STONE_PICKAXE) {
    headColor = 0x64748b;
    coreColor = 0x94a3b8;
  } else {
    headColor = 0xb45309;
    coreColor = 0xfbbf24;
  }

  const matHead = new THREE.MeshStandardMaterial({ color: headColor, roughness: 0.35, metalness: 0.75 });
  const matCore = new THREE.MeshStandardMaterial({ color: coreColor, roughness: 0.25, metalness: 0.85 });
  const matWood = new THREE.MeshLambertMaterial({ color: 0x78350f });
  const matIronRing = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.8 });

  // Handle
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.58, 0.038), matWood);
  handle.position.set(0, 0.12, 0);
  group.add(handle);

  const ring = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.06, 0.046), matIronRing);
  ring.position.set(0, 0.34, 0);
  group.add(ring);

  // Curved Pickaxe Head
  const centerHead = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.07, 0.055), matHead);
  centerHead.position.set(0, 0.37, 0);
  group.add(centerHead);

  const leftBlade = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, 0.045), matHead);
  leftBlade.position.set(-0.11, 0.34, 0);
  leftBlade.rotation.z = 0.22;
  group.add(leftBlade);

  const leftTip = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.032, 0.038), matCore);
  leftTip.position.set(-0.20, 0.30, 0);
  leftTip.rotation.z = 0.44;
  group.add(leftTip);

  const rightBlade = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, 0.045), matHead);
  rightBlade.position.set(0.11, 0.34, 0);
  rightBlade.rotation.z = -0.22;
  group.add(rightBlade);

  const rightTip = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.032, 0.038), matCore);
  rightTip.position.set(0.20, 0.30, 0);
  rightTip.rotation.z = -0.44;
  group.add(rightTip);

  return group;
}

/**
 * Create detailed Hoe mesh.
 */
function createDetailedHoeMesh(toolType = BlockType.IRON_HOE) {
  const group = new THREE.Group();

  let headColor;
  if (toolType === BlockType.IRON_HOE) headColor = 0xe2e8f0;
  else if (toolType === BlockType.STONE_HOE) headColor = 0x64748b;
  else headColor = 0xb45309;

  const matHead = new THREE.MeshStandardMaterial({ color: headColor, roughness: 0.35, metalness: 0.75 });
  const matWood = new THREE.MeshLambertMaterial({ color: 0x78350f });

  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.54, 0.038), matWood);
  handle.position.set(0, 0.10, 0);
  group.add(handle);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.065, 0.05), matHead);
  head.position.set(0.08, 0.34, 0);
  group.add(head);

  const tip = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.12, 0.045), matHead);
  tip.position.set(0.16, 0.29, 0);
  group.add(tip);

  return group;
}

/**
 * Create Bow mesh.
 */
function createDetailedBowMesh() {
  const group = new THREE.Group();
  const woodMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
  const stringMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });

  const upperLim = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.28, 0.035), woodMat);
  upperLim.position.set(0.06, 0.14, 0);
  upperLim.rotation.z = -0.35;
  group.add(upperLim);

  const lowerLim = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.28, 0.035), woodMat);
  lowerLim.position.set(0.06, -0.14, 0);
  lowerLim.rotation.z = 0.35;
  group.add(lowerLim);

  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.12, 0.048), woodMat);
  grip.position.set(0.11, 0, 0);
  group.add(grip);

  const string = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.54, 0.012), stringMat);
  string.position.set(0, 0, 0);
  group.add(string);

  return group;
}

/**
 * Create 3D Shield Model (Wooden / Iron).
 */
function createShieldMesh(isIron = false) {
  const group = new THREE.Group();

  const rimMat = new THREE.MeshStandardMaterial({
    color: isIron ? 0x334155 : 0x451a03,
    roughness: 0.4,
    metalness: 0.8,
  });

  const bodyMat = new THREE.MeshStandardMaterial({
    color: isIron ? 0xe2e8f0 : 0xb45309,
    roughness: 0.35,
    metalness: isIron ? 0.85 : 0.2,
  });

  const bossMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.3,
    metalness: 0.9,
  });

  // Outer Rim (Curved Shield Shape)
  const rim = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.46, 0.04), rimMat);
  rim.position.set(0, 0.12, 0);
  group.add(rim);

  // Inner Body
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.42, 0.046), bodyMat);
  body.position.set(0, 0.12, 0.005);
  group.add(body);

  // Center Iron Boss Emblem
  const boss = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.06), bossMat);
  boss.position.set(0, 0.12, 0.015);
  group.add(boss);

  // Arm Grip Handle (Back)
  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 0.03), rimMat);
  grip.position.set(0, 0.12, -0.03);
  group.add(grip);

  return group;
}

/**
 * Create 3D Floating Arcane Book.
 */
function create3DBookMesh() {
  const group = new THREE.Group();
  const coverMat = new THREE.MeshLambertMaterial({ color: 0x831843 });
  const pageMat = new THREE.MeshLambertMaterial({ color: 0xfef08a });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.2, metalness: 0.8 });

  // Open pages left & right
  const leftPage = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.02, 0.20), pageMat);
  leftPage.position.set(-0.075, 0.02, 0);
  leftPage.rotation.z = -0.15;
  group.add(leftPage);

  const rightPage = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.02, 0.20), pageMat);
  rightPage.position.set(0.075, 0.02, 0);
  rightPage.rotation.z = 0.15;
  group.add(rightPage);

  // Leather cover
  const cover = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.015, 0.22), coverMat);
  cover.position.set(0, 0, 0);
  group.add(cover);

  // Golden corner clasps
  const clasp = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.025, 0.03), goldMat);
  clasp.position.set(0.12, 0.01, 0.09);
  group.add(clasp);

  return group;
}

/**
 * Create 3D Boat Model.
 */
function create3DBoatMesh() {
  const group = new THREE.Group();
  const woodMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
  const plankMat = new THREE.MeshLambertMaterial({ color: 0xb45309 });

  // Hull bottom
  const bottom = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.04, 0.54), plankMat);
  bottom.position.set(0, 0, 0);
  group.add(bottom);

  // Left wall
  const leftW = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.14, 0.54), woodMat);
  leftW.position.set(-0.20, 0.07, 0);
  group.add(leftW);

  // Right wall
  const rightW = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.14, 0.54), woodMat);
  rightW.position.set(0.20, 0.07, 0);
  group.add(rightW);

  // Bow & Stern
  const bow = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.14, 0.04), woodMat);
  bow.position.set(0, 0.07, -0.27);
  group.add(bow);

  const stern = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.14, 0.04), woodMat);
  stern.position.set(0, 0.07, 0.27);
  group.add(stern);

  return group;
}

/**
 * Create Flint and Steel 3D model.
 */
function createFlintAndSteelMesh() {
  const group = new THREE.Group();
  const steelMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3, metalness: 0.85 });
  const flintMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7, metalness: 0.2 });

  // Curved steel handle
  const steel = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, 0.04), steelMat);
  steel.position.set(-0.04, 0.05, 0);
  group.add(steel);

  // Black flint chunk
  const flint = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.12, 0.045), flintMat);
  flint.position.set(0.05, 0.02, 0);
  group.add(flint);

  return group;
}

/**
 * Bucket in hand: a tapered iron pail, optionally filled with a fluid.
 * `fillColor === 0` yields the empty bucket.
 */
function createBucketMesh(fillColor = 0) {
  const group = new THREE.Group();

  const ironMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.42, metalness: 0.65 });
  const ironDarkMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.5, metalness: 0.6 });

  // Tapered body: a wider top ring faked with a slightly larger rim box.
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.055, 0.16, 10, 1, true), ironMat);
  body.material.side = THREE.DoubleSide;
  body.position.y = -0.03;
  group.add(body);

  const bottom = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.012, 10), ironDarkMat);
  bottom.position.y = -0.11;
  group.add(bottom);

  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.076, 0.011, 6, 12), ironMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.05;
  group.add(rim);

  // Wire handle
  const handleMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.4, metalness: 0.7 });
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.007, 5, 12, Math.PI), handleMat);
  handle.rotation.y = Math.PI / 2;
  handle.position.y = 0.05;
  group.add(handle);

  if (fillColor !== 0) {
    const fluidMat = new THREE.MeshStandardMaterial({
      color: fillColor,
      emissive: fillColor,
      emissiveIntensity: 0.35,
      roughness: 0.25,
      transparent: true,
      opacity: 0.9,
    });
    const fluid = new THREE.Mesh(new THREE.CylinderGeometry(0.070, 0.070, 0.01, 10), fluidMat);
    fluid.position.y = 0.02;
    group.add(fluid);
  }

  return group;
}

/**
 * Get a 3D preview mesh for any item or block.
 * @param {number} itemType
 * @param {number} size
 * @returns {THREE.Object3D|null}
 */
export function getBlockPreviewMesh(itemType, size = 0.22) {
  // Swords
  if (
    itemType === BlockType.DIAMOND_SWORD ||
    itemType === BlockType.IRON_SWORD ||
    itemType === BlockType.STONE_SWORD ||
    itemType === BlockType.WOODEN_SWORD
  ) {
    return createDetailedSwordMesh(itemType);
  }

  // Pickaxes
  if (
    itemType === BlockType.DIAMOND_PICKAXE ||
    itemType === BlockType.IRON_PICKAXE ||
    itemType === BlockType.STONE_PICKAXE ||
    itemType === BlockType.WOODEN_PICKAXE
  ) {
    return createDetailedPickaxeMesh(itemType);
  }

  // Hoes
  if (
    itemType === BlockType.IRON_HOE ||
    itemType === BlockType.STONE_HOE ||
    itemType === BlockType.WOODEN_HOE
  ) {
    return createDetailedHoeMesh(itemType);
  }

  // Weapons & Tools
  if (itemType === BlockType.BOW) return createDetailedBowMesh();
  if (itemType === BlockType.FLINT_AND_STEEL) return createFlintAndSteelMesh();
  if (itemType === BlockType.WOODEN_SHIELD) return createShieldMesh(false);
  if (itemType === BlockType.IRON_SHIELD) return createShieldMesh(true);
  if (itemType === BlockType.BOOK) return create3DBookMesh();
  if (itemType === BlockType.BOAT) return create3DBoatMesh();
  if (itemType === BlockType.EMPTY_BUCKET) return createBucketMesh(0);
  if (itemType === BlockType.WATER) return createBucketMesh(0x38bdf8);
  if (itemType === BlockType.LAVA) return createBucketMesh(0xf97316);

  // Torches & Redstone Torch
  if (itemType === BlockType.TORCH || itemType === BlockType.REDSTONE_TORCH) {
    const isRed = itemType === BlockType.REDSTONE_TORCH;
    const group = new THREE.Group();
    const woodMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
    const flameMat = new THREE.MeshStandardMaterial({
      color: isRed ? 0xef4444 : 0xf97316,
      emissive: isRed ? 0xb91c1c : 0xfacc15,
      emissiveIntensity: 0.95,
    });

    const stick = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.32, 0.04), woodMat);
    stick.position.set(0, 0.10, 0);
    group.add(stick);

    const flame = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.09, 0.055), flameMat);
    flame.position.set(0, 0.27, 0);
    group.add(flame);

    return group;
  }

  // Lever in hand
  if (itemType === BlockType.LEVER) {
    const group = new THREE.Group();
    const cobbleMat = new THREE.MeshLambertMaterial({ color: 0x64748b });
    const stickMat = new THREE.MeshLambertMaterial({ color: 0x78350f });

    const base = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 0.16), cobbleMat);
    group.add(base);

    const stick = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.22, 0.03), stickMat);
    stick.position.set(0, 0.10, 0);
    stick.rotation.z = -0.35;
    group.add(stick);

    return group;
  }

  // Pressure Plate in hand
  if (itemType === BlockType.PRESSURE_PLATE) {
    const mat = new THREE.MeshLambertMaterial({ color: 0x64748b });
    return new THREE.Mesh(new THREE.BoxGeometry(size * 0.9, size * 0.15, size * 0.9), mat);
  }

  // Enchanting Table in 3D preview
  if (itemType === BlockType.ENCHANTING_TABLE) {
    const group = new THREE.Group();
    const obsMat = new THREE.MeshLambertMaterial({ color: 0x1e1b4b });
    const book = create3DBookMesh();

    const base = new THREE.Mesh(new THREE.BoxGeometry(size, size * 0.75, size), obsMat);
    base.position.set(0, size * 0.375, 0);
    group.add(base);

    book.position.set(0, size * 0.82, 0);
    book.scale.set(0.65, 0.65, 0.65);
    group.add(book);

    return group;
  }

  // Golden Apple
  if (itemType === BlockType.GOLDEN_APPLE) {
    const mat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0x854d0e,
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.7,
    });
    return new THREE.Mesh(new THREE.SphereGeometry(size * 0.42, 8, 8), mat);
  }

  if (itemType === BlockType.BREAD) {
    const mat = new THREE.MeshLambertMaterial({ color: 0xb45309 });
    return new THREE.Mesh(new THREE.BoxGeometry(size * 0.9, size * 0.45, size * 0.6), mat);
  }

  if (itemType === BlockType.WHEAT) {
    const mat = new THREE.MeshLambertMaterial({ color: 0xeab308 });
    return new THREE.Mesh(new THREE.BoxGeometry(size * 0.35, size * 0.9, size * 0.35), mat);
  }

  if (itemType === BlockType.PORKCHOP || itemType === BlockType.MUTTON) {
    const mat = new THREE.MeshLambertMaterial({ color: 0xf472b6 });
    return new THREE.Mesh(new THREE.BoxGeometry(size, size * 0.4, size * 0.8), mat);
  }

  if (itemType === BlockType.COOKED_PORKCHOP || itemType === BlockType.COOKED_MUTTON) {
    const mat = new THREE.MeshLambertMaterial({ color: 0x9a3412 });
    return new THREE.Mesh(new THREE.BoxGeometry(size, size * 0.4, size * 0.8), mat);
  }

  if (itemType === BlockType.ROTTEN_FLESH) {
    const mat = new THREE.MeshLambertMaterial({ color: 0x84cc16 });
    return new THREE.Mesh(new THREE.BoxGeometry(size, size * 0.4, size * 0.8), mat);
  }

  if (itemType === BlockType.DIAMOND) {
    const mat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x083344,
      emissiveIntensity: 0.4,
      roughness: 0.15,
      metalness: 0.7,
    });
    return new THREE.Mesh(new THREE.OctahedronGeometry(size * 0.5), mat);
  }

  if (itemType === BlockType.IRON_INGOT) {
    const mat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3, metalness: 0.85 });
    return new THREE.Mesh(new THREE.BoxGeometry(size * 0.8, size * 0.3, size * 0.5), mat);
  }

  if (itemType === BlockType.FLINT) {
    const mat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6, metalness: 0.3 });
    return new THREE.Mesh(new THREE.BoxGeometry(size * 0.6, size * 0.6, size * 0.3), mat);
  }

  if (itemType === BlockType.QUARTZ) {
    const mat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2, metalness: 0.4 });
    return new THREE.Mesh(new THREE.OctahedronGeometry(size * 0.45), mat);
  }

  const key = `${itemType}:${size}`;
  if (meshCache.has(key)) return meshCache.get(key);

  const textures = BlockTextures[itemType];
  if (!textures) return null;

  const geometry = new THREE.BoxGeometry(size, size, size);
  const uv = geometry.attributes.uv.array;

  const texPerFace = [
    textures.side,
    textures.side,
    textures.top,
    textures.bottom,
    textures.side,
    textures.side,
  ];

  for (let face = 0; face < 6; face++) {
    const texIdx = texPerFace[face];
    const atlasUV = getUVsForTexture(texIdx);

    const base = face * 8;
    uv[base + 0] = atlasUV.uMin; uv[base + 1] = atlasUV.vMax;
    uv[base + 2] = atlasUV.uMax; uv[base + 3] = atlasUV.vMax;
    uv[base + 4] = atlasUV.uMin; uv[base + 5] = atlasUV.vMin;
    uv[base + 6] = atlasUV.uMax; uv[base + 7] = atlasUV.vMin;
  }

  geometry.attributes.uv.needsUpdate = true;

  const material = new THREE.MeshLambertMaterial({
    map: getAtlasTexture(),
    transparent: true,
    alphaTest: 0.2,
  });

  const mesh = new THREE.Mesh(geometry, material);
  meshCache.set(key, mesh);
  return mesh;
}
