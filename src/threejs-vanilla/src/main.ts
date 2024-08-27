import "./style.css";
import * as THREE from "three";

let scene: THREE.Scene;
let camera: THREE.Camera;
let renderer: THREE.Renderer;
let rayCaster: THREE.Raycaster;
let mouse: THREE.Vector2;

init();
render();
const objects = [];

function init() {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );

  camera.position.set(500, 800, 1300);
  camera.lookAt(0, 0, 0);

  scene = new THREE.Scene();
  scene.background = new THREE.Color("rgb(15 23 42)");

  ///...

  const gridHelper = new THREE.GridHelper(1000, 20);
  scene.add(gridHelper);

  rayCaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  const meshGround = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  meshGround.rotateX(-Math.PI / 2);
  scene.add(meshGround);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function onResizeWindow() {}

function onPointerMove() {}

function onPointerDown() {}

function render() {
  renderer.render(scene, camera);
}
