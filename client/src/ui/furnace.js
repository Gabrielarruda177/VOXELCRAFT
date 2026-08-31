/**
 * Furnace System — Industrial Furnace Interface & Smelting Mechanism.
 * Smelts raw iron ore into iron ingots and cooks raw meat into roasted food using coal or wood fuel.
 * Full 64-item stack management and cursor drag-and-drop / split placement.
 */

import { BlockType, ITEM_NAMES } from '../world/blockTypes.js';
import { createBlockIconCanvas } from './blockIcon.js';
import { playCraftSound, playInventorySound } from '../engine/soundFx.js';
import { addItemToInventory, getHotbarSlots, slots as inventorySlots, syncSelectedHotbar } from './inventory.js';
import { openWindow, closeWindow, UIWindow, isWindowOpen } from './uiManager.js';
import {
  cursorItem,
  getMaxStack,
  setCursorItem,
  clearCursorItem,
  handleSlotClick,
  updateCursorVisual,
} from './cursorManager.js';
import { bindSlotTooltip } from './tooltip.js';

// Recipes: Input BlockType -> Output BlockType
const SMELT_RECIPES = {
  [BlockType.IRON_ORE]:    { output: BlockType.IRON_INGOT,      time: 3.5 },
  [BlockType.PORKCHOP]:    { output: BlockType.COOKED_PORKCHOP, time: 2.5 },
  [BlockType.MUTTON]:      { output: BlockType.COOKED_MUTTON,   time: 2.5 },
  [BlockType.COBBLESTONE]: { output: BlockType.STONE,           time: 3.0 },
};

// Fuels: Item Type -> Burn Duration in seconds
const FUEL_DURATIONS = {
  [BlockType.LAVA]:        60.0,
  [BlockType.COAL_ORE]:    16.0,
  [BlockType.WOOD_LOG]:     6.0,
  [BlockType.WOOD_PLANKS]:  3.0,
  [BlockType.STICK]:        1.5,
};

// World Furnaces State: key 'x,y,z' -> state object
const worldFurnaces = new Map();

let activeFurnaceKey = null;
let furnaceModal = null;

function getOrCreateFurnaceState(x, y, z) {
  const key = `${x},${y},${z}`;
  if (!worldFurnaces.has(key)) {
    worldFurnaces.set(key, {
      x, y, z,
      inputItem: 0,
      inputCount: 0,
      fuelItem: 0,
      fuelCount: 0,
      outputItem: 0,
      outputCount: 0,
      burnTimeRemaining: 0,
      maxBurnTime: 0,
      cookProgress: 0,
    });
  }
  return worldFurnaces.get(key);
}

export function openFurnace(x, y, z) {
  activeFurnaceKey = `${x},${y},${z}`;
  getOrCreateFurnaceState(x, y, z);

  if (!furnaceModal) {
    initFurnaceUI();
  }

  furnaceModal.style.display = 'flex';
  openWindow(UIWindow.FURNACE);
  playInventorySound(true);
  renderFurnaceSlots();
}

export function closeFurnace() {
  if (!furnaceModal) return;
  furnaceModal.style.display = 'none';
  activeFurnaceKey = null;
  closeWindow(UIWindow.FURNACE);
  playInventorySound(false);

  // Return floating cursor item to inventory
  if (cursorItem.type > 0 && cursorItem.count > 0) {
    addItemToInventory(cursorItem.type, cursorItem.count);
    clearCursorItem();
  }
}

export function isFurnaceOpen() {
  return isWindowOpen(UIWindow.FURNACE);
}

