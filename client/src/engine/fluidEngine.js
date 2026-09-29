/**
 * Fluid Engine — Continuous flow physics for Água (Water) and Lava.
 *
 * Model (faithful to the classic Minecraft "scheduled tick" fluid system):
 *
 *  • Every fluid voxel carries a `level` (see FLUID_* in blockTypes.js):
 *      0            → SOURCE (bucket / woken-up sea block) — spreads forever.
 *      1 … 7        → FLOWING, losing one level per block of distance.
 *      FLUID_STATIC → INERT, world-generated oceans & nether lava seas. They
 *                     never tick on their own (so a 400-block ocean can never
 *                     flood the map), but the moment the world is disturbed
 *                     next to them (a block is broken or placed) they are woken
 *                     up into real sources and start flowing.
 *
 *  • A tick runs when its scheduled time is reached. Water ticks every 0.25s,
 *    lava every 1.5s (lava is slow and heavy, exactly like vanilla).
 *  • Spread priority: fall straight down first (and while falling, do NOT
 *    spread sideways — that is what makes waterfalls look right), then the 4
 *    cardinal directions with level + 1, then the 4 diagonal corners, only
 *    where exactly two adjacent cardinals share the same level. That corner
 *    rule makes a spread read as a rounded blob instead of a plus sign.
 *  • Falling columns never consume level budget, so a waterfall of any height
 *    keeps its strength; the horizontal reach is what level + 1 limits.
 *  • Water meeting lava converts the lava into OBSIDIAN (source) or
 *    COBBLESTONE (flowing) and both are consumed.
 *  • A flowing block with no stronger neighbour is removed, so cutting the
 *    supply makes the whole stream retract instead of lingering.
 *
 * Performance contract:
 *  • All writes go through worldManager's *deferred mesh* mode, so a 300-block
 *    flood costs a couple of chunk rebuilds per frame instead of 300.
 *  • Ticks are pulled from a dedup queue under a hard per-frame budget.
 *  • Ticks only execute inside the resident chunk window.
 */

import {
  BlockType,
  isFluid,
  isFluidReplaceable,
  FLUID_SOURCE_LEVEL,
  FLUID_MAX_FLOW_LEVEL,
  FLUID_STATIC,
} from '../world/blockTypes.js';
import {
  getBlockAtWorld,
  getFluidLevelAtWorld,
  setBlockAtWorld,
  setFluidChangeListener,
  setMeshDeferral,
  flushDirtyChunks,
  isChunkLoaded,
} from '../world/worldManager.js';
import { CHUNK_HEIGHT } from '../world/chunk.js';
import { spawnWaterSplashParticles, spawnFluidReactionParticles } from '../rendering/particles.js';
import { playWaterFlowSound, playLavaSizzleSound, playSplashSound } from '../engine/soundFx.js';

// ── Tuning ─────────────────────────────────────────────────
const WATER_TICK_DELAY = 0.25;   // 5 vanilla ticks
const LAVA_TICK_DELAY = 1.50;    // 30 vanilla ticks
const MAX_TICKS_PER_FRAME = 96;
// Scanning the queue is cheap (a Map walk), ticking is not. Keeping the scan
// bounded means a pathological 6000-entry queue can never blow the frame, while
// still being generous enough to drain any realistic backlog.
const MAX_SCAN_PER_FRAME = 1536;
const MAX_PENDING = 6000;
const MESH_BUDGET_PER_FRAME = 2;
const SOUND_RADIUS_SQ = 64;      // ~8 blocks
const SOUND_COOLDOWN = 0.30;

const CARDINALS = [
  [1, 0, 0], [-1, 0, 0],
  [0, 0, 1], [0, 0, -1],
];

/**
 * Diagonal directions, each paired with the two cardinals that must both be
 * flooded for the corner to be filled (vanilla corner-flow rule).
*/
const CORNERS = [
  { d: [1, 0, 1], a: [1, 0, 0], b: [0, 0, 1] },
  { d: [1, 0, -1], a: [1, 0, 0], b: [0, 0, -1] },
  { d: [-1, 0, 1], a: [-1, 0, 0], b: [0, 0, 1] },
  { d: [-1, 0, -1], a: [-1, 0, 0], b: [0, 0, -1] },
];

const NEIGHBORS_6 = [
  [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1],
];

// ── State ──────────────────────────────────────────────────
const scheduled = new Map();   // "x,y,z" -> { x, y, z, time, fluid }
const listenerPos = { x: 0, y: 0, z: 0 };

let scene = null;
let clock = 0;
let soundCooldown = 0;
let listenerReady = false;

