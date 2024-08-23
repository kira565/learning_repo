import { useContext, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  getGridHelper,
  getInitialLights,
  getMesh,
  getThreeCamera,
} from "../store/three-helpers";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";
import { createContext } from "react";

interface ThreeApp {
  scene: THREE.Scene;
  renderer: THREE.Renderer;
  camera: THREE.PerspectiveCamera;
  controls: MapControls;
  mouse: THREE.Vector2;
  rayCaster: THREE.Raycaster;
}

export const ThreeContext = createContext<{
  app: ThreeApp;
  threeContainer: React.RefObject<HTMLDivElement>;
} | null>(null);

export const useThreeAppContext = () => {
  return useContext(ThreeContext);
};

export const getThreeIntersecVector = () => {
  return new THREE.Vector3();
};

export const useThreeApp = (): ThreeApp => {
  const treeApp = useMemo(() => {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("rgb(15,23, 42)");
    renderer.setSize(window.innerWidth, window.innerHeight);

    const camera = getThreeCamera();
    renderer.setAnimationLoop(() => {
      controls.update();
      renderer.render(scene, camera);
    });

    const controls = new MapControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 0;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;

    const [spotLight, ambientLight] = getInitialLights();
    scene.add(getMesh());
    scene.add(getGridHelper());
    scene.add(spotLight);
    scene.add(ambientLight);

    const mouse = new THREE.Vector2();
    const rayCaster = new THREE.Raycaster();

    return { scene, renderer, camera, controls, mouse, rayCaster };
  }, []);

  return treeApp;
};
