/**
 * Health, Armor, Hunger & XP HUD — Authentic Minecraft Pixel-Art Interface.
 *
 * Renders:
 *  - 10 Armor Chestplate Icons (Top-Left): Silver/White filled based on equipped armor defense, dark when empty.
 *  - 10 Health Heart Icons (Bottom-Left): Full, half and empty red pixel-art hearts.
 *  - 10 Hunger Drumstick Icons (Right): Full, half and empty roasted meat icons.
 *  - Centered XP Level ("14") & 18-Segment Neon Green XP Progress Bar.
 *  - Damage vignette & death overlay.
 */

import { getHealth, getMaxHealth, getDamageFlash, getHunger, getMaxHunger } from '../entities/player.js';
import { getEquippedArmorDefense } from './inventory.js';
import { getPlayerLevel, getPlayerXp } from '../engine/enchantingSystem.js';

let statusContainer = null;
let armorBarEl = null;
let healthBarEl = null;
let hungerBarEl = null;
let xpLevelEl = null;
let xpBarFillEl = null;
let vignette = null;
let deathOverlay = null;

// Pixel-Art Cache
const ICON_SIZE = 18;

function makePixelCanvas(w, h, drawFn) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  const p = (x, y, col) => {
    ctx.fillStyle = col;
    ctx.fillRect(x, y, 1, 1);
  };
  const r = (x, y, bw, bh, col) => {
    ctx.fillStyle = col;
    ctx.fillRect(x, y, bw, bh);
  };
  drawFn(ctx, p, r);

  const out = document.createElement('canvas');
  out.width = ICON_SIZE;
  out.height = ICON_SIZE;
  const outCtx = out.getContext('2d');
  outCtx.imageSmoothingEnabled = false;
  outCtx.drawImage(c, 0, 0, w, h, 0, 0, ICON_SIZE, ICON_SIZE);
  return out;
}

// ── 1. ARMOR CHESTPLATE ICONS ─────────────────────────────

function createArmorIcon(state = 'empty') {
  const isFull = state === 'full';
  const hi = isFull ? '#ffffff' : '#475569';
  const mid = isFull ? '#cbd5e1' : '#334155';
  const dark = isFull ? '#64748b' : '#1e293b';
  const out = isFull ? '#0f172a' : '#090d16';

  return makePixelCanvas(9, 9, (ctx, p, r) => {
    // Shoulders
    p(1, 1, mid); p(2, 1, mid); p(6, 1, mid); p(7, 1, mid);
    p(1, 2, hi); p(7, 2, mid);
    // Neck cut
    p(3, 1, '#00000000'); p(4, 1, '#00000000'); p(5, 1, '#00000000');
    // Body
    r(2, 2, 5, 5, mid);
    p(3, 2, hi); p(3, 3, hi);
    r(3, 7, 3, 1, dark);
    // Arms
    p(0, 3, dark); p(8, 3, dark);
    // Black Outline
    p(1, 0, out); p(2, 0, out); p(6, 0, out); p(7, 0, out);
    p(0, 1, out); p(8, 1, out); p(0, 2, out); p(8, 2, out); p(0, 4, out); p(8, 4, out);
    p(1, 5, out); p(7, 5, out); p(2, 7, out); p(6, 7, out);
    p(3, 8, out); p(4, 8, out); p(5, 8, out);
  });
}

// ── 2. HEALTH HEART ICONS ─────────────────────────────────

function createHeartIcon(state = 'full') {
  const isFull = state === 'full';
  const isHalf = state === 'half';
  const isEmpty = state === 'empty';

  return makePixelCanvas(9, 9, (ctx, p, r) => {
    // Outer border
    r(1, 0, 2, 1, '#0f172a'); r(5, 0, 2, 1, '#0f172a');
    p(0, 1, '#0f172a'); p(3, 1, '#0f172a'); p(4, 1, '#0f172a'); p(7, 1, '#0f172a');
    p(0, 2, '#0f172a'); p(0, 3, '#0f172a'); p(7, 2, '#0f172a'); p(7, 3, '#0f172a');
    p(1, 4, '#0f172a'); p(6, 4, '#0f172a');
    p(2, 5, '#0f172a'); p(5, 5, '#0f172a');
    p(3, 6, '#0f172a'); p(4, 6, '#0f172a');
    p(3, 7, '#0f172a');

    if (isEmpty) {
      r(1, 1, 2, 3, '#1e293b');
      r(5, 1, 2, 3, '#1e293b');
      r(2, 4, 4, 1, '#1e293b');
      r(3, 5, 2, 1, '#1e293b');
      return;
    }

    // Left Half Red
    r(1, 1, 2, 3, '#ef4444');
    p(1, 1, '#ffffff'); // Specular shine
    p(2, 4, '#dc2626');
    p(3, 5, '#991b1b');

    // Right Half
    if (isFull) {
      r(5, 1, 2, 3, '#ef4444');
      p(4, 4, '#dc2626'); p(5, 4, '#dc2626');
      p(4, 5, '#991b1b');
    } else {
      // Half empty
      r(5, 1, 2, 3, '#1e293b');
      p(4, 4, '#1e293b'); p(5, 4, '#1e293b');
      p(4, 5, '#1e293b');
    }
  });
}