const keyOf = (x, y, z) => `${x},${y},${z}`;

export function getFluidTickDelay(type) {
  return type === BlockType.LAVA ? LAVA_TICK_DELAY : WATER_TICK_DELAY;
}

// ── Public API ─────────────────────────────────────────────

export function initFluidEngine(s) {
  scene = s;
  scheduled.clear();
  clock = 0;
  listenerReady = false;
  setFluidChangeListener(onWorldBlockChanged);
}

export function getPendingFluidTickCount() {
  return scheduled.size;
}

/**
 * Drop every pending tick — used when the active dimension changes so stale
 * coordinates from the previous world never tick against the new one.
 */
export function resetFluidEngine() {
  scheduled.clear();
  clock = 0;
  listenerReady = false;
}

/**
 * Pour a bucket: place a real, infinite fluid source.
 * @returns {boolean} true when a source was actually created
 */
export function spawnFluidSource(wx, wy, wz, type) {
  if (!isFluid(type)) return false;
  if (wy < 0 || wy >= CHUNK_HEIGHT) return false;
  if (!isFluidReplaceable(getBlockAtWorld(wx, wy, wz))) return false;

  setMeshDeferral(true);
  writeFluidCell(wx, wy, wz, type, FLUID_SOURCE_LEVEL);
  setMeshDeferral(false);
  flushDirtyChunks(scene, 1);
  return true;
}

// ── Scheduling ─────────────────────────────────────────────

/**
 * Queue a fluid tick. Duplicate requests collapse into a single entry and the
 * earliest pending time always wins, so water stays responsive.
 */
export function scheduleFluidTick(wx, wy, wz, delay = WATER_TICK_DELAY, fluid = null) {
  if (wy < 0 || wy >= CHUNK_HEIGHT) return;

  const k = keyOf(wx, wy, wz);
  const existing = scheduled.get(k);
  const time = clock + delay;

  if (existing) {
    const current = fluid !== null ? fluid : getBlockAtWorld(wx, wy, wz);

    // The cell swapped fluids (water drained out, lava poured on top). The
    // queued time belonged to the fluid that *was* here and says nothing about
    // the one that is here now, so re-arm from scratch. Inheriting the old time
    // would hand the new lava water's 0.25s cadence and let it spread six times
    // too fast — the identity fix below is useless without this.
    if (isFluid(current) && current !== existing.fluid) {
      existing.time = time;
      existing.fluid = current;
      return;
    }

    if (time < existing.time) existing.time = time;
    if (isFluid(current)) existing.fluid = current;
    return;
  }

  // A full queue must never cost us the work we were just asked to do.
  //
  // Every block change wakes up to six neighbours, so mining a hillside or
  // draining a lake can push the queue to its cap. Dropping the *incoming* tick
  // there used to leave a freshly poured bucket sitting in the world forever,
  // because nothing else ever touched that cell again to re-queue it. Evicting
  // the least urgent entry instead keeps the newest, most relevant work alive
  // and still bounds memory.
  if (scheduled.size >= MAX_PENDING) evictLeastUrgent();

  scheduled.set(k, {
    x: wx, y: wy, z: wz, time,
    fluid: fluid !== null ? fluid : getBlockAtWorld(wx, wy, wz),
  });
}

/** Make room in a saturated queue by dropping the tick due furthest in the future. */
function evictLeastUrgent() {
  let victimKey = null;
  let victimTime = -Infinity;

  for (const [k, entry] of scheduled) {
    if (entry.time > victimTime) {
      victimTime = entry.time;
      victimKey = k;
    }
  }

  if (victimKey !== null) scheduled.delete(victimKey);
}

/** Schedule every live fluid touching (wx, wy, wz). */
function scheduleNeighbors(wx, wy, wz) {
  for (const [dx, dy, dz] of NEIGHBORS_6) {
    const nx = wx + dx, ny = wy + dy, nz = wz + dz;
    const type = getBlockAtWorld(nx, ny, nz);
    if (!isFluid(type)) continue;
    if (getFluidLevelAtWorld(nx, ny, nz) >= FLUID_STATIC) continue;
    scheduleFluidTick(nx, ny, nz, getFluidTickDelay(type), type);
  }
}

/**
 * World write callback. Wakes inert world-gen fluids when a gap opens next to
 * them and re-evaluates the neighbourhood after any block change.
 */
