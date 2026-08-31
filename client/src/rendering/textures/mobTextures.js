/**
 * Mob Textures — High-Definition 16×16 and 32×32 Procedural Pixel-Art Skin Atlas.
 *
 * Generates terrifying undead Zombie textures (exposed ribcage, glowing yellow eyes,
 * bloody sockets), menacing Creepers, skeletal Archers, night Spiders, and farm animals.
 */

import * as THREE from 'three';

function makeTexture(w, h, drawFn) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  const p = (x, y, c) => {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, 1, 1);
  };
  const r = (x, y, bw, bh, c) => {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, bw, bh);
  };

  drawFn(ctx, p, r, w, h);

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  return texture;
}

// ── 1. ZOMBIE TEXTURES (Horror Undead Pixel-Art) ──────────

export function createZombieHeadTexture() {
  return makeTexture(16, 16, (ctx, p, r) => {
    // Base decaying rotten flesh
    r(0, 0, 16, 16, '#2d5a27');
    // Muted dark rot patches
    r(1, 1, 4, 4, '#1e3f1a');
    r(10, 1, 5, 4, '#1e3f1a');
    r(2, 10, 12, 5, '#3b6e32');

    // Deep bloody eye sockets (Red/Black)
    r(2, 3, 5, 5, '#450a0a');
    r(9, 3, 5, 5, '#450a0a');
    p(3, 4, '#7f1d1d'); p(10, 4, '#7f1d1d');
    p(4, 5, '#991b1b'); p(11, 5, '#991b1b');

    // Terrifying Glowing Yellow Eyes with Red Pupils
    r(3, 4, 3, 3, '#fef08a');
    p(4, 5, '#eab308');
    p(4, 5, '#ef4444'); // Red iris center

    r(10, 4, 3, 3, '#fef08a');
    p(11, 5, '#eab308');
    p(11, 5, '#ef4444');

    // Nose cavity
    p(7, 8, '#0f172a'); p(8, 8, '#0f172a');

    // Gaping Maw & Exposed Rotten Teeth
    r(3, 10, 10, 4, '#0f172a');
    // Teeth
    p(4, 10, '#fef08a'); p(6, 10, '#ffffff'); p(8, 10, '#fef08a'); p(10, 10, '#ffffff');
    p(5, 13, '#ffffff'); p(7, 13, '#fef08a'); p(9, 13, '#ffffff');
    // Blood dripping from mouth
    p(5, 14, '#991b1b'); p(8, 14, '#7f1d1d'); p(8, 15, '#991b1b');
  });
}

export function createZombieBodyTexture() {
  return makeTexture(16, 16, (ctx, p, r) => {
    // Tattered cyan shirt base
    r(0, 0, 16, 16, '#0891b2');
    r(0, 0, 16, 2, '#0e7490');

    // Exposed Ribcage & Rotting Gore in the Center
    r(4, 3, 8, 10, '#450a0a');
    r(5, 4, 6, 8, '#1c1917');

    // Sternum & Rib Bones (Ivory / White with Blood Splatters)
    r(7, 3, 2, 8, '#f8fafc'); // Sternum
    // Left Ribs
    p(5, 4, '#f8fafc'); p(6, 4, '#e2e8f0');
    p(4, 6, '#f8fafc'); p(5, 6, '#e2e8f0'); p(6, 6, '#e2e8f0');
    p(4, 8, '#f8fafc'); p(5, 8, '#e2e8f0'); p(6, 8, '#e2e8f0');
    p(5, 10, '#f8fafc'); p(6, 10, '#e2e8f0');
    // Right Ribs
    p(9, 4, '#e2e8f0'); p(10, 4, '#f8fafc');
    p(9, 6, '#e2e8f0'); p(10, 6, '#f8fafc'); p(11, 6, '#f8fafc');
    p(9, 8, '#e2e8f0'); p(10, 8, '#f8fafc'); p(11, 8, '#f8fafc');
    p(9, 10, '#e2e8f0'); p(10, 10, '#f8fafc');

    // Blood splatters over shirt
    p(3, 5, '#991b1b'); p(12, 7, '#991b1b'); p(2, 9, '#7f1d1d');
    p(7, 12, '#991b1b'); p(8, 12, '#7f1d1d');
  });
}

export function createZombieLimbTexture() {
  return makeTexture(16, 16, (ctx, p, r) => {
    // Decaying green skin with lacerations
    r(0, 0, 16, 16, '#2d5a27');
    r(2, 3, 12, 3, '#1e3f1a');
    r(4, 8, 8, 4, '#3b6e32');
    // Blood and exposed muscle
    p(3, 5, '#991b1b'); p(4, 6, '#7f1d1d');
    p(11, 10, '#991b1b'); p(12, 11, '#7f1d1d');
  });
}

export function createZombieLegsTexture() {
  return makeTexture(16, 16, (ctx, p, r) => {
    // Tattered dark indigo pants
    r(0, 0, 16, 10, '#1e3a8a');
    r(1, 1, 14, 3, '#172554');
    // Torn hem with mud
    r(0, 8, 16, 2, '#451a03');
    p(3, 7, '#451a03'); p(11, 7, '#451a03');
    // Rotting bare feet at the bottom
    r(0, 10, 16, 6, '#2d5a27');
    p(4, 12, '#1e3f1a'); p(10, 13, '#1e3f1a');
  });
}