export function updateFurnaces(dt) {
  for (const [key, f] of worldFurnaces.entries()) {
    const hasInput = f.inputItem > 0 && SMELT_RECIPES[f.inputItem];
    const recipe = hasInput ? SMELT_RECIPES[f.inputItem] : null;

    // Burn fuel countdown
    if (f.burnTimeRemaining > 0) {
      f.burnTimeRemaining = Math.max(0, f.burnTimeRemaining - dt);
    }

    // If we have valid input and can output, ignite fuel if not burning
    if (recipe && (f.outputItem === 0 || f.outputItem === recipe.output)) {
      if (f.burnTimeRemaining <= 0 && f.fuelCount > 0 && FUEL_DURATIONS[f.fuelItem]) {
        f.maxBurnTime = FUEL_DURATIONS[f.fuelItem];
        f.burnTimeRemaining = f.maxBurnTime;
        f.fuelCount--;
        if (f.fuelCount <= 0) f.fuelItem = 0;
      }

      // Cook item while burning
      if (f.burnTimeRemaining > 0) {
        f.cookProgress += dt;
        if (f.cookProgress >= recipe.time) {
          // Finish cooking item!
          f.cookProgress = 0;
          f.inputCount--;
          if (f.inputCount <= 0) f.inputItem = 0;

          f.outputItem = recipe.output;
          f.outputCount = (f.outputCount || 0) + 1;
        }
      } else {
        // Cooldown if fire went out
        f.cookProgress = Math.max(0, f.cookProgress - dt * 0.5);
      }
    } else {
      f.cookProgress = 0;
    }
  }

  // Update UI if furnace open
  if (activeFurnaceKey && isFurnaceOpen()) {
    renderFurnaceSlots();
  }
}

function initFurnaceUI() {
  furnaceModal = document.createElement('div');
  furnaceModal.id = 'furnace-modal';
  furnaceModal.className = 'fixed inset-0 z-[150] hidden items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none';

  furnaceModal.innerHTML = `
    <div class="glass-panel w-full max-w-xl bg-surface/90 backdrop-blur-xl border border-outline-variant rounded-xl shadow-[0_0_30px_rgba(15,21,14,0.9)] overflow-hidden p-6 text-on-surface">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3 mb-6">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-error text-2xl" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
          <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tighter uppercase font-bold">Fornalha de Fundição</h2>
        </div>
        <button id="close-furnace-btn" class="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-lg hover:bg-surface-container cursor-pointer">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Smelting Chamber View -->
      <div class="flex flex-col md:flex-row items-center justify-center gap-8 py-6 px-4 bg-surface-container/50 rounded-xl border border-outline-variant relative">
        <!-- Input & Fuel Column -->
        <div class="flex flex-col items-center gap-4">
          <!-- Input Ore / Raw Food -->
          <div id="furnace-input-slot" class="w-16 h-16 rounded-xl bg-surface-container-lowest border-2 border-outline-variant hover:border-primary flex items-center justify-center cursor-pointer relative" title="Minério Bruto ou Carne Crua"></div>

          <!-- Fire Animated Icon -->
          <div class="relative w-8 h-8 flex items-center justify-center">
            <span class="material-symbols-outlined text-outline-variant text-3xl">local_fire_department</span>
            <div id="furnace-flame-active" class="absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-200" style="height: 0%;">
              <span class="material-symbols-outlined text-error text-3xl drop-shadow-[0_0_8px_rgba(255,108,92,0.8)]" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
            </div>
          </div>

          <!-- Fuel Slot (Coal / Wood / Lava) -->
          <div id="furnace-fuel-slot" class="w-16 h-16 rounded-xl bg-surface-container-lowest border-2 border-outline-variant hover:border-primary flex items-center justify-center cursor-pointer relative" title="Combustível (Carvão, Madeira ou Lava)"></div>
        </div>

        <!-- Progress Arrow Center -->
        <div class="flex flex-col items-center gap-2">
          <div class="w-24 h-4 bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant relative">
            <div id="furnace-progress-bar" class="h-full bg-gradient-to-r from-error to-primary rounded-full transition-all duration-150" style="width: 0%;"></div>
          </div>
          <span class="font-label-caps text-[10px] text-secondary tracking-widest uppercase">FUNDIÇÃO</span>
        </div>

        <!-- Output Slot -->
        <div class="flex flex-col items-center gap-2">
          <div id="furnace-output-slot" class="w-24 h-24 rounded-2xl bg-surface-container-lowest border-2 border-primary shadow-[0_0_20px_rgba(120,220,119,0.4)] flex items-center justify-center cursor-pointer relative" title="Clique para coletar o lingote forjado ou carne assada"></div>
        </div>
      </div>

      <!-- Quick Player Hotbar Transfer -->
      <div class="mt-6 pt-4 border-t border-outline-variant/60">
        <div class="flex justify-between items-center mb-2">
          <span class="font-label-caps text-xs text-secondary uppercase font-semibold">Seu Inventário Rápido (Shift+Clique para carregar na Fornalha)</span>
        </div>
        <div id="furnace-hotbar-grid" class="grid grid-cols-9 gap-2"></div>
      </div>
    </div>
  `;

  document.body.appendChild(furnaceModal);

  document.getElementById('close-furnace-btn').addEventListener('click', closeFurnace);
}