function onWorldBlockChanged(wx, wy, wz, newType, prevType, prevLevel) {
  if (newType === BlockType.AIR) {
    for (const [dx, dy, dz] of NEIGHBORS_6) {
      const nx = wx + dx, ny = wy + dy, nz = wz + dz;
      const nType = getBlockAtWorld(nx, ny, nz);
      if (!isFluid(nType)) continue;
      if (getFluidLevelAtWorld(nx, ny, nz) !== FLUID_STATIC) continue;
      // A hole next to the ocean / lava sea: the inert body becomes a source.
      setBlockAtWorld(scene, nx, ny, nz, nType, FLUID_SOURCE_LEVEL);
      scheduleFluidTick(nx, ny, nz, getFluidTickDelay(nType), nType);
    }
  }

  if (isFluid(prevType) && prevLevel < FLUID_STATIC) {
    scheduleFluidTick(wx, wy, wz, getFluidTickDelay(prevType), prevType);
  }

  // A live source or flow written straight into the world (bucket, command,
  // script) has to start moving too — only its neighbours were scheduled above.
  if (isFluid(newType) && getFluidLevelAtWorld(wx, wy, wz) < FLUID_STATIC) {
    scheduleFluidTick(wx, wy, wz, getFluidTickDelay(newType), newType);
  }

  scheduleNeighbors(wx, wy, wz);
}

// ── Cell writing (deferred-mesh safe) ──────────────────────

/**
 * Write a fluid voxel and queue its tick.
 * @returns {boolean} true when something actually changed
 */
function writeFluidCell(wx, wy, wz, type, level) {
  const existing = getBlockAtWorld(wx, wy, wz);
  if (existing === type && getFluidLevelAtWorld(wx, wy, wz) === level) return false;

  setBlockAtWorld(scene, wx, wy, wz, type, level);
  scheduleFluidTick(wx, wy, wz, getFluidTickDelay(type), type);
  return true;
}

/**
 * Water touching lava freezes it: source lava → obsidian, flowing lava →
 * cobblestone. The lava cell is consumed in the process.
 */
function freezeLava(lx, ly, lz) {
  const lavaLevel = getFluidLevelAtWorld(lx, ly, lz);
  const solid = lavaLevel === FLUID_SOURCE_LEVEL ? BlockType.OBSIDIAN : BlockType.COBBLESTONE;

  setBlockAtWorld(scene, lx, ly, lz, solid);
  scheduleNeighbors(lx, ly, lz);

  playLavaSizzleSound();
  if (isNearListener(lx, ly, lz)) {
    spawnFluidReactionParticles(lx + 0.5, ly + 0.5, lz + 0.5);
  }
  return true;
}

// ── Flow rules ─────────────────────────────────────────────

/**
 * How strongly may `type` at `level` push into the cell?
 * @returns {{ ok: boolean, level: number, reaction: number }}
 *   reaction: 0 = none, 1 = water hits lava, 2 = lava hits water
 */
function probeCell(wx, wy, wz, type, level) {
  if (wy < 0 || wy >= CHUNK_HEIGHT) return { ok: false, level, reaction: 0 };

  const target = getBlockAtWorld(wx, wy, wz);

  if (target === type) {
    // Same fluid: only allowed when strictly stronger, so thin spots fill in
    // but a settled column is never rewritten every tick.
    const tLevel = getFluidLevelAtWorld(wx, wy, wz);
    return { ok: level < tLevel, level, reaction: 0 };
  }

  if (isFluid(target)) {
    if (type === BlockType.WATER) return { ok: true, level, reaction: 1 };
    return { ok: true, level, reaction: 2 };
  }

  if (!isFluidReplaceable(target)) return { ok: false, level, reaction: 0 };
  return { ok: true, level, reaction: 0 };
}

/**
 * Push fluid into a neighbour cell, resolving reactions.
 * @returns {boolean} whether the world changed
 */
function pushInto(wx, wy, wz, type, level) {
  const probe = probeCell(wx, wy, wz, type, level);
  if (!probe.ok) return false;

  if (probe.reaction === 1) return freezeLava(wx, wy, wz);
  if (probe.reaction === 2) {
    // Lava reached water: the lava itself is the one that petrifies.
    const level2 = getFluidLevelAtWorld(wx, wy, wz);
    setBlockAtWorld(
      scene, wx, wy, wz,
      level2 === FLUID_SOURCE_LEVEL ? BlockType.OBSIDIAN : BlockType.COBBLESTONE
    );
    scheduleNeighbors(wx, wy, wz);
    return true;
  }

  return writeFluidCell(wx, wy, wz, type, level);
}