// ── 2. CREEPER TEXTURES (Iconic Camouflage & Menacing Face) ─

export function createCreeperFaceTexture() {
  return makeTexture(16, 16, (ctx, p, r) => {
    // Green Camo Base Noise
    const greens = ['#15803d', '#16a34a', '#22c55e', '#4ade80', '#14532d', '#166534'];
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        p(x, y, greens[(x * 7 + y * 13) % greens.length]);
      }
    }

    // Iconic Creeper Face (Eyes, Bridge, Mouth & Frown)
    // Eyes
    r(3, 4, 3, 3, '#0f172a');
    r(10, 4, 3, 3, '#0f172a');
    // Nose Bridge
    r(6, 6, 4, 3, '#0f172a');
    // Mouth & Frown
    r(5, 9, 6, 4, '#0f172a');
    r(3, 11, 2, 3, '#0f172a');
    r(11, 11, 2, 3, '#0f172a');
  });
}

export function createCreeperBodyTexture() {
  return makeTexture(16, 16, (ctx, p, r) => {
    const greens = ['#15803d', '#16a34a', '#22c55e', '#4ade80', '#14532d'];
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        p(x, y, greens[(x * 11 + y * 17) % greens.length]);
      }
    }
  });
}

// ── 3. SKELETON TEXTURES (Sunken Skull & Bone Structure) ──

export function createSkeletonHeadTexture() {
  return makeTexture(16, 16, (ctx, p, r) => {
    r(0, 0, 16, 16, '#e2e8f0');
    r(1, 1, 14, 2, '#f8fafc');
    r(2, 14, 12, 2, '#cbd5e1');

    // Sunken Black Eyes with Red Spectral Glow
    r(2, 4, 4, 4, '#0f172a');
    r(10, 4, 4, 4, '#0f172a');
    p(3, 6, '#ef4444'); p(11, 6, '#ef4444');

    // Nose cavity
    p(7, 8, '#0f172a'); p(8, 8, '#0f172a');

    // Teeth
    r(3, 11, 10, 2, '#0f172a');
    p(4, 11, '#ffffff'); p(6, 11, '#ffffff'); p(8, 11, '#ffffff'); p(10, 11, '#ffffff');
  });
}

export function createSkeletonBodyTexture() {
  return makeTexture(16, 16, (ctx, p, r) => {
    r(0, 0, 16, 16, '#0f172a'); // Hollow interior cavity
    // Spine
    r(7, 0, 2, 16, '#f8fafc');
    // Ribs
    r(2, 2, 12, 1, '#f8fafc');
    r(2, 5, 12, 1, '#e2e8f0');
    r(3, 8, 10, 1, '#cbd5e1');
    r(4, 11, 8, 1, '#94a3b8');
    r(5, 14, 6, 1, '#94a3b8');
  });
}

// ── 4. SPIDER TEXTURES (Glowing 8-Eyes & Chitin Body) ──────

export function createSpiderHeadTexture() {
  return makeTexture(16, 16, (ctx, p, r) => {
    r(0, 0, 16, 16, '#1e293b');
    r(1, 1, 14, 3, '#0f172a');

    // 8 Glowing Red Arachnid Eyes
    // Big Center Pair
    r(5, 7, 2, 2, '#ef4444'); p(5, 7, '#ffffff');
    r(9, 7, 2, 2, '#ef4444'); p(9, 7, '#ffffff');
    // Lateral Pair
    r(2, 6, 2, 2, '#dc2626');
    r(12, 6, 2, 2, '#dc2626');
    // Top Small Pair
    p(6, 5, '#f87171'); p(9, 5, '#f87171');
    // Bottom Pair
    p(4, 10, '#b91c1c'); p(11, 10, '#b91c1c');
  });
}

export function createSpiderBodyTexture() {
  return makeTexture(16, 16, (ctx, p, r) => {
    r(0, 0, 16, 16, '#0f172a');
    // Dark brown/slate abdomen patterns
    r(3, 2, 10, 3, '#1e293b');
    r(2, 6, 12, 4, '#334155');
    r(4, 11, 8, 3, '#1e293b');
    p(7, 7, '#dc2626'); p(8, 7, '#dc2626');
  });
}

// ── 5. PIG & SHEEP TEXTURES ───────────────────────────────

export function createPigFaceTexture() {
  return makeTexture(16, 16, (ctx, p, r) => {
    r(0, 0, 16, 16, '#f472b6');
    r(1, 1, 14, 2, '#fbcfe8');
    // Eyes
    r(1, 6, 2, 3, '#ffffff'); p(1, 7, '#0f172a');
    r(13, 6, 2, 3, '#ffffff'); p(14, 7, '#0f172a');
    // 3D Snout area
    r(4, 9, 8, 5, '#fb7185');
    p(6, 11, '#450a0a'); p(9, 11, '#450a0a');
  });
}

export function createSheepFaceTexture() {
  return makeTexture(16, 16, (ctx, p, r) => {
    r(0, 0, 16, 16, '#e2e8f0');
    // Wool top
    r(0, 0, 16, 4, '#f8fafc');
    // Face skin
    r(2, 4, 12, 10, '#cbd5e1');
    // Eyes
    r(2, 6, 3, 2, '#ffffff'); p(3, 7, '#0f172a');
    r(11, 6, 3, 2, '#ffffff'); p(12, 7, '#0f172a');
    // Snout
    r(6, 10, 4, 3, '#f472b6');
  });
}