function renderFurnaceSlots() {
  if (!activeFurnaceKey) return;
  const f = worldFurnaces.get(activeFurnaceKey);
  if (!f) return;

  const inputEl = document.getElementById('furnace-input-slot');
  const fuelEl = document.getElementById('furnace-fuel-slot');
  const outputEl = document.getElementById('furnace-output-slot');
  const flameActiveEl = document.getElementById('furnace-flame-active');
  const barEl = document.getElementById('furnace-progress-bar');
  const hotbarEl = document.getElementById('furnace-hotbar-grid');

  if (!inputEl || !fuelEl || !outputEl || !flameActiveEl || !barEl || !hotbarEl) return;

  // 1. Render Input Slot
  inputEl.innerHTML = '';
  if (f.inputItem > 0 && f.inputCount > 0) {
    const icon = createBlockIconCanvas(f.inputItem, 44);
    if (icon) inputEl.appendChild(icon);
    if (f.inputCount > 1) {
      const badge = document.createElement('span');
      badge.className = 'absolute bottom-0.5 right-1 font-label-caps text-[11px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]';
      badge.textContent = f.inputCount;
      inputEl.appendChild(badge);
    }
  } else {
    const label = document.createElement('span');
    label.className = 'font-label-caps text-[10px] text-on-surface-variant uppercase';
    label.textContent = 'MINÉRIO';
    inputEl.appendChild(label);
  }

  const inputSlotRef = {
    get: () => ({ type: f.inputItem, count: f.inputCount }),
    set: (type, count) => {
      f.inputItem = type;
      f.inputCount = type === 0 ? 0 : count;
      if (f.inputCount <= 0) f.inputItem = 0;
    },
    allowEquip: (type) => !!SMELT_RECIPES[type],
  };
  inputEl.onmousedown = (e) => handleSlotClick(inputSlotRef, e, renderFurnaceSlots);
  inputEl.oncontextmenu = (e) => e.preventDefault();
  bindSlotTooltip(inputEl, inputSlotRef.get);

  // 2. Render Fuel Slot
  fuelEl.innerHTML = '';
  if (f.fuelItem > 0 && f.fuelCount > 0) {
    const icon = createBlockIconCanvas(f.fuelItem, 44);
    if (icon) fuelEl.appendChild(icon);
    if (f.fuelCount > 1) {
      const badge = document.createElement('span');
      badge.className = 'absolute bottom-0.5 right-1 font-label-caps text-[11px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]';
      badge.textContent = f.fuelCount;
      fuelEl.appendChild(badge);
    }
  } else {
    const label = document.createElement('span');
    label.className = 'font-label-caps text-[10px] text-on-surface-variant uppercase';
    label.textContent = 'CARVÃO';
    fuelEl.appendChild(label);
  }

  const fuelSlotRef = {
    get: () => ({ type: f.fuelItem, count: f.fuelCount }),
    set: (type, count) => {
      f.fuelItem = type;
      f.fuelCount = type === 0 ? 0 : count;
      if (f.fuelCount <= 0) f.fuelItem = 0;
    },
    allowEquip: (type) => !!FUEL_DURATIONS[type],
  };
  fuelEl.onmousedown = (e) => handleSlotClick(fuelSlotRef, e, renderFurnaceSlots);
  fuelEl.oncontextmenu = (e) => e.preventDefault();
  bindSlotTooltip(fuelEl, fuelSlotRef.get);

  // 3. Render Flame & Progress
  const burnPct = f.maxBurnTime > 0 ? Math.min(100, Math.round((f.burnTimeRemaining / f.maxBurnTime) * 100)) : 0;
  flameActiveEl.style.height = `${burnPct}%`;

  const recipe = f.inputItem > 0 ? SMELT_RECIPES[f.inputItem] : null;
  const pct = recipe ? Math.min(100, Math.round((f.cookProgress / recipe.time) * 100)) : 0;
  barEl.style.width = `${pct}%`;

  // 4. Render Output Slot
  outputEl.innerHTML = '';
  if (f.outputItem > 0 && f.outputCount > 0) {
    const icon = createBlockIconCanvas(f.outputItem, 56);
    if (icon) outputEl.appendChild(icon);
    if (f.outputCount > 1) {
      const badge = document.createElement('span');
      badge.className = 'absolute -top-2 -right-2 bg-primary text-on-primary font-label-caps text-xs px-2 py-0.5 rounded shadow-[0_0_10px_rgba(120,220,119,0.8)] font-bold';
      badge.textContent = f.outputCount;
      outputEl.appendChild(badge);
    }
  } else {
    const label = document.createElement('span');
    label.className = 'font-label-caps text-[11px] text-primary/70 uppercase';
    label.textContent = 'PRODUTO';
    outputEl.appendChild(label);
  }
  bindSlotTooltip(outputEl, () => ({ type: f.outputItem, count: f.outputCount }));

  outputEl.onmousedown = (e) => {
    e.preventDefault();
    if (f.outputItem > 0 && f.outputCount > 0) {
      if (e.shiftKey) {
        if (addItemToInventory(f.outputItem, f.outputCount)) {
          playCraftSound();
          f.outputItem = 0;
          f.outputCount = 0;
          renderFurnaceSlots();
        }
      } else {
        if (cursorItem.type === 0) {
          setCursorItem(f.outputItem, f.outputCount);
          playCraftSound();
          f.outputItem = 0;
          f.outputCount = 0;
          renderFurnaceSlots();
        } else if (cursorItem.type === f.outputItem) {
          const maxStack = getMaxStack(f.outputItem);
          const transfer = Math.min(f.outputCount, maxStack - cursorItem.count);
          if (transfer > 0) {
            cursorItem.count += transfer;
            f.outputCount -= transfer;
            if (f.outputCount <= 0) f.outputItem = 0;
            updateCursorVisual();
            playCraftSound();
            renderFurnaceSlots();
          }
        }
      }
    }
  };
  outputEl.oncontextmenu = (e) => e.preventDefault();

  // 5. Render Quick Hotbar (Player inventory slots 0..8)
  hotbarEl.innerHTML = '';
  for (let idx = 0; idx < 9; idx++) {
    const slot = document.createElement('div');
    const item = inventorySlots[idx] || { type: 0, count: 0 };
    slot.className = `slot w-full h-11 rounded-lg bg-surface-container-lowest border border-outline-variant hover:border-primary flex items-center justify-center cursor-pointer transition-all relative`;

    if (item.type > 0 && item.count > 0) {
      const icon = createBlockIconCanvas(item.type, 30);
      if (icon) slot.appendChild(icon);
      slot.title = `${ITEM_NAMES[item.type] || 'Item'}`;

      if (item.count > 1) {
        const badge = document.createElement('span');
        badge.className = 'absolute bottom-0.5 right-1 font-label-caps text-[10px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]';
        badge.textContent = item.count;
        slot.appendChild(badge);
      }
    }

    const slotRef = {
      get: () => inventorySlots[idx] || { type: 0, count: 0 },
      set: (type, count) => {
        inventorySlots[idx] = { type, count: type === 0 ? 0 : count };
        syncSelectedHotbar();
      },
      onShiftClick: (type, count) => {
        // If smeltable -> transfer to input slot
        if (SMELT_RECIPES[type]) {
          if (f.inputItem === 0 || f.inputItem === type) {
            f.inputItem = type;
            f.inputCount = (f.inputCount || 0) + count;
            inventorySlots[idx] = { type: 0, count: 0 };
            syncSelectedHotbar();
            renderFurnaceSlots();
          }
        } else if (FUEL_DURATIONS[type]) {
          // If fuel -> transfer to fuel slot
          if (f.fuelItem === 0 || f.fuelItem === type) {
            f.fuelItem = type;
            f.fuelCount = (f.fuelCount || 0) + count;
            inventorySlots[idx] = { type: 0, count: 0 };
            syncSelectedHotbar();
            renderFurnaceSlots();
          }
        }
      },
    };

    slot.addEventListener('mousedown', (e) => handleSlotClick(slotRef, e, renderFurnaceSlots));
    slot.addEventListener('contextmenu', (e) => e.preventDefault());
    bindSlotTooltip(slot, slotRef.get);

    hotbarEl.appendChild(slot);
  }
}
