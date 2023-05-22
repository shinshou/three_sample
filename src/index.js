import "./style.css";
import * as THREE from "three";
import { TextGeometry } from '../node_modules/three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from '../node_modules/three/examples/jsm/loaders/FontLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "lil-gui";
import vertexShader from "./shaders/vertexShader";
import vertexShaderText from "./shaders/vertexShaderText";
import fragmentShader from "./shaders/fragmentShader";
import fragmentShaderText from "./shaders/fragmentShaderText";
import normal from "./textures/sessions_normals.png";
import txtTexturePng from "./textures/sessions_texture.png";

const gui = new dat.GUI({ width: 300 });

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00f2f2f2);
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(normal);

// Geometry
const geometry = new THREE.PlaneGeometry(2, 2, 256, 256);

// color
const colorObject = {};
colorObject.depthColor = "#799cf4";
colorObject.surfaceColor = "#799cf4";

// Material
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uWaveLength: { value: 0.5 },
    uFrequency: { value: new THREE.Vector2(1.9, 0.3) },
    uTime: { value: 0 },
    uWaveSpeed1: { value: 0.1 },
    uWaveSpeed2: { value: 0.3 },
    uDepthColor: { value: new THREE.Color(colorObject.depthColor) },
    uSurfaceColor: { value: new THREE.Color(colorObject.surfaceColor) },
    uColorOffset: { value: 0.9 },
    uColorMultiplier: { value: 9 },
    uSmallWaveElevation: { value: 0 },
    uSmallWaveFrequency: { value: 3.0 },
    uSmallWaveSpeed: { value: 0.2 },
    uTexture: { value: texture }
  },
  antialias: true,
});

// デバッグ
// gui
//   .add(material.uniforms.uWaveLength, "value")
//   .min(0)
//   .max(1)
//   .step(0.001)
//   .name("uWaveLength")

// gui
//   .add(material.uniforms.uFrequency.value, "x")
//   .min(0)
//   .max(10)
//   .step(0.001)
//   .name("uFrequencyX")

// gui
//   .add(material.uniforms.uFrequency.value, "y")
//   .min(0)
//   .max(10)
//   .step(0.001)
//   .name("uFrequencyY")

// gui
//   .add(material.uniforms.uWaveSpeed1, "value")
//   .min(0)
//   .max(4)
//   .step(0.001)
//   .name("uWaveSpeed1")

// gui
//   .add(material.uniforms.uWaveSpeed2, "value")
//   .min(0)
//   .max(4)
//   .step(0.001)
//   .name("uWaveSpeed2")


// gui
//   .add(material.uniforms.uColorOffset, "value")
//   .min(0)
//   .max(1)
//   .step(0.001)
//   .name("uColorOffset")

// gui
//   .add(material.uniforms.uColorMultiplier, "value")
//   .min(0)
//   .max(10)
//   .step(0.001)
//   .name("uColorMultiplier")

// gui
//   .add(material.uniforms.uSmallWaveElevation, "value")
//   .min(0)
//   .max(1)
//   .step(0.001)
//   .name("uSmallWaveElevation")

// gui
//   .add(material.uniforms.uSmallWaveSpeed, "value")
//   .min(0)
//   .max(4)
//   .step(0.001)
//   .name("uSmallWaveSpeed")

// gui
//   .add(material.uniforms.uSmallWaveFrequency, "value")
//   .min(0)
//   .max(30)
//   .step(0.001)
//   .name("uSmallWaveFrequency")

// gui.addColor(colorObject, "depthColor").onChange(() => {
//   material.uniforms.uDepthColor.value.set(colorObject.depthColor)
// })

// gui.addColor(colorObject, "surfaceColor").onChange(() => {
//   material.uniforms.uSurfaceColor.value.set(colorObject.surfaceColor)
// })

// Mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.scale.x = 10
mesh.scale.y = 1
mesh.position.x = 5
mesh.position.y = 3
mesh.position.z = -5
// mesh.rotation.x = -Math.PI / 2;
mesh.rotation.z = -Math.PI / 4;
scene.add(mesh);

// TextMesh
const loader = new FontLoader();
let textMesh;
// let textMaterial;
// テクスチャを読み込む
const txtTextureLoader = new THREE.TextureLoader();
const txtTexture = txtTextureLoader.load(txtTexturePng);
// const textMaterial = new THREE.MeshBasicMaterial({ map: txtTexture });
const textMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShaderText,
  fragmentShader: fragmentShaderText,
  uniforms: {
    uWaveLength: { value: 0.5 },
    uFrequency: { value: new THREE.Vector2(1.9, 0.3) },
    uTime: { value: 0 },
    uWaveSpeed1: { value: 0.1 },
    uWaveSpeed2: { value: 0.3 },
    uDepthColor: { value: new THREE.Color(colorObject.depthColor) },
    uSurfaceColor: { value: new THREE.Color(colorObject.surfaceColor) },
    uColorOffset: { value: 0.9 },
    uColorMultiplier: { value: 9 },
    uSmallWaveElevation: { value: 0 },
    uSmallWaveFrequency: { value: 3.0 },
    uSmallWaveSpeed: { value: 0.2 },
    uTexture: { value: txtTexture },
    uOpacity: { value: 1.0 }
  },
  transparent: true,
  antialias: true,
});
loader.load('./fonts/helvetiker_regular.typeface.json', function (font) {

  const geometry = new TextGeometry('Sample Application', {
    font: font,
    size: 0.15,
    height: 0,
    curveSegments: 24,
  });

  textMesh = new THREE.Mesh(geometry, textMaterial);
  textMesh.position.x = 0.1
  textMesh.position.y = 1.3
  textMesh.position.z = 0
  scene.add(textMesh);
});

// ライト
const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(1, 1, 1);
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
let scrollPercent = 0;

document.body.onscroll = () => {
  scrollPercent =
    (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
    100;
};

function lerp(x, y, a) {
  return (1 - a) * x + a * y;
}

function scalePercent(start, end) {
  return (scrollPercent - start) / (end - start);
}

const animationScripts = [];
animationScripts.push({
  start: 0,
  end: 10,
  function() {
    textMaterial.uniforms.uOpacity.value = lerp(textMaterial.uniforms.uOpacity.value, 1, scalePercent(0, 10));
  },
});

animationScripts.push({
  start: 10,
  end: 20,
  function() {
    textMaterial.uniforms.uOpacity.value = lerp(1, 0.8, scalePercent(10, 20));
  },
});

animationScripts.push({
  start: 20,
  end: 30,
  function() {
    textMaterial.uniforms.uOpacity.value = lerp(0.8, 0.5, scalePercent(20, 30));
  },
});

animationScripts.push({
  start: 30,
  end: 100,
  function() {
    textMaterial.uniforms.uOpacity.value = lerp(0.5, 0.0, scalePercent(30, 100));
  },
});

function playScrollAnimation() {
  animationScripts.forEach((animation) => {
    if (scrollPercent >= animation.start && scrollPercent <= animation.end) {
      animation.function();
    }
  });
}

const clock = new THREE.Clock();

const animate = () => {
  //時間取得
  const elapsedTime = clock.getElapsedTime();
  material.uniforms.uTime.value = elapsedTime;

  renderer.render(scene, camera);
  playScrollAnimation();
  window.requestAnimationFrame(animate);
};

animate();
