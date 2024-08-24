import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls.js";

export interface InitialSceneProps {
  lights: THREE.Light[];
  mesh: THREE.Mesh;
  gridHelper: THREE.GridHelper;
}

export const getMesh = () => {
  const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
  planeGeometry.rotateX(-Math.PI / 2);
  const planeMaterial = new THREE.ShadowMaterial({
    color: 0x000000,
    opacity: 0.2,
  });

  const mesh = new THREE.Mesh(planeGeometry, planeMaterial);
  mesh.position.y = -200;
  mesh.receiveShadow = true;

  return mesh;
};

export const getGridHelper = () => {
  const helper = new THREE.GridHelper(2000, 100);
  helper.position.y = -199;
  helper.material.opacity = 0.25;
  helper.material.transparent = true;

  return helper;
};

export const getInitialLights = () => {
  const spotLight = new THREE.SpotLight(0xffffff, 4.5);
  spotLight.position.set(0, 1500, 200);
  spotLight.angle = Math.PI * 0.2;
  spotLight.decay = 0;
  spotLight.castShadow = true;
  spotLight.shadow.camera.near = 200;
  spotLight.shadow.camera.far = 2000;
  spotLight.shadow.bias = -0.000222;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;

  return [spotLight, new THREE.AmbientLight(0xf0f0f0, 3)];
};

export const getIntitialSceneState = (): InitialSceneProps => {
  return {
    lights: getInitialLights(),
    mesh: getMesh(),
    gridHelper: getGridHelper(),
  };
};

export const getThreeApp = (element: HTMLDivElement) => {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0xf0ffff);
  renderer.setSize(window.innerWidth, window.innerHeight);

  element.appendChild(renderer.domElement);

  const camera = getThreeCamera();

  const controls = new MapControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.ROTATE,
  };
  controls.touches = {
    ONE: THREE.TOUCH.PAN,
    TWO: THREE.TOUCH.DOLLY_ROTATE,
  };
  return { renderer, camera, controls, scene };
};

export const getThreeCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0, 250, 1000);

  return camera;
};
