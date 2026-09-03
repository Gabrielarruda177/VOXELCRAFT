/**
 * Day/Night Cycle — Dynamic 24-hour celestial simulation.
 * Controls sun/moon orbital positions, sky gradients, fog colors, and lighting intensity.
 */

import * as THREE from 'three';

// 1 full day-night cycle in seconds (e.g. 480s = 8 minutes)
export const CYCLE_DURATION = 480;

let timeOfDay = 0.20; // Starts in the morning (around 9:30 AM)
let isPaused = false;

// 3D Celestial Objects
let sunMesh = null;
let moonMesh = null;
let celestialGroup = null;

// Lighting references
let dirLight = null;
let hemiLight = null;
let ambientLight = null;

// Sky color palettes for key cycle times
const SKY_COLORS = {
  dawn:     new THREE.Color(0xf59e0b), // 0.00 - Sunrise (06:00)
  morning:  new THREE.Color(0x93c5fd), // 0.15 - Morning (09:30)
  noon:     new THREE.Color(0x60a5fa), // 0.25 - Noon (12:00)
  sunset:   new THREE.Color(0xe11d48), // 0.50 - Sunset (18:00)
  dusk:     new THREE.Color(0x4338ca), // 0.58 - Dusk (20:00)
  midnight: new THREE.Color(0x050816), // 0.75 - Midnight (00:00)
  predawn:  new THREE.Color(0x1e1b4b), // 0.92 - Pre-dawn (04:00)
};

const FOG_COLORS = {
  dawn:     new THREE.Color(0xfbbf24),
  morning:  new THREE.Color(0x93c5fd),
  noon:     new THREE.Color(0x78b9e8),
  sunset:   new THREE.Color(0xf43f5e),
  dusk:     new THREE.Color(0x312e81),
  midnight: new THREE.Color(0x050711),
  predawn:  new THREE.Color(0x1e1b4b),
};

/**
 * Initialize celestial objects and bind lighting references.
 * @param {THREE.Scene} scene
 * @param {object} lights - { dirLight, hemiLight, ambientLight }
 */
export function initDayNightCycle(scene, lights = {}) {
  dirLight = lights.dirLight || null;
  hemiLight = lights.hemiLight || null;
  ambientLight = lights.ambientLight || null;

  celestialGroup = new THREE.Group();
  scene.add(celestialGroup);

  // 1. Sun (Glowing golden cube)
  const sunGeo = new THREE.BoxGeometry(20, 20, 20);
  const sunMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
  sunMesh = new THREE.Mesh(sunGeo, sunMat);
  celestialGroup.add(sunMesh);

  // 2. Moon (Pale luminescent cube)
  const moonGeo = new THREE.BoxGeometry(16, 16, 16);
  const moonMat = new THREE.MeshBasicMaterial({ color: 0xf1f5f9 });
  moonMesh = new THREE.Mesh(moonGeo, moonMat);
  celestialGroup.add(moonMesh);

  // Initial update
  updateAtmosphere(0, scene, null);
}

/**
 * Update time of day, orbital positions, lights, and atmospheric fog.
 * @param {number} dt - Delta time in seconds
 * @param {THREE.Scene} scene
 * @param {THREE.Camera} camera
 * @param {THREE.WebGLRenderer} [renderer]
 */
export function updateDayNightCycle(dt, scene, camera, renderer = null) {
  if (!isPaused) {
    timeOfDay += dt / CYCLE_DURATION;
    if (timeOfDay >= 1.0) timeOfDay -= 1.0;
  }

  // Follow camera position so celestials remain at infinite visual depth
  if (camera && celestialGroup) {
    celestialGroup.position.copy(camera.position);
  }

  // Celestial Orbit (Sun & Moon rotate 360 degrees around X/Z axis)
  const orbitAngle = timeOfDay * Math.PI * 2 - Math.PI / 2;
  const distance = 260;

  const sunX = Math.cos(orbitAngle) * distance;
  const sunY = Math.sin(orbitAngle) * distance;
  const sunZ = 20;

  if (sunMesh) sunMesh.position.set(sunX, sunY, sunZ);
  if (moonMesh) moonMesh.position.set(-sunX, -sunY, -sunZ);

  // Directional Light tracks Sun (or Moon during night)
  if (dirLight) {
    const isDay = isDaytime();
    if (isDay) {
      dirLight.position.set(sunX, Math.max(15, sunY), sunZ);
    } else {
      dirLight.position.set(-sunX, Math.max(15, -sunY), -sunZ);
    }
  }

  updateAtmosphere(dt, scene, renderer);
}

