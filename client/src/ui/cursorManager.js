/**
 * Cursor & Slot Interaction Manager — Minecraft-style Floating Cursor, Stack Splitting,
 * Precision 1-by-1 Placement, Drag-and-Drop, and Unified Slot Management.
 */

import { BlockType, isWeapon, isPickaxe, isHoe, isArmor, isBucket } from '../world/blockTypes.js';
import { createBlockIconCanvas } from './blockIcon.js';
import { playCraftSound, playInventorySound } from '../engine/soundFx.js';

// Floating cursor item state
export let cursorItem = { type: 0, count: 0 };

let floatingEl = null;

export function getMaxStack(type) {
  if (!type || type === BlockType.AIR) return 0;
  if (
    isWeapon(type) ||
    isPickaxe(type) ||
    isHoe(type) ||
    isArmor(type) ||
    isBucket(type) ||
    type === BlockType.BOW
  ) {
    return 1;
  }
  return 64;
}

export function initCursorManager() {
  if (floatingEl) return;

  floatingEl = document.createElement('div');
  floatingEl.id = 'cursor-floating-item';
  floatingEl.className = 'fixed pointer-events-none z-[9999] hidden items-center justify-center';
  Object.assign(floatingEl.style, {
    width: '46px',
    height: '46px',
    transform: 'translate(-50%, -50%)',
    transition: 'none',
  });

  document.body.appendChild(floatingEl);

  window.addEventListener('mousemove', (e) => {
    if (cursorItem.type > 0 && cursorItem.count > 0) {
      floatingEl.style.display = 'flex';
      floatingEl.style.left = `${e.clientX}px`;
      floatingEl.style.top = `${e.clientY}px`;
    } else {
      floatingEl.style.display = 'none';
    }
  });
}

export function updateCursorVisual() {
  if (!floatingEl) initCursorManager();

  if (cursorItem.type > 0 && cursorItem.count > 0) {
    floatingEl.innerHTML = '';
    const icon = createBlockIconCanvas(cursorItem.type, 42);
    if (icon) floatingEl.appendChild(icon);

    if (cursorItem.count > 1) {
      const badge = document.createElement('span');
      badge.className = 'absolute bottom-0 right-0 font-label-caps text-xs font-bold bg-primary text-on-primary px-1.5 py-0.2 rounded shadow-[0_2px_4px_rgba(0,0,0,0.8)]';
      badge.textContent = cursorItem.count;
      floatingEl.appendChild(badge);
    }
    floatingEl.style.display = 'flex';
  } else {
    cursorItem.type = 0;
    cursorItem.count = 0;
    if (floatingEl) floatingEl.style.display = 'none';
  }
}

export function setCursorItem(type, count) {
  cursorItem.type = type;
  cursorItem.count = type === 0 ? 0 : count;
  updateCursorVisual();
}

export function getCursorItem() {
  return cursorItem;
}

export function clearCursorItem() {
  cursorItem = { type: 0, count: 0 };
  updateCursorVisual();
}

/**
 * Universal slot click handler supporting Left-Click, Right-Click (split/place 1), and Shift-Click.
 * @param {{ get: () => { type: number, count: number }, set: (type: number, count: number) => void, allowEquip?: (type: number) => boolean }} slotRef
 * @param {MouseEvent} e
 * @param {Function} onUpdate
 */
export function handleSlotClick(slotRef, e, onUpdate) {
  e.preventDefault();
  e.stopPropagation();

  const slotData = slotRef.get();
  const currentSlotType = slotData.type || 0;
  const currentSlotCount = slotData.count || 0;
  const maxStack = slotRef.maxStack || getMaxStack(cursorItem.type || currentSlotType);

  // ── 1. Shift + Left Click: Instant Transfer ───────────────
  if (e.shiftKey && e.button === 0) {
    if (currentSlotType > 0 && slotRef.onShiftClick) {
      slotRef.onShiftClick(currentSlotType, currentSlotCount);
      if (onUpdate) onUpdate();
      return;
    }
  }

  // ── 2. Left Click (Button 0) ──────────────────────────────
  if (e.button === 0) {
    // Case A: Cursor empty, Slot has items -> Pick up all items from slot
    if (cursorItem.type === 0 && currentSlotType > 0) {
      setCursorItem(currentSlotType, currentSlotCount);
      slotRef.set(0, 0);
      playInventorySound(true);
    }
    // Case B: Cursor has items, Slot empty -> Drop all items into slot
    else if (cursorItem.type > 0 && currentSlotType === 0) {
      if (slotRef.allowEquip && !slotRef.allowEquip(cursorItem.type)) {
        return; // Slot doesn't accept this item
      }
      const placeCount = Math.min(cursorItem.count, maxStack);
      slotRef.set(cursorItem.type, placeCount);
      cursorItem.count -= placeCount;
      if (cursorItem.count <= 0) {
        setCursorItem(0, 0);
      } else {
        updateCursorVisual();
      }
      playInventorySound(false);
    }
    // Case C: Cursor and Slot have the same item type -> Merge stacks up to maxStack
    else if (cursorItem.type > 0 && currentSlotType === cursorItem.type) {
      const space = maxStack - currentSlotCount;
      if (space > 0) {
        const transfer = Math.min(space, cursorItem.count);
        slotRef.set(currentSlotType, currentSlotCount + transfer);
        cursorItem.count -= transfer;
        if (cursorItem.count <= 0) {
          setCursorItem(0, 0);
        } else {
          updateCursorVisual();
        }
        playInventorySound(false);
      }
    }
    // Case D: Cursor and Slot have different items -> Swap
    else if (cursorItem.type > 0 && currentSlotType > 0 && cursorItem.type !== currentSlotType) {
      if (slotRef.allowEquip && !slotRef.allowEquip(cursorItem.type)) {
        return;
      }
      const tempType = currentSlotType;
      const tempCount = currentSlotCount;
      slotRef.set(cursorItem.type, cursorItem.count);
      setCursorItem(tempType, tempCount);
      playInventorySound(false);
    }
  }
  // ── 3. Right Click (Button 2) ─────────────────────────────
  else if (e.button === 2) {
    // Case A: Cursor empty, Slot has items -> Split stack in half
    if (cursorItem.type === 0 && currentSlotType > 0) {
      const half = Math.ceil(currentSlotCount / 2);
      const remain = currentSlotCount - half;
      setCursorItem(currentSlotType, half);
      slotRef.set(remain > 0 ? currentSlotType : 0, remain);
      playInventorySound(true);
    }
    // Case B: Cursor has items, Slot empty -> Place exactly 1 item
    else if (cursorItem.type > 0 && currentSlotType === 0) {
      if (slotRef.allowEquip && !slotRef.allowEquip(cursorItem.type)) {
        return;
      }
      slotRef.set(cursorItem.type, 1);
      cursorItem.count -= 1;
      if (cursorItem.count <= 0) {
        setCursorItem(0, 0);
      } else {
        updateCursorVisual();
      }
      playInventorySound(false);
    }
    // Case C: Cursor and Slot have the same item -> Add exactly 1 item
    else if (cursorItem.type > 0 && currentSlotType === cursorItem.type) {
      if (currentSlotCount < maxStack) {
        slotRef.set(currentSlotType, currentSlotCount + 1);
        cursorItem.count -= 1;
        if (cursorItem.count <= 0) {
          setCursorItem(0, 0);
        } else {
          updateCursorVisual();
        }
        playInventorySound(false);
      }
    }
  }

  if (onUpdate) onUpdate();
}
