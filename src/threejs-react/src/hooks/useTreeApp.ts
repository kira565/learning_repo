import { useMemo } from "react";
import * as THREE from "three";
import {
  getGridHelper,
  getInitialLights,
  getPlaneMesh,
  getThreeCamera,
} from "../store/three-helpers";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";
import { ThreeApp } from "../store/threeContext";

export const useThreeApp = (): ThreeApp => {
  const treeApp = useMemo(() => {
    //DEFINITIONS
    const scene = new THREE.Scene();
    const camera = getThreeCamera();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const objects: THREE.Object3D[] = [];
    const controls = new MapControls(camera, renderer.domElement);

    const pointer = new THREE.Vector2();
    const rayCaster = new THREE.Raycaster();

    const measureVector = new THREE.Vector3();

    //INIT
    //renderer
    renderer.setClearColor("rgb(15,23, 42)");
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(() => {
      controls.update();
      renderer.render(scene, camera);
    });

    //lights
    const [spotLight, ambientLight] = getInitialLights();
    // ground
    const planeMesh = getPlaneMesh();
    objects.push(planeMesh);

    //scene
    scene.add(planeMesh);
    scene.add(getGridHelper());
    scene.add(spotLight);
    scene.add(ambientLight);

    function onDrawListener(e: MouseEvent, rollOverMesh: THREE.Object3D) {
      pointer.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
      rayCaster.setFromCamera(pointer, camera);
      const intersects = rayCaster.intersectObjects(objects, false);
      if (intersects.length > 0) {
        const intersect = intersects[0];
        rollOverMesh.position.copy(intersect.point).add(intersect.face!.normal);
        rollOverMesh.position
          .divideScalar(50)
          .floor()
          .multiplyScalar(50)
          .addScalar(25);
      }
    }

    function measure(geometry: THREE.BoxGeometry) {
      const box = geometry.boundingBox?.getSize(measureVector);
      console.log(geometry);
      return { x: box?.x, y: box?.y, z: box?.z };
    }

    return {
      scene,
      renderer,
      camera,
      controls,
      pointer,
      onDrawListener,
      measure,
    };
  }, []);

  return treeApp;
};
