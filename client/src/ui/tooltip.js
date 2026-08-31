/**
 * Universal Contextual Tooltip System — VoxelCraft 3D
 *
 * Provides a crisp, high-contrast, pixel-art styled floating tooltip
 * for all interactive item slots (Hotbar, Inventory, Chest, Furnace, Crafting, Enchanting).
 */

import { ITEM_NAMES, BlockType, getItemStats } from '../world/blockTypes.js';

let tooltipEl = null;
let currentTarget = null;

export function initTooltipSystem() {
  if (tooltipEl) return;

  tooltipEl = document.createElement('div');
  tooltipEl.id = 'voxelcraft-universal-tooltip';
  tooltipEl.style.cssText = `
    position: fixed;
    z-index: 10000;
    pointer-events: none;
    display: none;
    max-width: 260px;
    padding: 8px 12px;
    background: rgba(15, 23, 42, 0.95);
    border: 2px solid rgba(74, 222, 128, 0.6);
    border-radius: 6px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.85), inset 0 0 12px rgba(34, 197, 94, 0.15);
    backdrop-filter: blur(8px);
    color: #f8fafc;
    font-family: 'Segoe UI', system-ui, sans-serif;
    font-size: 12px;
    line-height: 1.4;
    transition: opacity 0.08s ease-out;
  `;

  document.body.appendChild(tooltipEl);

  window.addEventListener('mousemove', onMouseMove, { passive: true });
}

function onMouseMove(e) {
  if (!tooltipEl || tooltipEl.style.display === 'none') return;

  const pad = 14;
  let x = e.clientX + pad;
  let y = e.clientY + pad;

  // Keep inside viewport boundaries
  const rect = tooltipEl.getBoundingClientRect();
  if (x + rect.width > window.innerWidth - 8) {
    x = e.clientX - rect.width - pad;
  }
  if (y + rect.height > window.innerHeight - 8) {
    y = e.clientY - rect.height - pad;
  }

  tooltipEl.style.left = `${Math.max(8, x)}px`;
  tooltipEl.style.top = `${Math.max(8, y)}px`;
}

/**
 * Show tooltip for a specific item type.
 * @param {number} itemType 
 * @param {number} count 
 * @param {MouseEvent} [event] 
 */
export function showItemTooltip(itemType, count = 1, event = null) {
  if (!tooltipEl) initTooltipSystem();
  if (!itemType || itemType === 0) {
    hideTooltip();
    return;
  }

  const name = ITEM_NAMES[itemType] || `Item #${itemType}`;
  const stats = getItemStats(itemType);

  let categoryBadge = '<span style="color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Bloco / Item</span>';
  let statsHtml = '';
  let hintHtml = '<div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.1); color: #64748b; font-size: 10px;">[Clique]: Selecionar &bull; [Shift+Clique]: Mover</div>';

  if (stats.isWeapon) {
    categoryBadge = '<span style="color: #f87171; font-weight: bold; font-size: 10px; text-transform: uppercase;">⚔ Arma de Combate</span>';
    statsHtml = `
      <div style="color: #fca5a5; font-weight: 600;">⚔ Dano de Ataque: +${stats.damage}</div>
      <div style="color: #cbd5e1; font-size: 11px;">⚡ Velocidade: 1.6</div>
    `;
    hintHtml = '<div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.1); color: #94a3b8; font-size: 10px;">[Clique Esquerdo]: Atacar &bull; [Pulo+Golpe]: Crítico (+50%)</div>';
  } else if (stats.isArmor) {
    categoryBadge = '<span style="color: #38bdf8; font-weight: bold; font-size: 10px; text-transform: uppercase;">🛡 Peça de Armadura</span>';
    const reduction = Math.min(80, stats.defense * 4);
    statsHtml = `
      <div style="color: #7dd3fc; font-weight: 600;">🛡 Proteção: +${stats.defense} (${reduction}% Redução)</div>
      <div style="color: #cbd5e1; font-size: 11px;">Slot: ${stats.slotName || 'Armadura'}</div>
    `;
    hintHtml = '<div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.1); color: #94a3b8; font-size: 10px;">[Clique]: Equipar no Slot de Defesa</div>';
  } else if (stats.isFood) {
    categoryBadge = '<span style="color: #fbbf24; font-weight: bold; font-size: 10px; text-transform: uppercase;">🍗 Alimento</span>';
    const halfDrumsticks = stats.hunger;
    statsHtml = `
      <div style="color: #fde68a; font-weight: 600;">🍗 Restaura: +${halfDrumsticks} Fome</div>
      <div style="color: #86efac; font-size: 11px;">✨ Saturação Alta (Cura Natural)</div>
    `;
    hintHtml = '<div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.1); color: #94a3b8; font-size: 10px;">[Segurar Botão Direito]: Consumir</div>';
  } else if (stats.isTool) {
    categoryBadge = '<span style="color: #a78bfa; font-weight: bold; font-size: 10px; text-transform: uppercase;">⛏ Ferramenta</span>';
    statsHtml = `
      <div style="color: #c4b5fd; font-weight: 600;">⛏ Eficiência: ${stats.toolTier || 'Média'}</div>
      <div style="color: #cbd5e1; font-size: 11px;">Mineração Acelerada</div>
    `;
  }

  tooltipEl.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
      <span style="font-weight: 700; font-size: 13px; color: #fff;">${name}</span>
      ${count > 1 ? `<span style="color: #4ade80; font-weight: bold; font-size: 11px;">x${count}</span>` : ''}
    </div>
    <div style="margin-bottom: 4px;">${categoryBadge}</div>
    ${statsHtml ? `<div style="margin-top: 4px;">${statsHtml}</div>` : ''}
    ${hintHtml}
  `;

  tooltipEl.style.display = 'block';

  if (event) {
    onMouseMove(event);
  }
}

export function hideTooltip() {
  if (tooltipEl) {
    tooltipEl.style.display = 'none';
  }
}

/**
 * Bind hover events to an element slot.
 * @param {HTMLElement} element 
 * @param {Function} getItemDataFn Returns { type, count }
 */
export function bindSlotTooltip(element, getItemDataFn) {
  element.addEventListener('mouseenter', (e) => {
    const data = getItemDataFn();
    if (data && data.type > 0) {
      showItemTooltip(data.type, data.count || 1, e);
    }
  });

  element.addEventListener('mouseleave', () => {
    hideTooltip();
  });
}
