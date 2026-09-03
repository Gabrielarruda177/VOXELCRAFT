/**
 * Texture Generator — procedurally draws 16×16 pixel-art block textures
 * on HTML Canvas elements, mimicking Minecraft's classic look with crisp colors.
 */

export const TEX_SIZE = 16;

/**
 * Simple seeded PRNG for deterministic texture patterns.
 */
function seededRandom(seed) {
  let s = seed | 0;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

/**
 * Create a canvas and run a draw function on it.
 * @param {Function} drawFn - (ctx, size) => void
 * @returns {HTMLCanvasElement}
 */
function makeCanvas(drawFn) {
  const canvas = document.createElement('canvas');
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE;
  const ctx = canvas.getContext('2d');
  drawFn(ctx, TEX_SIZE);
  return canvas;
}

/**
 * Fill a canvas with a base color, then scatter random noise pixels.
 */
function fillWithNoise(ctx, size, baseColor, noiseColors, density, seed) {
  const rng = seededRandom(seed);
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (rng() < density) {
        const colorIdx = Math.floor(rng() * noiseColors.length);
        ctx.fillStyle = noiseColors[colorIdx];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}

// ── Individual texture generators ─────────────────────────

function drawGrassTop(ctx, size) {
  fillWithNoise(ctx, size, '#5ba638', ['#4f9430', '#6bc043', '#458528', '#75cc4a'], 0.4, 101);
  const rng = seededRandom(202);
  for (let i = 0; i < 2; i++) {
    const x = Math.floor(rng() * (size - 2)) + 1;
    const y = Math.floor(rng() * (size - 2)) + 1;
    ctx.fillStyle = '#f6e05e';
    ctx.fillRect(x, y, 1, 1);
  }
}

function drawGrassSide(ctx, size) {
  fillWithNoise(ctx, size, '#86652d', ['#775924', '#957134', '#664c1e', '#a37d3a'], 0.35, 301);

  const rng = seededRandom(302);
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < size; x++) {
      if (y < 2) {
        ctx.fillStyle = rng() > 0.3 ? '#5ba638' : '#4f9430';
        ctx.fillRect(x, y, 1, 1);
      } else if (y < 3) {
        if (rng() > 0.35) {
          ctx.fillStyle = rng() > 0.5 ? '#5ba638' : '#4f9430';
          ctx.fillRect(x, y, 1, 1);
        }
      } else if (y < 4) {
        if (rng() > 0.65) {
          ctx.fillStyle = '#458528';
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  }
}

function drawDirt(ctx, size) {
  fillWithNoise(ctx, size, '#86652d', ['#775924', '#957134', '#664c1e', '#a37d3a', '#584117'], 0.4, 401);
  const rng = seededRandom(402);
  for (let i = 0; i < 3; i++) {
    const x = Math.floor(rng() * (size - 1));
    const y = Math.floor(rng() * (size - 1));
    ctx.fillStyle = '#584117';
    ctx.fillRect(x, y, 2, 1);
  }
}

function drawStone(ctx, size) {
  fillWithNoise(ctx, size, '#828282', ['#737373', '#919191', '#656565', '#9e9e9e', '#595959'], 0.45, 501);
  const rng = seededRandom(502);
  for (let i = 0; i < 4; i++) {
    const x = Math.floor(rng() * (size - 3));
    const y = Math.floor(rng() * size);
    ctx.fillStyle = '#505050';
    ctx.fillRect(x, y, 2 + Math.floor(rng() * 2), 1);
  }
}

function drawSand(ctx, size) {
  fillWithNoise(ctx, size, '#e5d38a', ['#dac67c', '#eedd98', '#cfbc6f', '#f5e6a4', '#c5b161'], 0.45, 601);
}

function drawSnow(ctx, size) {
  fillWithNoise(ctx, size, '#f5f7fa', ['#e9ecf2', '#ffffff', '#dfe3ec', '#edf0f7'], 0.35, 701);
  const rng = seededRandom(702);
  for (let i = 0; i < 3; i++) {
    const x = Math.floor(rng() * (size - 1));
    const y = Math.floor(rng() * size);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(x, y, 2, 1);
  }
}

function drawSnowSide(ctx, size) {
  fillWithNoise(ctx, size, '#86652d', ['#775924', '#957134', '#664c1e'], 0.35, 1401);
  const rng = seededRandom(1402);
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < size; x++) {
      if (y < 2) {
        ctx.fillStyle = '#f5f7fa';
        ctx.fillRect(x, y, 1, 1);
      } else if (y < 3) {
        if (rng() > 0.3) {
          ctx.fillStyle = '#e9ecf2';
          ctx.fillRect(x, y, 1, 1);
        }
      } else {
        if (rng() > 0.7) {
          ctx.fillStyle = '#dfe3ec';
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  }
}

function drawStoneBricks(ctx, size) {
  ctx.fillStyle = '#888888';
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = '#555555';
  ctx.fillRect(0, 3, size, 1);
  ctx.fillRect(0, 7, size, 1);
  ctx.fillRect(0, 11, size, 1);
  ctx.fillRect(0, 15, size, 1);

  for (let row = 0; row < 4; row++) {
    const offset = row % 2 === 0 ? 0 : 8;
    const yStart = row * 4;
    ctx.fillRect(offset, yStart, 1, 4);
    ctx.fillRect(offset + 8, yStart, 1, 4);
  }

  const rng = seededRandom(801);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (rng() < 0.2) {
        ctx.fillStyle = rng() > 0.5 ? '#9e9e9e' : '#737373';
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}

function drawWoodLog(ctx, size) {
  fillWithNoise(ctx, size, '#6b4524', ['#5a391d', '#7c512c', '#4e3016', '#8d5c32'], 0.35, 901);
  for (let x = 0; x < size; x += 3) {
    ctx.fillStyle = '#472c14';
    ctx.fillRect(x, 0, 1, size);
  }
}

function drawWoodLogTop(ctx, size) {
  ctx.fillStyle = '#c5a368';
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = '#6b4524';
  ctx.fillRect(0, 0, size, 2);
  ctx.fillRect(0, 14, size, 2);
  ctx.fillRect(0, 0, 2, size);
  ctx.fillRect(14, 0, 2, size);

  const cx = 7.5, cy = 7.5;
  const ringRadii = [2, 4, 6];
  ctx.fillStyle = '#9e804f';
  for (const r of ringRadii) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dist = Math.hypot(x - cx, y - cy);
        if (Math.abs(dist - r) < 0.65) {
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  }
  ctx.fillStyle = '#7a6036';
  ctx.fillRect(7, 7, 2, 2);
}

function drawLeaves(ctx, size) {
  fillWithNoise(ctx, size, '#3c8524', ['#2f6d1b', '#4fa631', '#245614', '#5dbd3c', '#1b400e'], 0.5, 1001);
  const rng = seededRandom(1002);
  for (let i = 0; i < 5; i++) {
    const x = Math.floor(rng() * (size - 1));
    const y = Math.floor(rng() * (size - 1));
    ctx.fillStyle = '#1b400e';
    ctx.fillRect(x, y, 1, 1);
  }
}

function drawCoalOre(ctx, size) {
  drawStone(ctx, size);
  const rng = seededRandom(1101);
  for (let i = 0; i < 4; i++) {
    const cx = 2 + Math.floor(rng() * (size - 5));
    const cy = 2 + Math.floor(rng() * (size - 5));
    ctx.fillStyle = '#222222';
    ctx.fillRect(cx, cy, 2, 2);
    ctx.fillStyle = '#111111';
    ctx.fillRect(cx + 1, cy + 1, 1, 1);
  }
}

function drawIronOre(ctx, size) {
  drawStone(ctx, size);
  const rng = seededRandom(1201);
  for (let i = 0; i < 4; i++) {
    const cx = 2 + Math.floor(rng() * (size - 5));
    const cy = 2 + Math.floor(rng() * (size - 5));
    ctx.fillStyle = '#d4a373';
    ctx.fillRect(cx, cy, 2, 2);
    ctx.fillStyle = '#faedcd';
    ctx.fillRect(cx, cy, 1, 1);
  }
}

function drawWater(ctx, size) {
  fillWithNoise(ctx, size, '#2c75d8', ['#2565bf', '#3b86e8', '#1e52a0', '#4a95f5'], 0.4, 1301);
  const rng = seededRandom(1302);
  for (let i = 0; i < 3; i++) {
    const x = Math.floor(rng() * (size - 3));
    const y = Math.floor(rng() * size);
    ctx.fillStyle = '#8bc3f7';
    ctx.fillRect(x, y, 3, 1);
  }
}

function drawCactusTop(ctx, size) {
  fillWithNoise(ctx, size, '#15803d', ['#166534', '#14532d', '#22c55e'], 0.4, 1501);
  ctx.fillStyle = '#14532d';
  ctx.fillRect(7, 7, 2, 2);
}

function drawCactusSide(ctx, size) {
  fillWithNoise(ctx, size, '#15803d', ['#166534', '#15803d', '#22c55e', '#14532d'], 0.35, 1601);
  const rng = seededRandom(1602);
  // Vertical green ribs
  for (let x = 0; x < size; x += 4) {
    ctx.fillStyle = '#14532d';
    ctx.fillRect(x, 0, 1, size);
  }
  // Spikes
  for (let i = 0; i < 6; i++) {
    const x = Math.floor(rng() * (size - 2)) + 1;
    const y = Math.floor(rng() * (size - 2)) + 1;
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(x, y, 1, 1);
  }
}

function drawWoodPlanks(ctx, size) {
  fillWithNoise(ctx, size, '#b45309', ['#92400e', '#78350f', '#d97706', '#a16207'], 0.35, 1701);
  // Plank divider horizontal lines
  ctx.fillStyle = '#451a03';
  ctx.fillRect(0, 3, size, 1);
  ctx.fillRect(0, 7, size, 1);
  ctx.fillRect(0, 11, size, 1);
  ctx.fillRect(0, 15, size, 1);
  // Vertical joints
  ctx.fillRect(5, 0, 1, 3);
  ctx.fillRect(11, 4, 1, 3);
  ctx.fillRect(4, 8, 1, 3);
  ctx.fillRect(12, 12, 1, 3);
}

function drawCobblestone(ctx, size) {
  fillWithNoise(ctx, size, '#64748b', ['#475569', '#334155', '#94a3b8', '#1e293b'], 0.45, 1801);
  const rng = seededRandom(1802);
  ctx.fillStyle = '#1e293b';
  for (let i = 0; i < 5; i++) {
    const x = Math.floor(rng() * (size - 4));
    const y = Math.floor(rng() * (size - 4));
    ctx.fillRect(x, y, 3, 2);
  }
}

function drawFlowerRed(ctx, size) {
  ctx.clearRect(0, 0, size, size);
  // Green stem
  ctx.fillStyle = '#15803d';
  ctx.fillRect(7, 7, 2, 9);
  ctx.fillRect(5, 11, 2, 2);
  ctx.fillRect(9, 9, 2, 2);
  // Red petals
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(6, 3, 4, 4);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(7, 2, 2, 1);
  ctx.fillRect(5, 4, 1, 2);
  ctx.fillRect(10, 4, 1, 2);
  // Center
  ctx.fillStyle = '#450a0a';
  ctx.fillRect(7, 4, 2, 2);
}

function drawFlowerYellow(ctx, size) {
  ctx.clearRect(0, 0, size, size);
  // Green stem
  ctx.fillStyle = '#15803d';
  ctx.fillRect(7, 6, 2, 10);
  ctx.fillRect(5, 10, 2, 2);
  ctx.fillRect(9, 12, 2, 2);
  // Yellow petals
  ctx.fillStyle = '#eab308';
  ctx.fillRect(6, 2, 4, 4);
  ctx.fillStyle = '#facc15';
  ctx.fillRect(7, 1, 2, 1);
  ctx.fillRect(5, 3, 1, 2);
  ctx.fillRect(10, 3, 1, 2);
  // Center
  ctx.fillStyle = '#ca8a04';
  ctx.fillRect(7, 3, 2, 2);
}

function drawCraftingTableTop(ctx, size) {
  drawWoodPlanks(ctx, size);
  // Engraved 3x3 grid outline
  ctx.strokeStyle = '#451a03';
  ctx.lineWidth = 1;
  ctx.strokeRect(2.5, 2.5, 11, 11);
  ctx.beginPath();
  ctx.moveTo(6.5, 2.5); ctx.lineTo(6.5, 13.5);
  ctx.moveTo(10.5, 2.5); ctx.lineTo(10.5, 13.5);
  ctx.moveTo(2.5, 6.5); ctx.lineTo(13.5, 6.5);
  ctx.moveTo(2.5, 10.5); ctx.lineTo(13.5, 10.5);
  ctx.stroke();

  // Subtle highlight corners
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(3, 3, 1, 1);
  ctx.fillRect(12, 3, 1, 1);
  ctx.fillRect(3, 12, 1, 1);
  ctx.fillRect(12, 12, 1, 1);
}

function drawCraftingTableSide(ctx, size) {
  drawWoodPlanks(ctx, size);
  // Hanging tool motifs (Saw and Hammer)
  ctx.fillStyle = '#1e293b'; // Iron tool
  ctx.fillRect(3, 4, 3, 8);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(3, 4, 2, 6);
  ctx.fillStyle = '#78350f'; // Handle
  ctx.fillRect(4, 9, 1, 3);

  // Shears / pliers
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(10, 5, 2, 2);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(9, 7, 1, 4);
  ctx.fillRect(12, 7, 1, 4);
}

function drawTorch(ctx, size) {
  ctx.clearRect(0, 0, size, size);
  // Wooden stick handle
  ctx.fillStyle = '#78350f';
  ctx.fillRect(7, 6, 2, 10);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(7, 6, 1, 10);

  // Glowing flame head
  ctx.fillStyle = '#f97316';
  ctx.fillRect(6, 2, 4, 4);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(7, 3, 2, 2);
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(7, 1, 2, 1);
}

function drawFurnaceSide(ctx, size) {
  drawCobblestone(ctx, size);
  // Darker stone reinforced borders
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  ctx.strokeRect(1.5, 1.5, 13, 13);
}

function drawFurnaceFront(ctx, size) {
  drawCobblestone(ctx, size);
  // Dark furnace opening
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(4, 7, 8, 7);
  // Metal grill
  ctx.fillStyle = '#334155';
  ctx.fillRect(5, 10, 6, 1);
  ctx.fillRect(5, 12, 6, 1);
}

function drawFurnaceFrontLit(ctx, size) {
  drawCobblestone(ctx, size);
  // Glowing fire inside opening
  ctx.fillStyle = '#f97316';
  ctx.fillRect(4, 7, 8, 7);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(5, 9, 6, 4);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(6, 11, 4, 2);
}

function drawChestTop(ctx, size) {
  drawWoodPlanks(ctx, size);
  ctx.strokeStyle = '#451a03';
  ctx.lineWidth = 1;
  ctx.strokeRect(1.5, 1.5, 13, 13);
}

function drawChestSide(ctx, size) {
  drawWoodPlanks(ctx, size);
  ctx.strokeStyle = '#451a03';
  ctx.lineWidth = 1;
  ctx.strokeRect(1.5, 1.5, 13, 13);
  // Iron lock latch
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(7, 6, 2, 4);
  ctx.fillStyle = '#475569';
  ctx.fillRect(7, 8, 2, 1);
}

function drawFarmlandTop(ctx, size) {
  fillWithNoise(ctx, size, '#3b1d0c', ['#2e1507', '#45220e', '#230f04', '#4d2812'], 0.4, 2101);
  // Furrow lines
  ctx.fillStyle = '#1c0b03';
  ctx.fillRect(0, 3, size, 1);
  ctx.fillRect(0, 7, size, 1);
  ctx.fillRect(0, 11, size, 1);
  ctx.fillRect(0, 15, size, 1);
}

function drawFarmlandSide(ctx, size) {
  fillWithNoise(ctx, size, '#86652d', ['#775924', '#957134', '#664c1e'], 0.35, 2201);
  // Dark rich top layer
  ctx.fillStyle = '#3b1d0c';
  ctx.fillRect(0, 0, size, 3);
  ctx.fillStyle = '#230f04';
  ctx.fillRect(0, 2, size, 1);
}

function drawWheatStage1(ctx, size) {
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = '#65a30d';
  for (let x = 2; x < size; x += 3) {
    ctx.fillRect(x, 12, 1, 4);
    ctx.fillRect(x - 1, 11, 1, 2);
  }
}

function drawWheatStage2(ctx, size) {
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = '#84cc16';
  for (let x = 1; x < size; x += 3) {
    ctx.fillRect(x, 6, 2, 10);
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(x, 6, 2, 3);
    ctx.fillStyle = '#84cc16';
  }
}

function drawWheatStage3(ctx, size) {
  ctx.clearRect(0, 0, size, size);
  for (let x = 1; x < size; x += 2) {
    // Golden wheat stalk
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(x, 4, 1, 12);
    // Yellow wheat grains head
    ctx.fillStyle = '#eab308';
    ctx.fillRect(x - (x > 1 ? 1 : 0), 1, 2, 5);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(x, 2, 1, 3);
  }
}

function drawTntTop(ctx, size) {
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(0, 0, size, size);
  // Center dark circle
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(8, 8, 4, 0, Math.PI * 2);
  ctx.fill();
  // Center fuse
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(7, 7, 2, 2);
}

function drawTntSide(ctx, size) {
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(0, 0, size, size);

  // White center band
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 5, size, 6);

  // Bold black TNT lettering
  ctx.fillStyle = '#0f172a';
  // T
  ctx.fillRect(1, 6, 4, 1);
  ctx.fillRect(2, 7, 2, 3);
  // N
  ctx.fillRect(6, 6, 1, 4);
  ctx.fillRect(7, 7, 1, 2);
  ctx.fillRect(8, 6, 1, 4);
  // T
  ctx.fillRect(10, 6, 4, 1);
  ctx.fillRect(11, 7, 2, 3);
}

function drawTntBottom(ctx, size) {
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(3, 3, 10, 10);
  ctx.fillStyle = '#450a0a';
  ctx.fillRect(7, 7, 2, 2);
}

function drawLava(ctx, size) {
  fillWithNoise(ctx, size, '#ea580c', ['#f97316', '#c2410c', '#facc15', '#b45309', '#7c2d12'], 0.45, 2301);
  const rng = seededRandom(2302);
  for (let i = 0; i < 4; i++) {
    const x = Math.floor(rng() * (size - 3));
    const y = Math.floor(rng() * (size - 2));
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(x, y, 3, 2);
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(x + 1, y, 1, 1);
  }
}

function drawDiamondOre(ctx, size) {
  drawStone(ctx, size);
  const rng = seededRandom(2401);
  for (let i = 0; i < 4; i++) {
    const cx = 2 + Math.floor(rng() * (size - 5));
    const cy = 2 + Math.floor(rng() * (size - 5));
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(cx, cy, 2, 2);
    ctx.fillStyle = '#67e8f9';
    ctx.fillRect(cx, cy, 1, 1);
    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(cx + 1, cy + 1, 1, 1);
  }
}

function drawObsidian(ctx, size) {
  fillWithNoise(ctx, size, '#0f172a', ['#1e1b4b', '#020617', '#312e81', '#4c1d95', '#1e293b'], 0.45, 2501);
  const rng = seededRandom(2502);
  for (let i = 0; i < 5; i++) {
    const x = Math.floor(rng() * (size - 2));
    const y = Math.floor(rng() * (size - 2));
    ctx.fillStyle = '#6366f1';
    ctx.fillRect(x, y, 1, 2);
    ctx.fillStyle = '#a855f7';
    ctx.fillRect(x + 1, y + 1, 1, 1);
  }
}

function drawBedTop(ctx, size) {
  // Red blanket
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(1, 6, size - 2, size - 7);

  // White pillow at the top
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(2, 1, 12, 4);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(2, 4, 12, 1);
}

function drawBedSide(ctx, size) {
  // Red mattress top
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(0, 0, size, 6);
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(0, 5, size, 1);

  // Wood frame & legs
  ctx.fillStyle = '#78350f';
  ctx.fillRect(0, 6, size, 10);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(2, 9, size - 4, 7); // Hollow center under frame
}

function drawWool(ctx, size) {
  fillWithNoise(ctx, size, '#f8fafc', ['#f1f5f9', '#e2e8f0', '#cbd5e1', '#ffffff'], 0.35, 2601);
  const rng = seededRandom(2602);
  for (let i = 0; i < 6; i++) {
    const x = Math.floor(rng() * (size - 1));
    const y = Math.floor(rng() * (size - 1));
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(x, y, 1, 1);
  }
}

function drawGravel(ctx, size) {
  fillWithNoise(ctx, size, '#6b7280', ['#4b5563', '#9ca3af', '#374151', '#d1d5db'], 0.5, 3101);
  const rng = seededRandom(3102);
  for (let i = 0; i < 8; i++) {
    const x = Math.floor(rng() * (size - 1));
    const y = Math.floor(rng() * (size - 1));
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(x, y, 1, 1);
  }
}

function drawNetherrack(ctx, size) {
  fillWithNoise(ctx, size, '#6b1717', ['#450a0a', '#7f1d1d', '#991b1b', '#3b0707'], 0.5, 3201);
  const rng = seededRandom(3202);
  for (let i = 0; i < 6; i++) {
    const x = Math.floor(rng() * (size - 1));
    const y = Math.floor(rng() * (size - 1));
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(x, y, 1, 1);
  }
}

function drawSoulSand(ctx, size) {
  fillWithNoise(ctx, size, '#451a03', ['#381e11', '#2e180c', '#54260f'], 0.4, 3301);
  // Ghostly faint souls in sand
  ctx.fillStyle = '#1c0d06';
  // Face 1
  ctx.fillRect(3, 4, 1, 2);
  ctx.fillRect(5, 4, 1, 2);
  ctx.fillRect(4, 7, 1, 2);
  // Face 2
  ctx.fillRect(10, 8, 1, 2);
  ctx.fillRect(12, 8, 1, 2);
  ctx.fillRect(11, 11, 1, 2);
}

function drawGlowstone(ctx, size) {
  fillWithNoise(ctx, size, '#eab308', ['#ca8a04', '#facc15', '#fef08a', '#a16207'], 0.55, 3401);
  const rng = seededRandom(3402);
  for (let i = 0; i < 10; i++) {
    const x = Math.floor(rng() * (size - 1));
    const y = Math.floor(rng() * (size - 1));
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x, y, 1, 1);
  }
}

function drawNetherQuartzOre(ctx, size) {
  drawNetherrack(ctx, size);
  // White quartz crystalline veins
  const quartzShards = [
    [3, 3], [4, 3], [4, 4], [5, 4], [4, 5],
    [9, 9], [10, 9], [10, 10], [11, 10], [10, 11],
    [11, 3], [12, 3], [12, 4],
    [3, 11], [4, 11], [4, 12],
  ];
  quartzShards.forEach(([x, y]) => {
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(x, y, 1, 1);
  });
  // Shimmer outline
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(3, 2, 1, 1);
  ctx.fillRect(9, 8, 1, 1);
}

function drawQuartzBlock(ctx, size) {
  fillWithNoise(ctx, size, '#f8fafc', ['#f1f5f9', '#ffffff', '#e2e8f0'], 0.25, 3601);
  // Subtle elegant beveled border
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(0, 0, size, 1);
  ctx.fillRect(0, 0, 1, size);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(0, size - 1, size, 1);
  ctx.fillRect(size - 1, 0, 1, size);
}

function drawNetherPortal(ctx, size) {
  fillWithNoise(ctx, size, '#4c1d95', ['#6b21a8', '#7e22ce', '#3b0764', '#9333ea'], 0.5, 3701);
  // Swirling vortex highlights
  ctx.fillStyle = '#c084fc';
  ctx.fillRect(2, 3, 3, 1);
  ctx.fillRect(4, 4, 2, 1);
  ctx.fillRect(8, 7, 4, 1);
  ctx.fillRect(10, 8, 3, 1);
  ctx.fillRect(4, 11, 5, 1);
  ctx.fillRect(1, 12, 3, 1);
  ctx.fillStyle = '#f3e8ff';
  ctx.fillRect(3, 3, 1, 1);
  ctx.fillRect(9, 7, 1, 1);
}

function drawRedstoneOre(ctx, size) {
  drawStone(ctx, size);
  const rng = seededRandom(3801);
  for (let i = 0; i < 5; i++) {
    const cx = 2 + Math.floor(rng() * (size - 5));
    const cy = 2 + Math.floor(rng() * (size - 5));
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(cx, cy, 3, 3);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(cx, cy, 2, 2);
    ctx.fillStyle = '#fca5a5';
    ctx.fillRect(cx + 1, cy + 1, 1, 1);
  }
}

function drawRedstoneWire(ctx, size) {
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(6, 0, 4, size);
  ctx.fillRect(0, 6, size, 4);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(7, 0, 2, size);
  ctx.fillRect(0, 7, size, 2);
  ctx.fillStyle = '#fca5a5';
  ctx.fillRect(7, 7, 2, 2);
}

function drawRedstoneTorch(ctx, size) {
  ctx.clearRect(0, 0, size, size);
  // Stick
  ctx.fillStyle = '#78350f';
  ctx.fillRect(7, 7, 2, 9);
  // Redstone Head
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(6, 2, 4, 5);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(6, 2, 4, 3);
  ctx.fillStyle = '#fca5a5';
  ctx.fillRect(7, 3, 2, 2);
}

function drawLever(ctx, size) {
  drawCobblestone(ctx, size);
  ctx.fillStyle = '#334155';
  ctx.fillRect(5, 5, 6, 6);
  // Angled wood handle
  ctx.fillStyle = '#78350f';
  ctx.fillRect(7, 3, 2, 6);
  ctx.fillStyle = '#d97706';
  ctx.fillRect(7, 2, 2, 2);
}

function drawPressurePlate(ctx, size) {
  drawStone(ctx, size);
  ctx.fillStyle = '#475569';
  ctx.fillRect(2, 2, 12, 12);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(3, 3, 10, 10);
}

function drawWoodenDoorBottom(ctx, size) {
  drawWoodPlanks(ctx, size);
  ctx.fillStyle = '#451a03';
  ctx.strokeRect(1, 1, 14, 14);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(12, 4, 2, 3);
}

function drawWoodenDoorTop(ctx, size) {
  drawWoodPlanks(ctx, size);
  ctx.fillStyle = '#451a03';
  ctx.strokeRect(1, 1, 14, 14);
  // Glass window panes
  ctx.fillStyle = '#bae6fd';
  ctx.fillRect(3, 3, 4, 4);
  ctx.fillRect(9, 3, 4, 4);
  ctx.fillRect(3, 9, 4, 4);
  ctx.fillRect(9, 9, 4, 4);
}

function drawIronDoorBottom(ctx, size) {
  fillWithNoise(ctx, size, '#e2e8f0', ['#cbd5e1', '#f1f5f9', '#94a3b8'], 0.35, 3901);
  ctx.fillStyle = '#334155';
  ctx.strokeRect(1, 1, 14, 14);
  ctx.fillRect(12, 4, 2, 3);
}

function drawIronDoorTop(ctx, size) {
  fillWithNoise(ctx, size, '#e2e8f0', ['#cbd5e1', '#f1f5f9', '#94a3b8'], 0.35, 3902);
  ctx.fillStyle = '#334155';
  ctx.strokeRect(1, 1, 14, 14);
  // Steel slits
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(4, 4, 8, 2);
  ctx.fillRect(4, 8, 8, 2);
}

function drawEnchantingTableTop(ctx, size) {
  drawObsidian(ctx, size);
  // Red cloth diamond
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(3, 3, 10, 10);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(4, 4, 8, 8);
  // Diamond corners
  ctx.fillStyle = '#22d3ee';
  ctx.fillRect(1, 1, 2, 2);
  ctx.fillRect(13, 1, 2, 2);
  ctx.fillRect(1, 13, 2, 2);
  ctx.fillRect(13, 13, 2, 2);
}

function drawEnchantingTableSide(ctx, size) {
  drawObsidian(ctx, size);
  ctx.fillStyle = '#22d3ee';
  ctx.fillRect(0, 0, size, 2);
  ctx.fillStyle = '#06b6d4';
  ctx.fillRect(2, 6, 4, 4);
  ctx.fillRect(10, 6, 4, 4);
}

function drawMossyCobblestone(ctx, size) {
  drawCobblestone(ctx, size);
  const rng = seededRandom(4001);
  for (let i = 0; i < 6; i++) {
    const x = Math.floor(rng() * (size - 3));
    const y = Math.floor(rng() * (size - 3));
    ctx.fillStyle = '#15803d';
    ctx.fillRect(x, y, 3, 3);
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(x + 1, y + 1, 1, 1);
  }
}

function drawMonsterSpawner(ctx, size) {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, size, size);
  // Iron cage grid
  ctx.fillStyle = '#475569';
  ctx.fillRect(0, 0, size, 2);
  ctx.fillRect(0, size - 2, size, 2);
  ctx.fillRect(0, 0, 2, size);
  ctx.fillRect(size - 2, 0, 2, size);
  ctx.fillRect(6, 0, 2, size);
  ctx.fillRect(0, 6, size, 2);
  // Glowing flame interior
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(7, 7, 2, 2);
}

function drawBookshelfSide(ctx, size) {
  drawWoodPlanks(ctx, size);
  // Shelf row 1
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(2, 2, 12, 5);
  ctx.fillStyle = '#dc2626'; ctx.fillRect(3, 2, 2, 5);
  ctx.fillStyle = '#2563eb'; ctx.fillRect(5, 2, 3, 5);
  ctx.fillStyle = '#16a34a'; ctx.fillRect(8, 2, 2, 5);
  ctx.fillStyle = '#d97706'; ctx.fillRect(10, 2, 3, 5);

  // Shelf row 2
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(2, 9, 12, 5);
  ctx.fillStyle = '#9333ea'; ctx.fillRect(3, 9, 3, 5);
  ctx.fillStyle = '#ca8a04'; ctx.fillRect(6, 9, 2, 5);
  ctx.fillStyle = '#0891b2'; ctx.fillRect(8, 9, 3, 5);
  ctx.fillStyle = '#e11d48'; ctx.fillRect(11, 9, 2, 5);
}

// ── Authentic Minecraft-Style Breaking Cracks (Stages 0 to 5) ────────
function drawDestroyStage0(ctx, size) {
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
  // Small center hairline fractures
  ctx.fillRect(7, 7, 2, 2);
  ctx.fillRect(6, 6, 1, 1);
  ctx.fillRect(9, 8, 1, 1);
}

function drawDestroyStage1(ctx, size) {
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(7, 7, 2, 2);
  ctx.fillRect(5, 5, 2, 1);
  ctx.fillRect(9, 8, 2, 1);
  ctx.fillRect(6, 9, 1, 2);
  ctx.fillRect(8, 4, 1, 2);
}

function drawDestroyStage2(ctx, size) {
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
  // Expanding cross fractures
  ctx.fillRect(7, 7, 2, 2);
  ctx.fillRect(4, 4, 3, 1);
  ctx.fillRect(9, 8, 4, 1);
  ctx.fillRect(6, 9, 1, 4);
  ctx.fillRect(8, 3, 1, 3);
  ctx.fillRect(3, 8, 2, 1);
  ctx.fillRect(11, 4, 2, 1);
}

function drawDestroyStage3(ctx, size) {
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.88)';
  ctx.fillRect(6, 6, 4, 4);
  ctx.fillRect(2, 3, 4, 1);
  ctx.fillRect(9, 3, 4, 1);
  ctx.fillRect(3, 10, 4, 1);
  ctx.fillRect(10, 11, 4, 1);
  ctx.fillRect(3, 4, 1, 6);
  ctx.fillRect(12, 4, 1, 7);
  ctx.fillRect(7, 1, 2, 5);
  ctx.fillRect(7, 10, 2, 5);
}

function drawDestroyStage4(ctx, size) {
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.92)';
  ctx.fillRect(5, 5, 6, 6);
  ctx.fillRect(1, 2, 6, 2);
  ctx.fillRect(9, 2, 6, 2);
  ctx.fillRect(2, 9, 5, 2);
  ctx.fillRect(9, 9, 6, 2);
  ctx.fillRect(2, 2, 2, 12);
  ctx.fillRect(12, 2, 2, 12);
  ctx.fillRect(6, 0, 4, 6);
  ctx.fillRect(6, 10, 4, 6);
}

