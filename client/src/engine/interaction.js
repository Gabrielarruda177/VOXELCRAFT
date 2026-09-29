import * as THREE from 'three';
import { raycastVoxel } from './raycast.js';
import { setBlockAtWorld, getBlockAtWorld, switchDimension, Dimension, getCurrentDimension } from '../world/worldManager.js';
import { isPointerLocked, getCamera } from './camera.js';
import {
  playBlockBreakSound,
  playBlockPlaceSound,
  playSwordSwingSound,
  playBlockHitTickSound,
  playCraftSound,
  playHoeSound,
  playSleepSound,
  playFlintAndSteelSound,
  playCriticalHitSound,
  playPortalTravelSound,
  playSplashSound,
} from './soundFx.js';
import { isNighttime, skipToDawn } from '../world/dayNightCycle.js';
import {
  spawnBlockBreakParticles,
  spawnCriticalHitParticles,
  spawnPortalParticles,
  spawnTorchFlameParticles,
} from '../rendering/particles.js';
import { raycastMob, hitMob, spawnPlayerArrow, igniteTNT } from '../entities/mobManager.js';
import {
  BlockType,
  isPlaceableBlock,
  getBlockHardness,
  getMiningSpeed,
  getBlockDrop,
  isFood,
  isHoe,
  isDoor,
  isShield,
  isFluid,
  isBucket,
  isFilledBucket,
  getFluidByBucket,
  getFluidHeight,
  FLUID_SOURCE_LEVEL,
  getFoodNutrition,
} from '../world/blockTypes.js';
import { toggleLever, toggleDoor, recalculateRedstoneGrid } from './redstoneEngine.js';
import { spawnFluidSource, spawnSplashAt } from './fluidEngine.js';
import { spawnDrop } from '../entities/dropManager.js';
import { openCraftingTable } from '../ui/crafting.js';
import { openFurnace } from '../ui/furnace.js';
import { openChest, getChestItems, clearChest } from '../ui/chest.js';
import { openEnchantingTable } from '../ui/enchantingModal.js';
import { isAnyWindowOpen } from '../ui/uiManager.js';
import { healPlayer, getPlayerPosition, getPlayerState } from '../entities/player.js';
import { removeItemFromHotbar, hasItemInInventory, consumeItemFromInventory, addItemToInventory } from '../ui/inventory.js';
import { getUVsForTexture, getAtlasTexture } from '../rendering/textures/textureAtlas.js';

let scene = null;
let highlightMesh = null;
let crackMesh = null;
let currentTarget = null;
let selectedBlockType = BlockType.WOODEN_SWORD;

// Progressive Breaking State
let isLeftMouseDown = false;
let isBreakingBlock = false;
let breakProgress = 0.0; // 0.0 to 1.0
let breakingBlockPos = { x: NaN, y: NaN, z: NaN };
let hitTickTimer = 0.0;

// Active Crops in world for growth simulation
const activeCrops = new Map(); // key 'x,y,z' -> { x, y, z, stage: 1, timer: 0 }

// Highlight selection box
const highlightGeo = new THREE.BoxGeometry(1.002, 1.002, 1.002);
const highlightEdges = new THREE.EdgesGeometry(highlightGeo);
const highlightMat = new THREE.LineBasicMaterial({
  color: 0x000000,
  linewidth: 2,
  transparent: true,
  opacity: 0.65,
});

// Cracking overlay box with atlas UV mapping
const crackGeo = new THREE.BoxGeometry(1.004, 1.004, 1.004);
let crackMat = null;

