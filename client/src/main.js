/**
 * VoxelCraft — Main Entry Point
 *
 * Initializes all subsystems: texture atlas → renderer → scene → camera → world → mobs → inventory → game loop.
 */

import { init as initInput } from './engine/input.js';
import { createCamera, initPointerLock, getCamera } from './engine/camera.js';
import { start as startLoop } from './engine/loop.js';
import { createRenderer, createScene, render, getCanvas, setupCameraResize, getLights } from './rendering/sceneSetup.js';
import { buildAtlas } from './rendering/textures/textureAtlas.js';
import { generateWorld, updateWorld, getSpawnPosition, getCurrentDimension, getHeight } from './world/worldManager.js';
import { update as updateHud } from './ui/hud.js';
import { initHotbar, updateHotbar } from './ui/hotbar.js';
import { initInventory } from './ui/inventory.js';
import { initInteraction, updateInteraction, getSelectedBlockType } from './engine/interaction.js';
import { initPlayer, updatePlayer, getPlayerPosition } from './entities/player.js';
import { initPlayerModel } from './entities/playerModel.js';
import { initDynamicLighting, updateDynamicLighting } from './rendering/dynamicLighting.js';
import { initRedstone, updateRedstoneEngine } from './engine/redstoneEngine.js';
import { initEnchantingTableModal } from './ui/enchantingModal.js';
import { initMobManager, updateMobs, spawnMob, MobType } from './entities/mobManager.js';
import { initHealthHud, updateHealthHud } from './ui/health.js';
import { initHand, updateHand } from './entities/hand.js';
import { initParticles, updateParticles } from './rendering/particles.js';
import { initDayNightCycle, updateDayNightCycle } from './world/dayNightCycle.js';
import { initTitleScreen } from './ui/titleScreen.js';
import { isTitleScreenActive, isGamePaused } from './ui/uiManager.js';
import { initDropManager, updateDrops } from './entities/dropManager.js';
import { initCraftingTable } from './ui/crafting.js';
import { updateFurnaces } from './ui/furnace.js';
import { initWeather, updateWeather } from './world/weather.js';
import { initFluidEngine, updateFluidEngine, resetFluidEngine } from './engine/fluidEngine.js';
import { updateFluidShaderTime } from './world/chunk.js';
import { saveWorld, loadWorld } from './engine/saveManager.js';
import { updateAmbientMusic, updateCavernAmbience } from './engine/soundFx.js';

// ── Bootstrap ──────────────────────────────────────────────

// Desativar menu de contexto nativo do botão direito do navegador
window.addEventListener('contextmenu', (e) => e.preventDefault());

// 1. Input
initInput(document);

// 2. Build texture atlas BEFORE creating any chunks
console.log('[VoxelCraft] Building texture atlas...');
buildAtlas();

// 3. Renderer + Scene
const renderer = createRenderer();
const scene = createScene();

// 4. Day & Night Celestial Cycle & Atmosphere
initDayNightCycle(scene, getLights());

// 5. Weather & Rain
initWeather(scene);

// 6. Particles & Drops
initParticles(scene);
initDropManager(scene);

// 6b. Fluid simulation (Água & Lava com física de fluxo contínuo)
initFluidEngine(scene);

// 7. World (generates initial biomes and 3D caves)
console.log('[VoxelCraft] Generating world biomes & 3D caves...');
generateWorld(scene);

// 8. Camera — spawn above terrain center
const spawn = getSpawnPosition();
const camera = createCamera(window.innerWidth / window.innerHeight, spawn);
scene.add(camera);
setupCameraResize(camera);
initPointerLock(getCanvas());

// 9. Title Screen & Central UI Manager
initTitleScreen(getCanvas());

// 10. Mobs (Animais pacíficos no spawn inicial da manhã: Porco e Ovelha)
initMobManager(scene);
spawnMob(MobType.PIG, spawn.x + 4, spawn.y, spawn.z + 4);
spawnMob(MobType.SHEEP, spawn.x - 3, spawn.y, spawn.z + 5);

// 11. Block interaction & Combat
initInteraction(scene);

// 12. Inventory, Crafting Table & Hotbar UI
initInventory();
initCraftingTable();
initHotbar();

// 13. Player 3D Character Model, Dynamic Lighting, Redstone, physics + health
initDynamicLighting(scene);
initRedstone(scene);
initEnchantingTableModal();
initPlayerModel(scene);
initPlayer();
initHealthHud();

// 14. First-person hand & weapons (attached to camera)
initHand();

// Load saved data if available
loadWorld();

console.log(`[VoxelCraft v0.6.0] Ready! Spawn at (${spawn.x}, ${spawn.y}, ${spawn.z})`);

// ── Game Loop ──────────────────────────────────────────────

let autoSaveTimer = 0;
let lastDimension = getCurrentDimension();
let elapsedTime = 0;

function update(dt, time) {
  elapsedTime = time;

  if (isTitleScreenActive()) {
    updateWorld(camera.position, scene);
    updateDayNightCycle(dt, scene, camera, renderer);
    updateFluidShaderTime(elapsedTime);
    return;
  }

  if (isGamePaused()) {
    return;
  }

  // Dimension change invalidates every pending fluid tick.
  const dim = getCurrentDimension();
  if (dim !== lastDimension) {
    lastDimension = dim;
    resetFluidEngine();
  }

  // Active Gameplay Update
  updatePlayer(dt);
  updateWorld(camera.position, scene);
  updateDayNightCycle(dt, scene, camera, renderer);
  updateWeather(dt, getPlayerPosition());
  updateFluidEngine(dt, getPlayerPosition());
  updateDynamicLighting(dt, time, getPlayerPosition(), getSelectedBlockType(), camera.position);
  updateRedstoneEngine(dt);
  updateFurnaces(dt);
  updateMobs(dt);
  updateDrops(dt, time);
  updateParticles(dt);
  updateInteraction(dt);
  updateHotbar();
  updateHealthHud();
  updateHand(dt, time);
  updateAmbientMusic(dt);
  updateCavernAmbience(dt, getPlayerPosition(), getHeight(Math.floor(camera.position.x), Math.floor(camera.position.z)));
  updateHud(dt, { position: camera.position });
  updateFluidShaderTime(elapsedTime);

  // Auto-save every 30s
  autoSaveTimer += dt;
  if (autoSaveTimer >= 30.0) {
    autoSaveTimer = 0;
    saveWorld();
  }
}

function renderFrame() {
  render(camera);
}

startLoop(update, renderFrame);
