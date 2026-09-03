/**
 * Scene Setup — renderer, scene, lighting, and atmosphere.
 *
 * Uses AmbientLight + DirectionalLight + HemisphereLight
 * for rich lighting that makes the textured terrain pop.
 */

import * as THREE from 'three';

let renderer = null;
let scene = null;

/**
 * Create the WebGL renderer.
 * @returns {THREE.WebGLRenderer}
 */
export function createRenderer() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
    stencil: false,
    depth: true,
  });
  renderer.domElement.id = 'game-canvas';
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x78b9e8); // Soft sky blue
  renderer.shadowMap.enabled = false; // Shadows off for performance in Phase 1
  document.body.appendChild(renderer.domElement);

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return renderer;
}

let hemiLight = null;
let ambientLight = null;
let sunlight = null;

/**
 * Create the scene with atmospheric lighting.
 * @returns {THREE.Scene}
 */
export function createScene() {
  scene = new THREE.Scene();

  // Hemisphere light — sky color above, ground color below
  hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x556633, 0.6);
  scene.add(hemiLight);

  // Ambient light — soft base fill
  ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  // Directional light — sun/moon simulation
  sunlight = new THREE.DirectionalLight(0xfff5e0, 1.0);
  sunlight.position.set(80, 120, 50);
  scene.add(sunlight);

  // Fog calibrated for render radius (starts at 35 blocks, reaches solid sky at 65 blocks)
  scene.fog = new THREE.Fog(0x78b9e8, 35, 65);

  return scene;
}

export function getLights() {
  return {
    hemiLight,
    ambientLight,
    dirLight: sunlight,
  };
}

/**
 * Render one frame.
 * @param {THREE.Camera} camera
 */
export function render(camera) {
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

/**
 * Get the renderer's canvas element.
 * @returns {HTMLCanvasElement}
 */
export function getCanvas() {
  return renderer ? renderer.domElement : null;
}

export function getRenderer() {
  return renderer;
}

export function getScene() {
  return scene;
}

/**
 * Handle camera aspect ratio update on resize.
 * @param {THREE.PerspectiveCamera} camera
 */
export function setupCameraResize(camera) {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}