function getCrackMaterial() {
  if (!crackMat) {
    crackMat = new THREE.MeshBasicMaterial({
      map: getAtlasTexture(),
      transparent: true,
      depthTest: true,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
  }
  return crackMat;
}

function updateCrackUVs(stageIndex) {
  // Texture indices 63 to 68 correspond to destroy_stage_0 to destroy_stage_5
  const texIdx = 63 + Math.max(0, Math.min(5, stageIndex));
  const uvInfo = getUVsForTexture(texIdx);
  const uvs = crackGeo.attributes.uv.array;

  for (let face = 0; face < 6; face++) {
    const base = face * 8;
    uvs[base + 0] = uvInfo.uMin; uvs[base + 1] = uvInfo.vMax;
    uvs[base + 2] = uvInfo.uMax; uvs[base + 3] = uvInfo.vMax;
    uvs[base + 4] = uvInfo.uMin; uvs[base + 5] = uvInfo.vMin;
    uvs[base + 6] = uvInfo.uMax; uvs[base + 7] = uvInfo.vMin;
  }
  crackGeo.attributes.uv.needsUpdate = true;
}

export function initInteraction(s) {
  scene = s;

  highlightMesh = new THREE.LineSegments(highlightEdges, highlightMat);
  highlightMesh.visible = false;
  scene.add(highlightMesh);

  crackMesh = new THREE.Mesh(crackGeo, getCrackMaterial());
  crackMesh.visible = false;
  scene.add(crackMesh);

  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('blur', () => {
    isLeftMouseDown = false;
    isBreakingBlock = false;
    breakProgress = 0.0;
    if (crackMesh) crackMesh.visible = false;
  });
}

export function isMiningActive() {
  return isLeftMouseDown && isBreakingBlock;
}

export function updateInteraction(dt = 0.016) {
  // Update planted crop growth over time
  updateCrops(dt);

  if (!isPointerLocked() || isAnyWindowOpen()) {
    highlightMesh.visible = false;
    crackMesh.visible = false;
    currentTarget = null;
    isBreakingBlock = false;
    isLeftMouseDown = false;
    breakProgress = 0.0;
    return;
  }

  const cam = getCamera();
  if (!cam) return;

  const dir = new THREE.Vector3(0, 0, -1);
  dir.applyQuaternion(cam.quaternion);

  // Fluids are non-solid, so they are reported separately from the solid hit:
  // the highlight and mining still use the solid block behind them.
  const result = raycastVoxel(cam.position, dir, { includeFluids: true });
  if (result) {
    currentTarget = result;
    highlightMesh.position.set(result.hit.x + 0.5, result.hit.y + 0.5, result.hit.z + 0.5);
    highlightMesh.visible = true;

    // Check if target changed during holding click
    if (
      result.hit.x !== breakingBlockPos.x ||
      result.hit.y !== breakingBlockPos.y ||
      result.hit.z !== breakingBlockPos.z
    ) {
      breakingBlockPos = { x: result.hit.x, y: result.hit.y, z: result.hit.z };
      breakProgress = 0.0;
    }

    // ── Progressive Mining Process ─────────────────────────
    if (isLeftMouseDown && isBreakingBlock) {
      const blockType = getBlockAtWorld(result.hit.x, result.hit.y, result.hit.z);

      if (blockType !== BlockType.AIR && !isFluid(blockType)) {
        const hardness = getBlockHardness(blockType);
        const speed = getMiningSpeed(blockType, selectedBlockType);

        breakProgress += (dt * speed) / hardness;

        // Mining impact ticks & dust particles
        hitTickTimer += dt;
        if (hitTickTimer >= 0.20) {
          hitTickTimer = 0;
          playBlockHitTickSound(blockType);
          spawnBlockBreakParticles(result.hit.x, result.hit.y, result.hit.z, blockType);
        }

        // Cracking overlay visual with 6 discrete stages (0 to 5)
        const stage = Math.min(5, Math.floor(breakProgress * 6));
        updateCrackUVs(stage);

        crackMesh.position.set(result.hit.x + 0.5, result.hit.y + 0.5, result.hit.z + 0.5);
        crackMesh.visible = true;

        // Block Break Completed!
        if (breakProgress >= 1.0) {
          playBlockBreakSound(blockType);
          spawnBlockBreakParticles(result.hit.x, result.hit.y, result.hit.z, blockType);

          // If broke a Chest: spill all contained items
          if (blockType === BlockType.CHEST) {
            const chestItems = getChestItems(result.hit.x, result.hit.y, result.hit.z);
            chestItems.forEach(ci => {
              spawnDrop(result.hit.x + 0.5, result.hit.y + 0.5, result.hit.z + 0.5, ci);
            });
            clearChest(result.hit.x, result.hit.y, result.hit.z);
          }

          // Special drops: Grass can drop Wheat Seeds
          if (blockType === BlockType.GRASS && Math.random() < 0.35) {
            spawnDrop(result.hit.x + 0.5, result.hit.y + 0.5, result.hit.z + 0.5, BlockType.WHEAT_SEEDS);
          }

          // Special drops: Wheat Stage 3 drops Wheat + Seeds
          if (blockType === BlockType.WHEAT_STAGE_3) {
            spawnDrop(result.hit.x + 0.5, result.hit.y + 0.5, result.hit.z + 0.5, BlockType.WHEAT);
            spawnDrop(result.hit.x + 0.5, result.hit.y + 0.5, result.hit.z + 0.5, BlockType.WHEAT_SEEDS);
            activeCrops.delete(`${result.hit.x},${result.hit.y},${result.hit.z}`);
          } else {
            const dropItem = getBlockDrop(blockType);
            if (dropItem > 0) {
              spawnDrop(result.hit.x + 0.5, result.hit.y + 0.5, result.hit.z + 0.5, dropItem);
            }
          }

          setBlockAtWorld(scene, result.hit.x, result.hit.y, result.hit.z, BlockType.AIR);

          breakProgress = 0.0;
          isBreakingBlock = false;
          crackMesh.visible = false;
        }
      } else {
        breakProgress = 0.0;
        crackMesh.visible = false;
      }
    } else {
      breakProgress = 0.0;
      crackMesh.visible = false;
    }
  } else {
    currentTarget = null;
    highlightMesh.visible = false;
    crackMesh.visible = false;
    breakProgress = 0.0;
    isBreakingBlock = false;
  }
}

function updateCrops(dt) {
  for (const [key, crop] of activeCrops.entries()) {
    crop.timer += dt;
    // Stage growth every 16 seconds
    if (crop.timer >= 16.0) {
      crop.timer = 0;
      if (crop.stage === 1) {
        crop.stage = 2;
        setBlockAtWorld(scene, crop.x, crop.y, crop.z, BlockType.WHEAT_STAGE_2);
      } else if (crop.stage === 2) {
        crop.stage = 3;
        setBlockAtWorld(scene, crop.x, crop.y, crop.z, BlockType.WHEAT_STAGE_3);
      }
    }
  }
}

export function getCurrentTarget() {
  return currentTarget;
}

function onMouseDown(e) {
  if (!isPointerLocked() || isAnyWindowOpen()) return;

  const cam = getCamera();
  if (!cam) return;

  const dir = new THREE.Vector3(0, 0, -1);
  dir.applyQuaternion(cam.quaternion);

  if (e.button === 0) {
    isLeftMouseDown = true;

    // ── Attack Mob with Critical Hit System ────────────────
    const targetMob = raycastMob(cam.position, dir, 3.8);
    if (targetMob) {
      const isDiamondSword = selectedBlockType === BlockType.DIAMOND_SWORD;
      const isIronSword = selectedBlockType === BlockType.IRON_SWORD;
      const isStoneSword = selectedBlockType === BlockType.STONE_SWORD;
      const isWoodSword = selectedBlockType === BlockType.WOODEN_SWORD;
      const isPick =
        selectedBlockType === BlockType.DIAMOND_PICKAXE ||
        selectedBlockType === BlockType.IRON_PICKAXE ||
        selectedBlockType === BlockType.STONE_PICKAXE ||
        selectedBlockType === BlockType.WOODEN_PICKAXE;

      let damageAmount = isDiamondSword ? 9 : isIronSword ? 7 : isStoneSword ? 5 : isWoodSword ? 4 : isPick ? 3 : 2;

      const state = getPlayerState();
      const isCritical = state && !state.onGround && !state.isFlying;

      if (isCritical) {
        damageAmount = Math.floor(damageAmount * 1.5);
        playCriticalHitSound();
        spawnCriticalHitParticles(targetMob.x, targetMob.y + 0.8, targetMob.z);
      } else {
        playSwordSwingSound();
      }

      hitMob(targetMob, damageAmount, dir);
      return;
    }

    // Left click on TNT immediately ignites it!
    if (currentTarget) {
      const targetBlock = getBlockAtWorld(currentTarget.hit.x, currentTarget.hit.y, currentTarget.hit.z);
      if (targetBlock === BlockType.TNT) {
        igniteTNT(currentTarget.hit.x, currentTarget.hit.y, currentTarget.hit.z);
        return;
      }

      // Start Mining Block
      isBreakingBlock = true;
      breakingBlockPos = { x: currentTarget.hit.x, y: currentTarget.hit.y, z: currentTarget.hit.z };
    }
  } else if (e.button === 2) {
    // ── Right Click: Flint & Steel / Bow / Food / Hoe / Seeds / Bed / Containers / Place Block ───
    e.preventDefault();

    // 1. Flint and Steel Ignition
    if (selectedBlockType === BlockType.FLINT_AND_STEEL) {
      playFlintAndSteelSound();
      if (currentTarget) {
        const hitBlock = getBlockAtWorld(currentTarget.hit.x, currentTarget.hit.y, currentTarget.hit.z);
        const { prev } = currentTarget;
        if (hitBlock === BlockType.OBSIDIAN || hitBlock === BlockType.NETHERRACK) {
          setBlockAtWorld(scene, prev.x, prev.y, prev.z, BlockType.NETHER_PORTAL);
          spawnPortalParticles(prev.x + 0.5, prev.y + 0.5, prev.z + 0.5);
          return;
        }
      }
    }

    // 2. Shoot Bow & Arrow
    if (selectedBlockType === BlockType.BOW) {
      if (hasItemInInventory(BlockType.ARROW)) {
        consumeItemFromInventory(BlockType.ARROW);
        spawnPlayerArrow(cam.position, dir);
        return;
      }
    }

    // 3. Eat food if holding food
    if (isFood(selectedBlockType)) {
      const nutrition = getFoodNutrition(selectedBlockType);
      if (nutrition > 0) {
        healPlayer(nutrition);
        playCraftSound();
        consumeItemFromInventory(selectedBlockType);
        return;
      }
    }

    if (currentTarget) {
      const hitBlock = getBlockAtWorld(currentTarget.hit.x, currentTarget.hit.y, currentTarget.hit.z);

      // 4. Bed: Sleep through the night to dawn
      if (hitBlock === BlockType.BED) {
        if (isNighttime()) {
          playSleepSound();
          skipToDawn();
          healPlayer(4); // Restores 2 hearts on a good night's rest
          return;
        } else {
          // Daytime sleep attempt
          playCraftSound();
          return;
        }
      }

      // 5. Hoe Tilling: Transforms Grass/Dirt into Farmland
      if (isHoe(selectedBlockType) && (hitBlock === BlockType.GRASS || hitBlock === BlockType.DIRT)) {
        playHoeSound();
        setBlockAtWorld(scene, currentTarget.hit.x, currentTarget.hit.y, currentTarget.hit.z, BlockType.FARMLAND);
        return;
      }

      // 6. Plant Wheat Seeds on Farmland
      if (selectedBlockType === BlockType.WHEAT_SEEDS && hitBlock === BlockType.FARMLAND) {
        const cropY = currentTarget.hit.y + 1;
        if (cropY < 64 && getBlockAtWorld(currentTarget.hit.x, cropY, currentTarget.hit.z) === BlockType.AIR) {
          playBlockPlaceSound();
          setBlockAtWorld(scene, currentTarget.hit.x, cropY, currentTarget.hit.z, BlockType.WHEAT_STAGE_1);
          activeCrops.set(`${currentTarget.hit.x},${cropY},${currentTarget.hit.z}`, {
            x: currentTarget.hit.x,
            y: cropY,
            z: currentTarget.hit.z,
            stage: 1,
            timer: 0,
          });
          consumeItemFromInventory(BlockType.WHEAT_SEEDS);
          return;
        }
      }

      // 7. Toggle Lever (Redstone Switch)
      if (hitBlock === BlockType.LEVER) {
        toggleLever(currentTarget.hit.x, currentTarget.hit.y, currentTarget.hit.z);
        playBlockHitTickSound(BlockType.STONE);
        return;
      }

      // 8. Toggle Door (Open / Close)
      if (isDoor(hitBlock)) {
        toggleDoor(currentTarget.hit.x, currentTarget.hit.y, currentTarget.hit.z);
        return;
      }

      // 9. Open Enchanting Table GUI
      if (hitBlock === BlockType.ENCHANTING_TABLE) {
        openEnchantingTable();
        return;
      }

      // 10. Open Crafting Table 3×3 GUI
      if (hitBlock === BlockType.CRAFTING_TABLE) {
        openCraftingTable();
        return;
      }

      // 11. Open Furnace GUI
      if (hitBlock === BlockType.FURNACE || hitBlock === BlockType.FURNACE_LIT) {
        openFurnace(currentTarget.hit.x, currentTarget.hit.y, currentTarget.hit.z);
        return;
      }

      // 12. Open Chest GUI
      if (hitBlock === BlockType.CHEST) {
        openChest(currentTarget.hit.x, currentTarget.hit.y, currentTarget.hit.z);
        return;
      }

      // 13. Place Redstone Dust as Wire
      if (selectedBlockType === BlockType.REDSTONE_DUST) {
        const { prev } = currentTarget;
        if (prev.y >= 0 && prev.y < 64 && getBlockAtWorld(prev.x, prev.y, prev.z) === BlockType.AIR) {
          playBlockPlaceSound();
          setBlockAtWorld(scene, prev.x, prev.y, prev.z, BlockType.REDSTONE_WIRE);
          consumeItemFromInventory(BlockType.REDSTONE_DUST, 1);
          recalculateRedstoneGrid();
          return;
        }
      }

      // 13. Buckets: scoop a fluid with an empty bucket
      if (selectedBlockType === BlockType.EMPTY_BUCKET && currentTarget.fluidHit) {
        const { x, y, z, type } = currentTarget.fluidHit;
        setBlockAtWorld(scene, x, y, z, BlockType.AIR);
        consumeItemFromInventory(BlockType.EMPTY_BUCKET, 1);
        giveOrDropItem(type);
        playSplashSound();
        return;
      }

      // 14. Place Block
      if (isPlaceableBlock(selectedBlockType)) {
        const { prev } = currentTarget;
        if (prev.y >= 0 && prev.y < 64) {
          // Buckets pour a live source: it flows, wakes neighbours and reacts.
          if (isFilledBucket(selectedBlockType)) {
            if (spawnFluidSource(prev.x, prev.y, prev.z, selectedBlockType)) {
              consumeItemFromInventory(selectedBlockType, 1);
              spawnSplashAt(prev.x + 0.5, prev.y + getFluidHeight(FLUID_SOURCE_LEVEL), prev.z + 0.5);
            }
            return;
          }

          const existing = getBlockAtWorld(prev.x, prev.y, prev.z);
          if (existing === BlockType.AIR) {
            playBlockPlaceSound();
            setBlockAtWorld(scene, prev.x, prev.y, prev.z, selectedBlockType);
            consumeItemFromInventory(selectedBlockType, 1);

            if (selectedBlockType === BlockType.REDSTONE_TORCH || selectedBlockType === BlockType.LEVER || selectedBlockType === BlockType.PRESSURE_PLATE) {
              recalculateRedstoneGrid();
            }
          }
        }
      }
    }
  }
}

function onMouseUp(e) {
  if (e.button === 0) {
    isLeftMouseDown = false;
    isBreakingBlock = false;
    breakProgress = 0.0;
    if (crackMesh) crackMesh.visible = false;
  }
}

export function setSelectedBlockType(type) {
  selectedBlockType = type;
}

export function getSelectedBlockType() {
  return selectedBlockType;
}

/**
 * Best-effort reward: put the item in the inventory, or drop it at the player's
 * feet when every slot is taken (bucket pickups must never destroy loot).
 */
function giveOrDropItem(itemType, count = 1) {
  if (addItemToInventory(itemType, count)) return;

  const p = getPlayerPosition();
  spawnDrop(p.x, p.y + 0.8, p.z, itemType);
}
