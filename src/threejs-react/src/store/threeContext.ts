import React, { createContext, useContext } from "react";
import * as THREE from "three";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";

export interface ThreeApp {
  scene: THREE.Scene;
  renderer: THREE.Renderer;
  camera: THREE.PerspectiveCamera;
  controls: MapControls;
  pointer: THREE.Vector2;
  onDrawListener: (event: MouseEvent, movingEntity: THREE.Object3D) => void;
  measure: (geometry: THREE.BoxGeometry) => {
    x?: number;
    y?: number;
    z?: number;
  };
}

export const ThreeContext = createContext<{
  app: ThreeApp;
  threeContainer: React.RefObject<HTMLDivElement>;
} | null>(null);

export const useThreeAppContext = () => {
  return useContext(ThreeContext);
};
