/**
 * Block & Item Icon — High-Definition 16×16 Pixel-Art Raster Engine.
 *
 * Renders authentic, high-quality pixel art for all weapons, tools, armors,
 * minerals, foods, drops, redstone components, and 3D isometric block cubes.
 */

import { generateAllTextures } from '../rendering/textures/textureGenerator.js';
import { BlockType, BlockTextures } from '../world/blockTypes.js';

let atlas = null;

function getAtlas() {
  if (!atlas) atlas = generateAllTextures();
  return atlas;
}

function drawFace(ctx, quad, img, brightness) {
  const [p0, p1, p2, p3] = quad;
  const a = (p1[0] - p0[0]) / 16;
  const b = (p1[1] - p0[1]) / 16;
  const c = (p3[0] - p0[0]) / 16;
  const d = (p3[1] - p0[1]) / 16;

  ctx.save();
  ctx.filter = `brightness(${brightness})`;
  ctx.setTransform(a, b, c, d, p0[0], p0[1]);
  ctx.drawImage(img, 0, 0, 16, 16, 0, 0, 16, 16);
  ctx.restore();
}

/**
 * Helper to create a 16x16 pixel-art canvas and scale it to target size with sharp nearest-neighbor filtering.
 */
function makePixelIcon(size, draw16) {
  const pCanvas = document.createElement('canvas');
  pCanvas.width = 16;
  pCanvas.height = 16;
  const pCtx = pCanvas.getContext('2d');

  // Drawing helpers
  const p = (x, y, c) => {
    pCtx.fillStyle = c;
    pCtx.fillRect(x, y, 1, 1);
  };
  const r = (x, y, w, h, c) => {
    pCtx.fillStyle = c;
    pCtx.fillRect(x, y, w, h);
  };

  draw16(pCtx, p, r);

  const outCanvas = document.createElement('canvas');
  outCanvas.width = size;
  outCanvas.height = size;
  const outCtx = outCanvas.getContext('2d');
  outCtx.imageSmoothingEnabled = false;
  outCtx.drawImage(pCanvas, 0, 0, 16, 16, 0, 0, size, size);
  return outCanvas;
}

/**
 * Create a pixel-art icon for any block type or weapon.
 * @param {number} blockType
 * @param {number} size
 * @returns {HTMLCanvasElement|null}
 */