// ── 3. HUNGER DRUMSTICK ICONS ─────────────────────────────

function createDrumstickIcon(state = 'full') {
  const isFull = state === 'full';
  const isHalf = state === 'half';
  const isEmpty = state === 'empty';

  return makePixelCanvas(9, 9, (ctx, p, r) => {
    // Outer border
    r(4, 1, 3, 1, '#0f172a');
    p(3, 2, '#0f172a'); p(7, 2, '#0f172a');
    p(2, 3, '#0f172a'); p(8, 3, '#0f172a');
    p(2, 4, '#0f172a'); p(8, 4, '#0f172a');
    p(3, 5, '#0f172a'); p(7, 5, '#0f172a');
    p(4, 6, '#0f172a'); p(6, 6, '#0f172a');
    p(2, 7, '#0f172a'); p(1, 8, '#0f172a');

    if (isEmpty) {
      r(3, 2, 4, 3, '#1e293b');
      r(4, 4, 3, 2, '#1e293b');
      p(2, 7, '#334155');
      return;
    }

    // Savory Roasted Meat
    r(3, 2, 4, 3, '#b45309');
    p(4, 2, '#f59e0b'); p(5, 2, '#dc2626'); // Paprika glint
    p(4, 3, '#f59e0b');
    r(4, 5, 2, 1, '#78350f');

    // Bone tip
    p(2, 7, '#f8fafc'); p(1, 7, '#e2e8f0'); p(2, 8, '#cbd5e1');

    if (isHalf) {
      // Right half dark
      p(6, 2, '#1e293b'); p(6, 3, '#1e293b'); p(6, 4, '#1e293b');
    }
  });
}

// ── HUD INITIALIZATION ────────────────────────────────────

export function initHealthHud() {
  const hud = document.getElementById('hud');

  // Damage vignette (red screen edge flash on hit)
  vignette = document.createElement('div');
  vignette.id = 'damage-vignette';
  vignette.style.opacity = '0';
  hud.appendChild(vignette);

  // Main Status Wrapper sitting right above the Hotbar
  statusContainer = document.createElement('div');
  statusContainer.id = 'voxelcraft-pixel-hud';
  statusContainer.style.cssText = `
    position: fixed;
    bottom: 74px;
    left: 50%;
    transform: translateX(-50%);
    width: 480px;
    max-width: 95vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    pointer-events: none;
    z-index: 30;
    user-select: none;
  `;

  // Top Row: [ Armor (Left) ] ---------------- [ Hunger (Right) ]
  const barsRow = document.createElement('div');
  barsRow.style.cssText = 'width: 100%; display: flex; justify-content: space-between; align-items: flex-end; padding: 0 4px;';

  // Left Column (Armor on top, Health beneath)
  const leftCol = document.createElement('div');
  leftCol.style.cssText = 'display: flex; flex-direction: column; gap: 3px;';

  armorBarEl = document.createElement('div');
  armorBarEl.style.cssText = 'display: flex; gap: 1px; min-height: 18px;';

  healthBarEl = document.createElement('div');
  healthBarEl.style.cssText = 'display: flex; gap: 1px; min-height: 18px;';

  leftCol.appendChild(armorBarEl);
  leftCol.appendChild(healthBarEl);
  barsRow.appendChild(leftCol);

  // Right Column (Hunger on bottom)
  const rightCol = document.createElement('div');
  rightCol.style.cssText = 'display: flex; flex-direction: column; gap: 3px; align-items: flex-end;';

  const dummySpacer = document.createElement('div');
  dummySpacer.style.cssText = 'min-height: 18px;'; // Matches armor bar height
  rightCol.appendChild(dummySpacer);

  hungerBarEl = document.createElement('div');
  hungerBarEl.style.cssText = 'display: flex; gap: 1px; min-height: 18px;';
  rightCol.appendChild(hungerBarEl);

  barsRow.appendChild(rightCol);
  statusContainer.appendChild(barsRow);

  // Middle: Green XP Level Number Centered
  xpLevelEl = document.createElement('div');
  xpLevelEl.id = 'hud-xp-level';
  xpLevelEl.style.cssText = `
    font-family: monospace, sans-serif;
    font-size: 14px;
    font-weight: 900;
    color: #4ade80;
    text-shadow: -1px -1px 0 #052e16, 1px -1px 0 #052e16, -1px 1px 0 #052e16, 1px 1px 0 #052e16, 0 2px 4px #000;
    margin-bottom: -6px;
    z-index: 2;
  `;
  xpLevelEl.textContent = '1';
  statusContainer.appendChild(xpLevelEl);

  // Bottom: Segmented Green XP Bar
  const xpBarContainer = document.createElement('div');
  xpBarContainer.id = 'hud-xp-bar-container';
  xpBarContainer.style.cssText = `
    width: 100%;
    height: 7px;
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 2px 6px rgba(0,0,0,0.8);
  `;

  xpBarFillEl = document.createElement('div');
  xpBarFillEl.id = 'hud-xp-bar-fill';
  xpBarFillEl.style.cssText = `
    width: 0%;
    height: 100%;
    background: linear-gradient(180deg, #86efac 0%, #22c55e 50%, #15803d 100%);
    box-shadow: 0 0 8px #22c55e;
    transition: width 0.2s ease-out;
  `;
  xpBarContainer.appendChild(xpBarFillEl);

  // Segment notch dividers
  const notchOverlay = document.createElement('div');
  notchOverlay.style.cssText = `
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
  `;
  for (let i = 0; i < 18; i++) {
    const notch = document.createElement('div');
    notch.style.cssText = 'width: 1px; height: 100%; background: rgba(0,0,0,0.65);';
    notchOverlay.appendChild(notch);
  }
  xpBarContainer.appendChild(notchOverlay);

  statusContainer.appendChild(xpBarContainer);
  hud.appendChild(statusContainer);

  // Death overlay
  deathOverlay = document.createElement('div');
  deathOverlay.id = 'death-overlay';
  deathOverlay.innerHTML =
    '<div class="death-title">☠ VOCÊ MORREU</div>' +
    '<div class="death-hint">Pressione ESPAÇO para renascer</div>';
  deathOverlay.style.display = 'none';
  hud.appendChild(deathOverlay);
}

