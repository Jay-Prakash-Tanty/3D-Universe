import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Test cube
 */
const guiChange ={};
guiChange.count = 10000;
guiChange.size = 0.0095;

const particleGeometry = new THREE.BufferGeometry();
const position = new Float32Array(guiChange.count * 3);

for(let i =1; i<guiChange.count; i++){
  position[i] = Math.random();
  position[i+1] = Math.random();
  position[i+2] = Math.random();
}

particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(position, 3)
);

const particleMaterial = new THREE.PointsMaterial({
  size: guiChange.size,
  sizeAttenuation:true,
});

const particle = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particle);

gui.add(guiChange, "count").min(100000).max(1000000).step(100);
gui.add(guiChange, "size").min(1).max(10000).step(1);



/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
