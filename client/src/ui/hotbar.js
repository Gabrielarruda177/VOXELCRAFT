/**
 * Hotbar — block and weapon selection bar at the bottom of the screen.
 * Synchronized with the inventory system.
 */

import { setSelectedBlockType } from '../engine/interaction.js';
import { isPointerLocked } from '../engine/camera.js';
import { isKeyDown } from '../engine/input.js';
import { createBlockIconCanvas } from './blockIcon.js';
import { getHotbarSlots, getHotbarSlotObjects, setHotbarSelectedIndex, isInventoryOpen } from './inventory.js';
import { ITEM_NAMES } from '../world/blockTypes.js';
import { bindSlotTooltip } from './tooltip.js';

let selectedIndex = 0;
let hotbarEl = null;
let nameEl = null;
let wheelInitialized = false;

export function initHotbar() {
  const hud = document.getElementById('hud');

  const frame = document.createElement('div');
  frame.id = 'hotbar-frame';
  Object.assign(frame.style, {
    position: 'absolute',
    bottom: '14px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '4px',
    padding: '5px',
    borderRadius: '8px',
    background: 'rgba(15, 23, 42, 0.85)',
    border: '2px solid rgba(255,255,255,0.15)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.06)',
    backdropFilter: 'blur(8px)',
    pointerEvents: 'none',
    zIndex: '20',
  });
  hotbarEl = frame;

  for (let i = 0; i < 9; i++) {
    const slot = document.createElement('div');
    slot.className = 'hotbar-slot';
    slot.dataset.index = i;

    Object.assign(slot.style, {
      width: '46px',
      height: '46px',
      borderRadius: '6px',
      border: '2px solid rgba(0,0,0,0.55)',
      background: 'rgba(30, 41, 59, 0.9)',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '75% 75%',
      position: 'relative',
      transition: 'border-color 0.15s, transform 0.15s, box-shadow 0.15s',
      cursor: 'pointer',
    });

    const num = document.createElement('span');
    num.className = 'hotbar-slot-num';
    Object.assign(num.style, {
      position: 'absolute',
      top: '1px',
      left: '3px',
      fontSize: '10px',
      color: '#94a3b8',
      fontWeight: 'bold',
      opacity: '0.6',
    });
    num.textContent = i + 1;
    slot.appendChild(num);

    const countBadge = document.createElement('span');
    countBadge.className = 'hotbar-slot-count';
    Object.assign(countBadge.style, {
      position: 'absolute',
      bottom: '1px',
      right: '3px',
      fontSize: '11px',
      color: '#fff',
      textShadow: '0 1px 2px #000',
      fontWeight: 'bold',
      display: 'none',
    });
    slot.appendChild(countBadge);

    bindSlotTooltip(slot, () => getHotbarSlotObjects()[i]);

    frame.appendChild(slot);
  }

  hud.appendChild(frame);

  nameEl = document.createElement('div');
  nameEl.id = 'hotbar-name';
  Object.assign(nameEl.style, {
    position: 'absolute',
    bottom: '72px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#fff',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    padding: '4px 14px',
    borderRadius: '12px',
    background: 'rgba(15, 23, 42, 0.75)',
    border: '1px solid rgba(255,255,255,0.18)',
    backdropFilter: 'blur(4px)',
    pointerEvents: 'none',
    zIndex: '20',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  });
  hud.appendChild(nameEl);

  updateHotbarVisual();
}

export function updateHotbar() {
  if (isInventoryOpen()) return;

  for (let i = 0; i < 9; i++) {
    if (isKeyDown(`Digit${i + 1}`)) {
      selectSlot(i);
    }
  }

  if (!wheelInitialized) {
    wheelInitialized = true;
    document.addEventListener('wheel', onWheel, { passive: false });
  }

  updateHotbarVisual();
}

let wheelAccum = 0;
function onWheel(e) {
  if (!isPointerLocked() || isInventoryOpen()) return;
  e.preventDefault();
  wheelAccum += Math.sign(e.deltaY);
  if (Math.abs(wheelAccum) >= 1) {
    const dir = wheelAccum > 0 ? 1 : -1;
    wheelAccum = 0;
    const next = (selectedIndex + dir + 9) % 9;
    selectSlot(next);
  }
}

function selectSlot(index) {
  selectedIndex = index;
  setHotbarSelectedIndex(index);
  updateHotbarVisual();
}

export function updateHotbarVisual() {
  if (!hotbarEl) return;

  const hotbarSlotObjects = getHotbarSlotObjects();
  const slots = hotbarEl.children;

  for (let i = 0; i < slots.length; i++) {
    const selected = i === selectedIndex;
    const slotObj = hotbarSlotObjects[i] || { type: 0, count: 0 };
    const itemType = slotObj.type || 0;
    const itemCount = slotObj.count || 0;

    slots[i].style.borderColor = selected ? 'rgba(74, 222, 128, 0.95)' : 'rgba(0,0,0,0.55)';
    slots[i].style.transform = selected ? 'scale(1.14) translateY(-3px)' : 'scale(1)';
    slots[i].style.boxShadow = selected
      ? '0 0 14px rgba(74, 222, 128, 0.4), 0 6px 14px rgba(0,0,0,0.6)'
      : 'none';
    slots[i].style.zIndex = selected ? '2' : '1';

    if (itemType > 0) {
      const icon = createBlockIconCanvas(itemType, 38);
      if (icon) {
        slots[i].style.backgroundImage = `url(${icon.toDataURL()})`;
      }
    } else {
      slots[i].style.backgroundImage = 'none';
    }

    const countBadge = slots[i].querySelector('.hotbar-slot-count');
    if (countBadge) {
      if (itemCount > 1) {
        countBadge.textContent = itemCount;
        countBadge.style.display = 'block';
      } else {
        countBadge.style.display = 'none';
      }
    }
  }

  if (nameEl) {
    const activeItem = hotbarSlotObjects[selectedIndex]?.type || 0;
    nameEl.textContent = ITEM_NAMES[activeItem] || '';
  }
}
