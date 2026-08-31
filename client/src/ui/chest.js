/**
 * Chest System — Interactive 27-slot Container Storage GUI.
 * Persists chest contents across the world by coordinate key (x,y,z).
 * Full 64-item stack management and cursor drag-and-drop / split placement.
 */

import { ITEM_NAMES } from '../world/blockTypes.js';
import { createBlockIconCanvas } from './blockIcon.js';
import { playInventorySound, playCraftSound } from '../engine/soundFx.js';
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

// World Chests State: key 'x,y,z' -> array of 27 slot objects { type, count }
const worldChests = new Map();

let activeChestKey = null;
let chestModal = null;

export function getOrCreateChestSlots(x, y, z) {
  const key = `${x},${y},${z}`;
  if (!worldChests.has(key)) {
    worldChests.set(key, new Array(27).fill(null).map(() => ({ type: 0, count: 0 })));
  }
  return worldChests.get(key);
}

export function getChestItems(x, y, z) {
  const key = `${x},${y},${z}`;
  if (!worldChests.has(key)) return [];
  const chestSlots = worldChests.get(key);
  return chestSlots.filter(s => s && s.type > 0 && s.count > 0);
}

export function clearChest(x, y, z) {
  const key = `${x},${y},${z}`;
  if (worldChests.has(key)) {
    worldChests.delete(key);
  }
}

export function openChest(x, y, z) {
  activeChestKey = `${x},${y},${z}`;
  getOrCreateChestSlots(x, y, z);

  if (!chestModal) {
    initChestUI();
  }

  chestModal.style.display = 'flex';
  openWindow(UIWindow.CHEST);
  playInventorySound(true);
  renderChestSlots();
}

export function closeChest() {
  if (!chestModal) return;
  chestModal.style.display = 'none';
  activeChestKey = null;
  closeWindow(UIWindow.CHEST);
  playInventorySound(false);

  // Return floating cursor item to inventory
  if (cursorItem.type > 0 && cursorItem.count > 0) {
    addItemToInventory(cursorItem.type, cursorItem.count);
    clearCursorItem();
  }
}

export function isChestOpen() {
  return isWindowOpen(UIWindow.CHEST);
}

function initChestUI() {
  chestModal = document.createElement('div');
  chestModal.id = 'chest-modal';
  chestModal.className = 'fixed inset-0 z-[150] hidden items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none';

  chestModal.innerHTML = `
    <div class="glass-panel w-full max-w-xl bg-surface/90 backdrop-blur-xl border border-outline-variant rounded-xl shadow-[0_0_30px_rgba(15,21,14,0.9)] overflow-hidden p-6 text-on-surface">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3 mb-6">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-tertiary text-2xl" style="font-variation-settings: 'FILL' 1;">inventory_2</span>
          <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tighter uppercase font-bold">Baú de Armazenamento (27 slots)</h2>
        </div>
        <button id="close-chest-btn" class="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-lg hover:bg-surface-container cursor-pointer">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Chest 27 Storage Slots -->
      <div class="mb-6 bg-surface-container/50 p-4 rounded-xl border border-outline-variant">
        <span class="font-label-caps text-xs text-secondary uppercase font-semibold block mb-2">Conteúdo do Baú (Botão Esq: Pegar/Colocar • Botão Dir: Dividir/Colocar 1)</span>
        <div id="chest-grid" class="grid grid-cols-9 gap-2"></div>
      </div>

      <!-- Quick Player Hotbar Transfer -->
      <div class="pt-4 border-t border-outline-variant/60">
        <span class="font-label-caps text-xs text-primary uppercase font-semibold block mb-2">Seu Inventário (Shift+Clique para transferência rápida)</span>
        <div id="chest-hotbar-grid" class="grid grid-cols-9 gap-2"></div>
      </div>
    </div>
  `;

  document.body.appendChild(chestModal);

  document.getElementById('close-chest-btn').addEventListener('click', closeChest);
}

function renderChestSlots() {
  if (!activeChestKey) return;
  const chestSlots = worldChests.get(activeChestKey);
  if (!chestSlots) return;

  const chestGrid = document.getElementById('chest-grid');
  const hotbarGrid = document.getElementById('chest-hotbar-grid');
  if (!chestGrid || !hotbarGrid) return;

  // 1. Render 27 Chest Slots
  chestGrid.innerHTML = '';
  chestSlots.forEach((slotData, idx) => {
    const slot = document.createElement('div');
    const item = slotData || { type: 0, count: 0 };
    slot.className = `slot w-full h-11 rounded-lg bg-surface-container-lowest border ${
      item.type > 0 ? 'border-tertiary/70 shadow-[0_0_8px_rgba(255,180,169,0.2)]' : 'border-outline-variant'
    } hover:border-primary flex items-center justify-center cursor-pointer transition-all relative`;

    if (item.type > 0 && item.count > 0) {
      const icon = createBlockIconCanvas(item.type, 32);
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
      get: () => chestSlots[idx] || { type: 0, count: 0 },
      set: (type, count) => {
        chestSlots[idx] = { type, count: type === 0 ? 0 : count };
      },
      onShiftClick: (type, count) => {
        // Shift-click from chest to player inventory
        if (addItemToInventory(type, count)) {
          chestSlots[idx] = { type: 0, count: 0 };
          playInventorySound(false);
        }
      },
    };

    slot.addEventListener('mousedown', (e) => handleSlotClick(slotRef, e, renderChestSlots));
    slot.addEventListener('contextmenu', (e) => e.preventDefault());
    bindSlotTooltip(slot, slotRef.get);

    chestGrid.appendChild(slot);
  });

  // 2. Render Player Hotbar Quick Transfer (slots 0..8)
  hotbarGrid.innerHTML = '';
  for (let idx = 0; idx < 9; idx++) {
    const slot = document.createElement('div');
    const item = inventorySlots[idx] || { type: 0, count: 0 };
    slot.className = `slot w-full h-11 rounded-lg bg-surface-container-lowest border ${
      item.type > 0 ? 'border-primary/60' : 'border-outline-variant'
    } hover:border-primary flex items-center justify-center cursor-pointer transition-all relative`;

    if (item.type > 0 && item.count > 0) {
      const icon = createBlockIconCanvas(item.type, 32);
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
        // Shift-click from hotbar to chest
        const maxStack = getMaxStack(type);
        let remaining = count;
        // First try existing matching stacks in chest
        for (let c = 0; c < 27; c++) {
          if (chestSlots[c].type === type && chestSlots[c].count < maxStack) {
            const space = maxStack - chestSlots[c].count;
            const add = Math.min(space, remaining);
            chestSlots[c].count += add;
            remaining -= add;
            if (remaining <= 0) break;
          }
        }
        // Then try empty chest slots
        if (remaining > 0) {
          for (let c = 0; c < 27; c++) {
            if (chestSlots[c].type === 0 || chestSlots[c].count === 0) {
              chestSlots[c] = { type, count: remaining };
              remaining = 0;
              break;
            }
          }
        }
        inventorySlots[idx] = remaining > 0 ? { type, count: remaining } : { type: 0, count: 0 };
        syncSelectedHotbar();
        playInventorySound(false);
      },
    };

    slot.addEventListener('mousedown', (e) => handleSlotClick(slotRef, e, renderChestSlots));
    slot.addEventListener('contextmenu', (e) => e.preventDefault());
    bindSlotTooltip(slot, slotRef.get);

    hotbarGrid.appendChild(slot);
  }
}