/**
 * A flowing block with nothing feeding it is dead weight: retract it.
 *
 * Support rules:
 *  • a strictly stronger neighbour always feeds it;
 *  • an equal-strength neighbour only counts when it sits directly ABOVE, which
 *    is what keeps a vertical waterfall column alive at its saturated level
 *    while making a flat, equal-level puddle retract as soon as it is cut off.
 *
 * Sources never die on their own — that is what makes buckets infinite.
 */
function isOrphaned(x, y, z, type, level) {
  if (level === FLUID_SOURCE_LEVEL) return false;

  for (const [dx, dy, dz] of NEIGHBORS_6) {
    if (getBlockAtWorld(x + dx, y + dy, z + dz) !== type) continue;
    const nLevel = getFluidLevelAtWorld(x + dx, y + dy, z + dz);
    if (nLevel < level) return false;
    if (nLevel === level && dy === 1) return false;
  }
  return true;
}

/**
 * Has this cell run out of anything to do? Settled cells stop rescheduling
 * themselves, which is what keeps a dug ocean channel from eating the whole
 * per-frame tick budget forever.
 */
function isSettled(x, y, z, type, level) {
  for (const [dx, dy, dz] of NEIGHBORS_6) {
    const ny = y + dy;
    if (ny < 0 || ny >= CHUNK_HEIGHT) continue;

    const nType = getBlockAtWorld(x + dx, ny, z + dz);
    if (isFluid(nType)) {
      if (nType !== type) return false;                              // reaction pending
      if (getFluidLevelAtWorld(x + dx, ny, z + dz) > level) return false; // can equalise
      continue;
    }
    if (isFluidReplaceable(nType)) return false;                     // somewhere to flow to
  }
  return true;
}

// ── Core tick ──────────────────────────────────────────────

/**
 * Process one fluid tick.
 * @returns {boolean} whether the world changed
 */
function tickFluid(entry) {
  const { x, y, z } = entry;
  const type = getBlockAtWorld(x, y, z);

  // The cell changed identity since this tick was queued.
  //
  // Instead of just bailing out, re-arm the tick for whatever fluid now owns
  // this coordinate. Without this a single dropped tick strands the cell for
  // good: nothing else in the engine revisits a cell that has gone quiet, so a
  // source that loses its queue entry never flows again.
  if (type !== entry.fluid || !isFluid(type)) {
    if (isFluid(type)) scheduleFluidTick(x, y, z, getFluidTickDelay(type), type);
    return false;
  }

  const level = getFluidLevelAtWorld(x, y, z);
  if (level >= FLUID_STATIC) return false;

  // 1. Contact with the opposite fluid wins over everything else.
  for (const [dx, dy, dz] of NEIGHBORS_6) {
    const nType = getBlockAtWorld(x + dx, y + dy, z + dz);
    if (!isFluid(nType) || nType === type) continue;
    if (type === BlockType.WATER) return freezeLava(x + dx, y + dy, z + dz);
    // Lava touched water: this lava cell petrifies.
    setBlockAtWorld(
      scene, x, y, z,
      level === FLUID_SOURCE_LEVEL ? BlockType.OBSIDIAN : BlockType.COBBLESTONE
    );
    scheduleNeighbors(x, y, z);
    return true;
  }

  // 2. Supply cut off → the whole tail of the stream retracts.
  if (isOrphaned(x, y, z, type, level)) {
    setBlockAtWorld(scene, x, y, z, BlockType.AIR);
    scheduleNeighbors(x, y, z);
    return true;
  }

  let changed = false;

  // 3. Gravity. A falling column does not consume the horizontal reach budget,
  //    it only saturates at the strongest reachable level.
  const fallLevel = Math.min(level + 1, FLUID_MAX_FLOW_LEVEL);
  let fell = false;
  if (y > 0) {
    const below = getBlockAtWorld(x, y - 1, z);
    const belowIsFree = isFluidReplaceable(below) && !isFluid(below);
    const belowIsWeaker = below === type && getFluidLevelAtWorld(x, y - 1, z) > fallLevel;
    if (belowIsFree || belowIsWeaker) {
      changed = pushInto(x, y - 1, z, type, fallLevel) || changed;
      fell = changed;
    }
  }

  // 4. No floor to fall onto (or the column is resting): spread sideways.
  //    Saturated cells (level 7) do not spread, which is what terminates
  //    every flow after a finite, level-budgeted distance.
  if (!fell && level < FLUID_MAX_FLOW_LEVEL) {
    const nextLevel = level + 1;
    for (const [dx, , dz] of CARDINALS) {
      if (pushInto(x + dx, y, z + dz, type, nextLevel)) changed = true;
    }

    // 5. Corner filling — only where two adjacent cardinals are flooded with
    //    exactly the same level, which is what rounds off a spread.
    if (level > FLUID_SOURCE_LEVEL && nextLevel + 1 <= FLUID_MAX_FLOW_LEVEL) {
      for (const corner of CORNERS) {
        const [ax, , az] = corner.a;
        const [bx, , bz] = corner.b;
        if (getBlockAtWorld(x + ax, y, z + az) !== type) continue;
        if (getBlockAtWorld(x + bx, y, z + bz) !== type) continue;
        if (getFluidLevelAtWorld(x + ax, y, z + az) !== level) continue;
        if (getFluidLevelAtWorld(x + bx, y, z + bz) !== level) continue;
        if (pushInto(x + corner.d[0], y, z + corner.d[2], type, nextLevel + 1)) changed = true;
      }
    }
  }

  // 6. Nothing happened: keep the cell in rotation while it still has work,
  //    then let it retire so settled bodies stop consuming tick budget.
  if (!changed && !isSettled(x, y, z, type, level)) {
    scheduleFluidTick(x, y, z, getFluidTickDelay(type), type);
  }

  if (changed) playFlowFeedback(type, x, y, z);
  return changed;
}