// ── HUD UPDATE PER FRAME ──────────────────────────────────

export function updateHealthHud() {
  if (!statusContainer) return;

  const hp = getHealth();
  const maxHp = getMaxHealth();
  const def = getEquippedArmorDefense();
  const hunger = getHunger();
  const level = getPlayerLevel();
  const xp = getPlayerXp();
  const xpNeeded = level * 25;

  // 1. Update Armor Bar (10 Icons: each = 2 def points)
  armorBarEl.innerHTML = '';
  const fullArmorCount = Math.floor(def / 2);
  const hasHalfArmor = def % 2 !== 0;

  for (let i = 0; i < 10; i++) {
    let state = 'empty';
    if (i < fullArmorCount) {
      state = 'full';
    } else if (i === fullArmorCount && hasHalfArmor) {
      state = 'full'; // High quality full icon
    }
    armorBarEl.appendChild(createArmorIcon(state));
  }

  // 2. Update Health Bar (10 Hearts: each = 2 HP)
  healthBarEl.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const val = hp - i * 2;
    const state = val >= 2 ? 'full' : val === 1 ? 'half' : 'empty';
    healthBarEl.appendChild(createHeartIcon(state));
  }

  // 3. Update Hunger Bar (10 Drumsticks: each = 2 points)
  hungerBarEl.innerHTML = '';
  const isHungerCritical = hunger <= 6;
  for (let i = 0; i < 10; i++) {
    const val = hunger - i * 2;
    const state = val >= 2 ? 'full' : val === 1 ? 'half' : 'empty';
    const icon = createDrumstickIcon(state);
    if (isHungerCritical && state !== 'empty') {
      const offset = (Math.sin(performance.now() * 0.02 + i) * 1.5).toFixed(1);
      icon.style.transform = `translateY(${offset}px)`;
    }
    hungerBarEl.appendChild(icon);
  }

  // 4. Update XP Level & Progress Bar
  if (xpLevelEl) xpLevelEl.textContent = level;
  if (xpBarFillEl) {
    const progress = Math.min(100, Math.max(0, (xp / xpNeeded) * 100));
    xpBarFillEl.style.width = `${progress}%`;
  }

  // 5. Vignette & Death Overlay
  if (vignette) {
    let opacity = getDamageFlash() * 0.75;
    // Heartbeat pulse when HP is critically low (< 6 HP = 3 hearts)
    if (hp > 0 && hp <= 6) {
      const pulse = (Math.sin(performance.now() * 0.008) * 0.5 + 0.5) * 0.35;
      opacity = Math.max(opacity, pulse);
    }
    vignette.style.opacity = opacity.toString();
  }
  if (deathOverlay) deathOverlay.style.display = hp <= 0 ? 'flex' : 'none';
}