export function createBlockIconCanvas(blockType, size = 46) {
  // ── 1. SWORDS ───────────────────────────────────────────
  if (
    blockType === BlockType.DIAMOND_SWORD ||
    blockType === BlockType.IRON_SWORD ||
    blockType === BlockType.STONE_SWORD ||
    blockType === BlockType.WOODEN_SWORD
  ) {
    let out, edge, mid, hi, guard, grip;
    if (blockType === BlockType.DIAMOND_SWORD) {
      out = '#083344'; edge = '#0891b2'; mid = '#22d3ee'; hi = '#e0f2fe'; guard = '#0f172a'; grip = '#78350f';
    } else if (blockType === BlockType.IRON_SWORD) {
      out = '#1e293b'; edge = '#64748b'; mid = '#cbd5e1'; hi = '#ffffff'; guard = '#334155'; grip = '#854d0e';
    } else if (blockType === BlockType.STONE_SWORD) {
      out = '#0f172a'; edge = '#475569'; mid = '#64748b'; hi = '#94a3b8'; guard = '#1e293b'; grip = '#78350f';
    } else {
      out = '#451a03'; edge = '#78350f'; mid = '#b45309'; hi = '#fbbf24'; guard = '#451a03'; grip = '#451a03';
    }

    return makePixelIcon(size, (ctx, p, r) => {
      // Blade diagonal from (14, 1) down to (6, 9)
      p(14, 1, hi); p(13, 1, edge); p(14, 2, edge);
      for (let i = 0; i < 7; i++) {
        const x = 13 - i, y = 2 + i;
        p(x + 1, y, out);
        p(x, y, hi);
        p(x - 1, y, mid);
        p(x, y + 1, mid);
        p(x - 1, y + 1, edge);
        p(x - 2, y + 1, out);
        p(x - 1, y + 2, out);
      }
      // Crossguard
      p(8, 6, guard); p(9, 7, guard);
      p(5, 9, guard); p(6, 10, guard);
      p(5, 8, out); p(4, 9, out); p(6, 11, out); p(7, 10, out);
      p(9, 6, out); p(10, 7, out);
      // Grip handle
      p(5, 10, grip); p(4, 11, grip); p(3, 12, grip);
      p(4, 10, out); p(5, 11, out); p(3, 11, out); p(4, 12, out);
      // Pommel
      p(2, 13, guard); p(1, 14, guard);
      p(2, 14, out); p(1, 13, out); p(0, 14, out); p(1, 15, out); p(2, 15, out);
    });
  }

  // ── 2. PICKAXES ─────────────────────────────────────────
  if (
    blockType === BlockType.DIAMOND_PICKAXE ||
    blockType === BlockType.IRON_PICKAXE ||
    blockType === BlockType.STONE_PICKAXE ||
    blockType === BlockType.WOODEN_PICKAXE
  ) {
    let edge, mid, hi;
    if (blockType === BlockType.DIAMOND_PICKAXE) {
      edge = '#0891b2'; mid = '#22d3ee'; hi = '#e0f2fe';
    } else if (blockType === BlockType.IRON_PICKAXE) {
      edge = '#64748b'; mid = '#cbd5e1'; hi = '#ffffff';
    } else if (blockType === BlockType.STONE_PICKAXE) {
      edge = '#334155'; mid = '#64748b'; hi = '#94a3b8';
    } else {
      edge = '#78350f'; mid = '#b45309'; hi = '#fbbf24';
    }

    return makePixelIcon(size, (ctx, p, r) => {
      // Pickaxe Head Arch
      p(5, 3, hi); p(6, 2, hi); p(7, 2, edge);
      p(8, 2, hi); p(9, 2, hi); p(10, 3, edge);
      p(11, 4, mid); p(12, 5, mid); p(13, 6, hi); p(14, 7, edge);
      p(4, 4, mid); p(3, 5, mid); p(2, 6, hi); p(1, 7, edge);
      p(8, 3, edge); p(9, 4, edge); p(7, 4, edge);
      // Handle
      for (let i = 0; i < 9; i++) {
        p(8 - i, 4 + i, '#78350f');
        p(9 - i, 4 + i, '#451a03');
      }
    });
  }

  // ── 3. HOES ─────────────────────────────────────────────
  if (
    blockType === BlockType.IRON_HOE ||
    blockType === BlockType.STONE_HOE ||
    blockType === BlockType.WOODEN_HOE
  ) {
    const isIron = blockType === BlockType.IRON_HOE;
    const isStone = blockType === BlockType.STONE_HOE;
    const headColor = isIron ? '#cbd5e1' : isStone ? '#64748b' : '#b45309';
    const headHi = isIron ? '#ffffff' : isStone ? '#94a3b8' : '#fbbf24';

    return makePixelIcon(size, (ctx, p, r) => {
      // Hoe Blade
      r(8, 2, 5, 2, headColor);
      r(12, 4, 2, 3, headColor);
      p(9, 2, headHi); p(10, 2, headHi); p(13, 4, headHi);
      // Handle
      for (let i = 0; i < 10; i++) {
        p(8 - i, 4 + i, '#78350f');
      }
    });
  }

  // ── 4. BOW & ARROW ──────────────────────────────────────
  if (blockType === BlockType.BOW) {
    return makePixelIcon(size, (ctx, p, r) => {
      // Curved wood stave
      p(13, 2, '#451a03'); p(12, 1, '#78350f'); p(11, 2, '#b45309');
      p(9, 4, '#78350f'); p(7, 6, '#b45309'); p(5, 8, '#78350f');
      p(3, 10, '#b45309'); p(2, 11, '#78350f'); p(1, 12, '#451a03'); p(2, 13, '#78350f');
      // String
      for (let i = 0; i < 11; i++) {
        p(13 - i, 3 + i, '#f8fafc');
      }
    });
  }

  if (blockType === BlockType.ARROW) {
    return makePixelIcon(size, (ctx, p, r) => {
      // Tip
      p(13, 2, '#334155'); p(14, 1, '#475569'); p(12, 3, '#94a3b8'); p(13, 3, '#e2e8f0');
      // Shaft
      for (let i = 0; i < 8; i++) {
        p(11 - i, 4 + i, '#78350f');
      }
      // Fletching feathers
      p(3, 12, '#f8fafc'); p(2, 13, '#cbd5e1'); p(4, 13, '#94a3b8'); p(2, 14, '#94a3b8');
    });
  }

  // ── 5. SHIELDS ──────────────────────────────────────────
  if (blockType === BlockType.WOODEN_SHIELD || blockType === BlockType.IRON_SHIELD) {
    const isIron = blockType === BlockType.IRON_SHIELD;
    return makePixelIcon(size, (ctx, p, r) => {
      // Rim
      r(3, 1, 10, 1, isIron ? '#334155' : '#451a03');
      r(2, 2, 12, 8, isIron ? '#475569' : '#5c2207');
      r(3, 10, 10, 2, isIron ? '#475569' : '#5c2207');
      r(4, 12, 8, 2, isIron ? '#475569' : '#5c2207');
      r(6, 14, 4, 1, isIron ? '#334155' : '#451a03');
      // Inner body
      r(4, 3, 8, 6, isIron ? '#cbd5e1' : '#b45309');
      r(5, 9, 6, 2, isIron ? '#cbd5e1' : '#b45309');
      r(6, 11, 4, 2, isIron ? '#cbd5e1' : '#b45309');
      // Highlight & Boss
      r(7, 5, 2, 2, isIron ? '#ffffff' : '#f59e0b');
      p(4, 3, isIron ? '#f8fafc' : '#d97706');
    });
  }

  // ── 6. ARMORS (DIAMOND & IRON) ──────────────────────────
  if (blockType === BlockType.DIAMOND_HELMET || blockType === BlockType.IRON_HELMET) {
    const isDia = blockType === BlockType.DIAMOND_HELMET;
    const hi = isDia ? '#e0f2fe' : '#ffffff';
    const mid = isDia ? '#22d3ee' : '#cbd5e1';
    const dark = isDia ? '#0891b2' : '#64748b';
    const out = isDia ? '#083344' : '#1e293b';

    return makePixelIcon(size, (ctx, p, r) => {
      r(4, 3, 8, 6, mid);
      r(5, 2, 6, 1, hi);
      r(3, 5, 10, 6, mid);
      r(6, 7, 4, 4, '#0f172a'); // Visor opening
      r(4, 4, 2, 2, hi); // Highlight
      r(3, 10, 3, 3, dark); r(10, 10, 3, 3, dark); // Cheeks
      ctx.strokeStyle = out; ctx.strokeRect(3.5, 2.5, 9, 10);
    });
  }

  if (blockType === BlockType.DIAMOND_CHESTPLATE || blockType === BlockType.IRON_CHESTPLATE) {
    const isDia = blockType === BlockType.DIAMOND_CHESTPLATE;
    const hi = isDia ? '#e0f2fe' : '#ffffff';
    const mid = isDia ? '#22d3ee' : '#cbd5e1';
    const dark = isDia ? '#0891b2' : '#64748b';

    return makePixelIcon(size, (ctx, p, r) => {
      // Shoulders
      r(2, 2, 4, 4, mid); r(10, 2, 4, 4, mid);
      p(3, 2, hi); p(11, 2, hi);
      // Neck cutout
      r(6, 2, 4, 2, '#00000000');
      // Torso & Abdomen
      r(4, 4, 8, 8, mid);
      r(5, 5, 2, 2, hi);
      r(4, 12, 8, 2, dark);
      // Arms
      r(1, 5, 3, 5, dark); r(12, 5, 3, 5, dark);
    });
  }

  if (blockType === BlockType.DIAMOND_LEGGINGS || blockType === BlockType.IRON_LEGGINGS) {
    const isDia = blockType === BlockType.DIAMOND_LEGGINGS;
    const hi = isDia ? '#e0f2fe' : '#ffffff';
    const mid = isDia ? '#22d3ee' : '#cbd5e1';
    const dark = isDia ? '#0891b2' : '#64748b';

    return makePixelIcon(size, (ctx, p, r) => {
      // Belt
      r(3, 3, 10, 3, mid);
      p(4, 3, hi);
      // Legs
      r(3, 6, 4, 8, mid);
      r(9, 6, 4, 8, mid);
      r(3, 12, 4, 2, dark);
      r(9, 12, 4, 2, dark);
    });
  }

  if (blockType === BlockType.DIAMOND_BOOTS || blockType === BlockType.IRON_BOOTS) {
    const isDia = blockType === BlockType.DIAMOND_BOOTS;
    const hi = isDia ? '#e0f2fe' : '#ffffff';
    const mid = isDia ? '#22d3ee' : '#cbd5e1';
    const dark = isDia ? '#0891b2' : '#64748b';

    return makePixelIcon(size, (ctx, p, r) => {
      // Left boot
      r(2, 6, 4, 5, mid); r(1, 11, 5, 3, mid); p(2, 6, hi); r(1, 13, 5, 1, dark);
      // Right boot
      r(10, 6, 4, 5, mid); r(10, 11, 5, 3, mid); p(11, 6, hi); r(10, 13, 5, 1, dark);
    });
  }

  // ── 7. MINERALS, INGOTS & DUST ──────────────────────────
  if (blockType === BlockType.DIAMOND) {
    return makePixelIcon(size, (ctx, p, r) => {
      r(5, 3, 6, 1, '#e0f2fe');
      r(3, 4, 10, 2, '#67e8f9');
      r(2, 6, 12, 3, '#22d3ee');
      r(3, 9, 10, 2, '#06b6d4');
      r(5, 11, 6, 2, '#0891b2');
      r(7, 13, 2, 1, '#083344');
      // Sparkle
      p(6, 5, '#ffffff'); p(7, 5, '#ffffff'); p(6, 6, '#ffffff');
    });
  }

  if (blockType === BlockType.IRON_INGOT) {
    return makePixelIcon(size, (ctx, p, r) => {
      // Ingot bar shape
      r(4, 5, 8, 1, '#ffffff');
      r(3, 6, 10, 4, '#e2e8f0');
      r(2, 10, 11, 2, '#94a3b8');
      r(3, 12, 10, 1, '#475569');
      p(4, 7, '#ffffff'); p(5, 7, '#ffffff');
    });
  }

  if (blockType === BlockType.FLINT) {
    return makePixelIcon(size, (ctx, p, r) => {
      r(7, 3, 2, 2, '#64748b');
      r(5, 5, 6, 4, '#334155');
      r(4, 9, 8, 3, '#1e293b');
      r(6, 12, 4, 2, '#0f172a');
      p(6, 5, '#94a3b8'); p(7, 6, '#e2e8f0');
    });
  }

  if (blockType === BlockType.QUARTZ) {
    return makePixelIcon(size, (ctx, p, r) => {
      // Crystal shard
      r(7, 2, 2, 2, '#ffffff');
      r(6, 4, 4, 3, '#f8fafc');
      r(5, 7, 6, 4, '#e2e8f0');
      r(6, 11, 4, 3, '#cbd5e1');
      r(7, 14, 2, 1, '#94a3b8');
      p(7, 4, '#ffffff'); p(8, 7, '#ffffff');
    });
  }

  if (blockType === BlockType.REDSTONE_DUST) {
    return makePixelIcon(size, (ctx, p, r) => {
      r(6, 5, 4, 6, '#ef4444');
      r(4, 7, 8, 4, '#dc2626');
      r(3, 9, 10, 3, '#991b1b');
      p(7, 6, '#fca5a5'); p(8, 6, '#ffffff');
      p(4, 11, '#ef4444'); p(11, 11, '#ef4444');
    });
  }

  // ── 8. FOODS & CONSUMABLES ──────────────────────────────
  if (blockType === BlockType.GOLDEN_APPLE) {
    return makePixelIcon(size, (ctx, p, r) => {
      // Stem & Leaf
      p(8, 2, '#78350f'); p(7, 1, '#78350f'); p(9, 2, '#16a34a'); p(10, 1, '#22c55e');
      // Apple Body
      r(5, 3, 6, 1, '#fef08a');
      r(3, 4, 10, 2, '#facc15');
      r(2, 6, 12, 5, '#eab308');
      r(3, 11, 10, 2, '#ca8a04');
      r(5, 13, 6, 1, '#a16207');
      // Shine
      p(4, 5, '#ffffff'); p(5, 5, '#ffffff'); p(4, 6, '#ffffff');
    });
  }

  if (blockType === BlockType.BREAD) {
    return makePixelIcon(size, (ctx, p, r) => {
      // Baguette loaf
      r(4, 6, 8, 1, '#fef08a');
      r(3, 7, 10, 3, '#d97706');
      r(2, 10, 11, 2, '#b45309');
      r(4, 12, 8, 1, '#78350f');
      // Score marks
      p(5, 7, '#fef08a'); p(8, 7, '#fef08a'); p(11, 7, '#fef08a');
    });
  }

  if (blockType === BlockType.WHEAT) {
    return makePixelIcon(size, (ctx, p, r) => {
      // Golden sheaf
      p(8, 2, '#fef08a'); p(7, 3, '#facc15'); p(9, 3, '#facc15');
      r(6, 4, 4, 3, '#eab308');
      r(5, 7, 6, 3, '#ca8a04');
      r(7, 10, 2, 2, '#78350f'); // Tie band
      r(6, 12, 4, 3, '#eab308');
    });
  }

  if (blockType === BlockType.WHEAT_SEEDS) {
    return makePixelIcon(size, (ctx, p, r) => {
      r(4, 4, 2, 2, '#ca8a04'); p(4, 4, '#fef08a');
      r(10, 5, 2, 2, '#ca8a04'); p(10, 5, '#fef08a');
      r(6, 9, 2, 2, '#ca8a04'); p(6, 9, '#fef08a');
      r(11, 11, 2, 2, '#ca8a04'); p(11, 11, '#fef08a');
    });
  }

  if (blockType === BlockType.PORKCHOP || blockType === BlockType.MUTTON) {
    return makePixelIcon(size, (ctx, p, r) => {
      // Raw meat
      r(4, 5, 7, 2, '#fda4af');
      r(3, 7, 9, 4, '#f43f5e');
      r(5, 11, 6, 2, '#be123c');
      // Bone
      r(10, 4, 2, 2, '#ffffff'); p(11, 5, '#cbd5e1');
    });
  }

  if (blockType === BlockType.COOKED_PORKCHOP || blockType === BlockType.COOKED_MUTTON) {
    return makePixelIcon(size, (ctx, p, r) => {
      // Cooked meat
      r(4, 5, 7, 2, '#b45309');
      r(3, 7, 9, 4, '#9a3412');
      r(5, 11, 6, 2, '#7c2d12');
      // Sear grill marks
      p(5, 8, '#451a03'); p(8, 8, '#451a03');
    });
  }

  if (blockType === BlockType.ROTTEN_FLESH) {
    return makePixelIcon(size, (ctx, p, r) => {
      r(4, 5, 8, 3, '#65a30d');
      r(3, 8, 9, 4, '#4d7c0f');
      r(5, 12, 6, 2, '#365314');
      p(5, 7, '#84cc16'); p(9, 9, '#15803d');
    });
  }

  if (blockType === BlockType.EXPERIENCE_BOTTLE) {
    return makePixelIcon(size, (ctx, p, r) => {
      // Cork & Neck
      r(7, 2, 2, 1, '#78350f');
      r(6, 3, 4, 2, '#bae6fd');
      // Body
      r(4, 5, 8, 3, '#7dd3fc');
      r(3, 8, 10, 5, '#22c55e');
      r(4, 13, 8, 1, '#15803d');
      // Glowing liquid bubbles
      p(6, 9, '#86efac'); p(9, 10, '#86efac'); p(7, 11, '#ffffff');
    });
  }

  // ── 9. DROPS & CRAFTING MATERIALS ───────────────────────
  if (blockType === BlockType.BONE) {
    return makePixelIcon(size, (ctx, p, r) => {
      // Diagonal Bone
      r(12, 2, 2, 2, '#ffffff'); p(13, 1, '#cbd5e1'); p(14, 2, '#cbd5e1');
      for (let i = 0; i < 7; i++) {
        p(11 - i, 4 + i, '#f8fafc');
        p(10 - i, 5 + i, '#cbd5e1');
      }
      r(2, 12, 2, 2, '#ffffff'); p(1, 13, '#94a3b8'); p(2, 14, '#94a3b8');
    });
  }

  if (blockType === BlockType.GUNPOWDER) {
    return makePixelIcon(size, (ctx, p, r) => {
      r(6, 6, 4, 3, '#64748b');
      r(4, 9, 8, 3, '#475569');
      r(3, 12, 10, 2, '#334155');
      p(5, 8, '#94a3b8'); p(9, 10, '#1e293b');
    });
  }

  if (blockType === BlockType.STRING) {
    return makePixelIcon(size, (ctx, p, r) => {
      // Spider web spool
      for (let i = 0; i < 9; i++) {
        p(3 + i, 3 + i, '#ffffff');
        p(12 - i, 3 + i, '#ffffff');
      }
      r(6, 6, 4, 4, '#cbd5e1');
    });
  }

  if (blockType === BlockType.SPIDER_EYE) {
    return makePixelIcon(size, (ctx, p, r) => {
      r(5, 4, 6, 2, '#ef4444');
      r(4, 6, 8, 4, '#b91c1c');
      r(5, 10, 6, 2, '#7f1d1d');
      // Pupil & glare
      p(7, 7, '#450a0a'); p(6, 5, '#ffffff');
    });
  }

  if (blockType === BlockType.BOOK) {
    return makePixelIcon(size, (ctx, p, r) => {
      r(3, 3, 9, 10, '#831843');
      r(4, 4, 8, 8, '#fef08a');
      r(3, 3, 2, 10, '#4c0519'); // Spine
      r(7, 3, 1, 11, '#facc15'); // Gold ribbon
      p(4, 4, '#facc15'); p(11, 4, '#facc15');
    });
  }

  if (blockType === BlockType.FLINT_AND_STEEL) {
    return makePixelIcon(size, (ctx, p, r) => {
      // Steel loop
      r(4, 4, 4, 8, '#cbd5e1');
      r(5, 5, 2, 6, '#00000000');
      // Flint piece
      r(9, 8, 4, 4, '#1e293b');
      // Spark
      p(8, 7, '#f97316'); p(8, 6, '#facc15');
    });
  }

  if (blockType === BlockType.STICK) {
    return makePixelIcon(size, (ctx, p, r) => {
      for (let i = 0; i < 11; i++) {
        p(13 - i, 2 + i, '#78350f');
        p(12 - i, 3 + i, '#451a03');
      }
    });
  }

  // ── 10. REDSTONE, DOORS, BOATS & SPECIAL ITEMS ──────────
  if (blockType === BlockType.REDSTONE_TORCH) {
    return makePixelIcon(size, (ctx, p, r) => {
      r(7, 7, 2, 7, '#78350f');
      r(6, 3, 4, 4, '#ef4444');
      p(7, 4, '#ffffff');
    });
  }

  if (blockType === BlockType.LEVER) {
    return makePixelIcon(size, (ctx, p, r) => {
      r(4, 10, 8, 4, '#64748b');
      for (let i = 0; i < 6; i++) {
        p(9 - i, 4 + i, '#78350f');
      }
      p(10, 3, '#b45309');
    });
  }

  if (blockType === BlockType.PRESSURE_PLATE) {
    return makePixelIcon(size, (ctx, p, r) => {
      r(2, 9, 12, 4, '#64748b');
      r(3, 8, 10, 1, '#94a3b8');
    });
  }

  if (blockType === BlockType.WOODEN_DOOR_BOTTOM || blockType === BlockType.WOODEN_DOOR_TOP) {
    return makePixelIcon(size, (ctx, p, r) => {
      r(4, 1, 8, 14, '#b45309');
      ctx.strokeStyle = '#451a03'; ctx.strokeRect(4.5, 1.5, 7, 13);
      r(6, 3, 4, 4, '#bae6fd'); // Window
      p(10, 8, '#0f172a'); // Knob
    });
  }

  if (blockType === BlockType.IRON_DOOR_BOTTOM || blockType === BlockType.IRON_DOOR_TOP) {
    return makePixelIcon(size, (ctx, p, r) => {
      r(4, 1, 8, 14, '#cbd5e1');
      ctx.strokeStyle = '#334155'; ctx.strokeRect(4.5, 1.5, 7, 13);
      r(6, 4, 4, 2, '#1e293b'); // Slits
      r(6, 7, 4, 2, '#1e293b');
      p(10, 9, '#334155');
    });
  }

  if (blockType === BlockType.BOAT) {
    return makePixelIcon(size, (ctx, p, r) => {
      r(2, 7, 12, 5, '#78350f');
      r(3, 8, 10, 3, '#b45309');
      // Oars
      p(5, 5, '#451a03'); p(4, 6, '#451a03'); p(3, 10, '#451a03');
      p(10, 5, '#451a03'); p(11, 6, '#451a03'); p(12, 10, '#451a03');
    });
  }

  if (blockType === BlockType.WATER) {
    return makePixelIcon(size, (ctx, p, r) => {
      // Iron Bucket filled with water
      r(4, 5, 8, 7, '#94a3b8');
      r(5, 5, 6, 3, '#38bdf8');
      r(6, 6, 4, 2, '#0284c7');
    });
  }

  if (blockType === BlockType.LAVA) {
    return makePixelIcon(size, (ctx, p, r) => {
      // Iron Bucket filled with lava
      r(4, 5, 8, 7, '#94a3b8');
      r(5, 5, 6, 3, '#f97316');
      r(6, 6, 4, 2, '#facc15');
    });
  }

  if (
    blockType === BlockType.FLOWER_RED ||
    blockType === BlockType.FLOWER_YELLOW ||
    blockType === BlockType.TORCH ||
    blockType === BlockType.WHEAT_STAGE_1 ||
    blockType === BlockType.WHEAT_STAGE_2 ||
    blockType === BlockType.WHEAT_STAGE_3
  ) {
    const atlas = getAtlas();
    const bt = BlockTextures[blockType];
    if (bt) {
      const img = atlas[bt.top];
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      const pad = size * 0.08;
      ctx.drawImage(img, pad, pad, size - pad * 2, size - pad * 2);
      return canvas;
    }
  }

  // ── 11. STANDARD 3D ISOMETRIC VOXEL BLOCKS ───────────────
  const atlas = getAtlas();
  const bt = BlockTextures[blockType];
  if (!bt) return null;

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const imgTop = atlas[bt.top];
  const imgSide = atlas[bt.side];

  const u = size / 4;

  const topQuad = [
    [size / 2, 0], [size / 2 + u, u / 2], [size / 2, u], [size / 2 - u, u / 2],
  ];
  const leftQuad = [
    [size / 2 - u, u / 2], [size / 2, u], [size / 2, 2 * u], [size / 2 - u, (3 * u) / 2],
  ];
  const rightQuad = [
    [size / 2, u], [size / 2 + u, u / 2], [size / 2 + u, (3 * u) / 2], [size / 2, 2 * u],
  ];

  drawFace(ctx, rightQuad, imgSide, 0.82);
  drawFace(ctx, leftQuad, imgSide, 0.68);
  drawFace(ctx, topQuad, imgTop, 1.05);

  ctx.strokeStyle = 'rgba(0,0,0,0.55)';
  ctx.lineWidth = 1.5;
  [topQuad, leftQuad, rightQuad].forEach((quad) => {
    ctx.beginPath();
    ctx.moveTo(quad[0][0], quad[0][1]);
    for (let i = 1; i < quad.length; i++) ctx.lineTo(quad[i][0], quad[i][1]);
    ctx.closePath();
    ctx.stroke();
  });

  return canvas;
}