const tempSkyColor = new THREE.Color();
const tempFogColor = new THREE.Color();

function sampleColorPalette(palette, t, targetColor) {
  // t is 0.0 .. 1.0
  if (t < 0.15) {
    const k = t / 0.15;
    return targetColor.copy(palette.dawn).lerp(palette.morning, k);
  } else if (t < 0.25) {
    const k = (t - 0.15) / 0.10;
    return targetColor.copy(palette.morning).lerp(palette.noon, k);
  } else if (t < 0.50) {
    const k = (t - 0.25) / 0.25;
    return targetColor.copy(palette.noon).lerp(palette.sunset, k);
  } else if (t < 0.58) {
    const k = (t - 0.50) / 0.08;
    return targetColor.copy(palette.sunset).lerp(palette.dusk, k);
  } else if (t < 0.75) {
    const k = (t - 0.58) / 0.17;
    return targetColor.copy(palette.dusk).lerp(palette.midnight, k);
  } else if (t < 0.92) {
    const k = (t - 0.75) / 0.17;
    return targetColor.copy(palette.midnight).lerp(palette.predawn, k);
  } else {
    const k = (t - 0.92) / 0.08;
    return targetColor.copy(palette.predawn).lerp(palette.dawn, k);
  }
}

function updateAtmosphere(dt, scene, renderer) {
  sampleColorPalette(SKY_COLORS, timeOfDay, tempSkyColor);
  sampleColorPalette(FOG_COLORS, timeOfDay, tempFogColor);

  if (scene) {
    if (scene.fog) {
      scene.fog.color.copy(tempFogColor);
    }
  }

  if (renderer) {
    renderer.setClearColor(tempSkyColor);
  }

  // Dynamic light intensity
  const dayProgress = Math.sin(timeOfDay * Math.PI * 2); // >0 during day, <0 at night

  if (dirLight) {
    if (dayProgress > 0) {
      // Day (Sun)
      dirLight.color.set(0xfff5e0);
      dirLight.intensity = 0.4 + dayProgress * 0.85; // up to 1.25
    } else {
      // Night (Moon)
      dirLight.color.set(0x94a3b8);
      dirLight.intensity = Math.max(0.12, (-dayProgress) * 0.28);
    }
  }

  if (hemiLight) {
    if (dayProgress > 0) {
      hemiLight.color.set(0x87CEEB);
      hemiLight.groundColor.set(0x556633);
      hemiLight.intensity = 0.3 + dayProgress * 0.4;
    } else {
      hemiLight.color.set(0x1e293b);
      hemiLight.groundColor.set(0x0f172a);
      hemiLight.intensity = 0.15;
    }
  }

  if (ambientLight) {
    if (dayProgress > 0) {
      ambientLight.color.set(0xffffff);
      ambientLight.intensity = 0.25 + dayProgress * 0.2;
    } else {
      ambientLight.color.set(0x64748b);
      ambientLight.intensity = 0.12;
    }
  }
}

// ── Public Helpers ─────────────────────────────────────────

export function getTimeOfDay() {
  return timeOfDay;
}

export function setTimeOfDay(t) {
  timeOfDay = ((t % 1) + 1) % 1;
}

export function isDaytime() {
  // Day runs from 0.0 (dawn ~06:00) to 0.50 (sunset ~18:00)
  return timeOfDay < 0.50;
}

export function isNighttime() {
  return !isDaytime();
}

/**
 * Returns formatted 24h digital time (e.g. "14:20", "03:45")
 */
export function getGameTimeString() {
  // 0.0 = 06:00 (6.0 hours)
  const totalHours = ((timeOfDay * 24) + 6) % 24;
  const hours = Math.floor(totalHours);
  const minutes = Math.floor((totalHours - hours) * 60);

  const hStr = hours < 10 ? '0' + hours : '' + hours;
  const mStr = minutes < 10 ? '0' + minutes : '' + minutes;
  return `${hStr}:${mStr}`;
}

export function skipToDawn() {
  timeOfDay = 0.05; // 07:12 AM Sunrise
}

/**
 * Returns daylight intensity from 0.0 (night) to 1.0 (noon).
 */
export function getDaylightFactor() {
  const sin = Math.sin(timeOfDay * Math.PI * 2);
  return Math.max(0, sin);
}