// ── Feedback ───────────────────────────────────────────────

function isNearListener(x, y, z) {
  if (!listenerReady) return false;
  const dx = x + 0.5 - listenerPos.x;
  const dy = y + 0.5 - listenerPos.y;
  const dz = z + 0.5 - listenerPos.z;
  return dx * dx + dy * dy + dz * dz < SOUND_RADIUS_SQ;
}

function playFlowFeedback(type, x, y, z) {
  if (soundCooldown > 0) return;
  if (!isNearListener(x, y, z)) return;
  soundCooldown = SOUND_COOLDOWN;
  if (type === BlockType.LAVA) playLavaSizzleSound();
  else playWaterFlowSound();
}

/**
 * Ambient splash used by the player controller when it enters water fast.
 */
export function spawnSplashAt(x, y, z) {
  spawnWaterSplashParticles(x, y, z);
  playSplashSound();
}

// ── Main update ────────────────────────────────────────────

/**
 * Advance the fluid simulation.
 * @param {number} dt
 * @param {{x:number,y:number,z:number}} [playerPos]
 */
export function updateFluidEngine(dt, playerPos) {
  if (playerPos) {
    listenerPos.x = playerPos.x;
    listenerPos.y = playerPos.y;
    listenerPos.z = playerPos.z;
    listenerReady = true;
  }

  clock += dt;
  soundCooldown = Math.max(0, soundCooldown - dt);

  if (scheduled.size === 0) return;

  // Defer remeshing: a single batched rebuild pass for the entire frame.
  setMeshDeferral(true);

  // Collect only the entries that are actually due, then order them by age.
  //
  // This matters more than it looks. Every block change wakes up to six
  // neighbours, so a burst of mining (or a big body of water settling) queues
  // thousands of entries that turn out to be no-ops the moment they run. With
  // a plain FIFO scan every one of those no-ops used to burn a tick from the
  // budget, which could starve a slow lava source (1.5s per tick) for seconds
  // at a time. Scanning for free and only spending the budget on real work
  // keeps the simulation fair regardless of how noisy the queue gets.
  const due = [];
  let scanned = 0;

  for (const [k, entry] of scheduled) {
    if (scanned >= MAX_SCAN_PER_FRAME) break;
    if (entry.time > clock) continue;
    scanned++;
    due.push([k, entry]);
  }

  if (due.length > 1) due.sort((a, b) => a[1].time - b[1].time);

  let budget = MAX_TICKS_PER_FRAME;

  for (const [k, entry] of due) {
    if (budget <= 0) break;

    // Remove the entry *before* ticking it. `tickFluid` may legitimately
    // re-arm this same coordinate (the cell swapped fluids), and it has to
    // create a fresh entry to do so. Deleting afterwards would throw that
    // re-arm away and quietly strand the cell.
    scheduled.delete(k);

    // Outside the resident window: drop the tick, the chunk regenerates inert.
    if (!isChunkLoaded(entry.x, entry.z)) continue;

    budget--;
    try {
      tickFluid(entry);
    } catch (err) {
      console.warn('[FluidEngine] tick failed at', entry.x, entry.y, entry.z, err);
    }
  }

  setMeshDeferral(false);
  flushDirtyChunks(scene, MESH_BUDGET_PER_FRAME);
}
