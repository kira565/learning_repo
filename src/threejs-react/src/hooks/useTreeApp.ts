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
}

export const ThreeContext = createContext<ThreeApp | null>(null);

export const useThreeAppContext = () => {
  return useContext(ThreeContext);
};

export const useThreeApp = (): ThreeApp => {
  const treeApp = useMemo(() => {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xf0ffff);
    renderer.setSize(window.innerWidth, window.innerHeight);

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

    const [spotLight, ambientLight] = getInitialLights();
    scene.add(getMesh());
    scene.add(getGridHelper());
    scene.add(spotLight);
    scene.add(ambientLight);

    return { scene, renderer, camera, controls };
  }, []);

  return treeApp;
};