function drawDestroyStage5(ctx, size) {
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
  // Complete spiderweb shattering
  ctx.fillRect(4, 4, 8, 8);
  ctx.fillRect(0, 1, size, 2);
  ctx.fillRect(0, 8, size, 2);
  ctx.fillRect(0, 13, size, 2);
  ctx.fillRect(1, 0, 2, size);
  ctx.fillRect(8, 0, 2, size);
  ctx.fillRect(13, 0, 2, size);
}

// ── Export: texture definitions ───────────────────────────

export const TEXTURE_DEFS = [
  { name: 'grass_top',           draw: drawGrassTop },           // 0
  { name: 'grass_side',          draw: drawGrassSide },          // 1
  { name: 'dirt',                draw: drawDirt },               // 2
  { name: 'stone',               draw: drawStone },              // 3
  { name: 'sand',                draw: drawSand },               // 4
  { name: 'snow',                draw: drawSnow },               // 5
  { name: 'wood_log',            draw: drawWoodLog },            // 6
  { name: 'wood_log_top',        draw: drawWoodLogTop },         // 7
  { name: 'leaves',              draw: drawLeaves },             // 8
  { name: 'coal_ore',            draw: drawCoalOre },            // 9
  { name: 'iron_ore',            draw: drawIronOre },            // 10
  { name: 'water',               draw: drawWater },              // 11
  { name: 'stone_bricks',        draw: drawStoneBricks },        // 12
  { name: 'snow_side',           draw: drawSnowSide },           // 13
  { name: 'cactus_top',          draw: drawCactusTop },          // 14
  { name: 'cactus_side',         draw: drawCactusSide },         // 15
  { name: 'wood_planks',         draw: drawWoodPlanks },         // 16
  { name: 'cobblestone',         draw: drawCobblestone },        // 17
  { name: 'flower_red',          draw: drawFlowerRed },          // 18
  { name: 'flower_yellow',       draw: drawFlowerYellow },       // 19
  { name: 'crafting_table_top',  draw: drawCraftingTableTop },   // 20
  { name: 'crafting_table_side', draw: drawCraftingTableSide },  // 21
  { name: 'torch',               draw: drawTorch },              // 22
  { name: 'furnace_side',        draw: drawFurnaceSide },        // 23
  { name: 'furnace_front',       draw: drawFurnaceFront },       // 24
  { name: 'furnace_front_lit',   draw: drawFurnaceFrontLit },    // 25
  { name: 'chest_top',           draw: drawChestTop },           // 26
  { name: 'chest_side',          draw: drawChestSide },          // 27
  { name: 'farmland_top',        draw: drawFarmlandTop },        // 28
  { name: 'farmland_side',       draw: drawFarmlandSide },       // 29
  { name: 'wheat_stage1',        draw: drawWheatStage1 },        // 30
  { name: 'wheat_stage2',        draw: drawWheatStage2 },        // 31
  { name: 'wheat_stage3',        draw: drawWheatStage3 },        // 32
  { name: 'tnt_top',             draw: drawTntTop },             // 33
  { name: 'tnt_side',            draw: drawTntSide },            // 34
  { name: 'tnt_bottom',          draw: drawTntBottom },          // 35
  { name: 'lava',                draw: drawLava },               // 36
  { name: 'diamond_ore',         draw: drawDiamondOre },         // 37
  { name: 'obsidian',            draw: drawObsidian },           // 38
  { name: 'bed_top',             draw: drawBedTop },             // 39
  { name: 'bed_side',            draw: drawBedSide },            // 40
  { name: 'wool',                draw: drawWool },               // 41
  { name: 'gravel',              draw: drawGravel },             // 42
  { name: 'netherrack',          draw: drawNetherrack },         // 43
  { name: 'soul_sand',           draw: drawSoulSand },           // 44
  { name: 'glowstone',           draw: drawGlowstone },          // 45
  { name: 'nether_quartz_ore',   draw: drawNetherQuartzOre },    // 46
  { name: 'quartz_block',        draw: drawQuartzBlock },        // 47
  { name: 'nether_portal',       draw: drawNetherPortal },       // 48
  // v0.6.0
  { name: 'redstone_ore',        draw: drawRedstoneOre },        // 49
  { name: 'redstone_wire',       draw: drawRedstoneWire },       // 50
  { name: 'redstone_torch',      draw: drawRedstoneTorch },      // 51
  { name: 'lever',               draw: drawLever },              // 52
  { name: 'pressure_plate',      draw: drawPressurePlate },      // 53
  { name: 'wooden_door_bottom',  draw: drawWoodenDoorBottom },   // 54
  { name: 'wooden_door_top',     draw: drawWoodenDoorTop },      // 55
  { name: 'iron_door_bottom',    draw: drawIronDoorBottom },     // 56
  { name: 'iron_door_top',       draw: drawIronDoorTop },        // 57
  { name: 'enchanting_table_top', draw: drawEnchantingTableTop }, // 58
  { name: 'enchanting_table_side', draw: drawEnchantingTableSide }, // 59
  { name: 'mossy_cobblestone',   draw: drawMossyCobblestone },   // 60
  { name: 'monster_spawner',     draw: drawMonsterSpawner },     // 61
  { name: 'bookshelf_side',      draw: drawBookshelfSide },      // 62
  // Breaking Stages (Cracking animation)
  { name: 'destroy_stage_0',     draw: drawDestroyStage0 },      // 63
  { name: 'destroy_stage_1',     draw: drawDestroyStage1 },      // 64
  { name: 'destroy_stage_2',     draw: drawDestroyStage2 },      // 65
  { name: 'destroy_stage_3',     draw: drawDestroyStage3 },      // 66
  { name: 'destroy_stage_4',     draw: drawDestroyStage4 },      // 67
  { name: 'destroy_stage_5',     draw: drawDestroyStage5 },      // 68
];

/**
 * Generate all texture canvases.
 * @returns {HTMLCanvasElement[]}
 */
export function generateAllTextures() {
  return TEXTURE_DEFS.map(def => makeCanvas(def.draw));
}

export function getTextureIndex(name) {
  return TEXTURE_DEFS.findIndex(d => d.name === name);
}
