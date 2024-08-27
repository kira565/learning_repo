import * as THREE from "three";

export interface InitialSceneProps {
  lights: THREE.Light[];
  mesh: THREE.Mesh;
  gridHelper: THREE.GridHelper;
}

export const getPlaneMesh = () => {
  const geometry = new THREE.PlaneGeometry(1000, 1000);
  geometry.rotateX(-Math.PI / 2);
  const planeMesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
      visible: false,
    })
  );
  return planeMesh;
};

export const getGridHelper = () => {
  const helper = new THREE.GridHelper(1000, 20);
  helper.name = "ground";
  return helper;
};

export const getHighlightedSquare = () => {
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  geometry.translate(0, 0.5, 0);

  const hlMesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
      color: "#fa0",
      name: "hl-mesh",
      opacity: 0.5,
      transparent: true,
    })
  );

  return hlMesh;
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
    mesh: getPlaneMesh(),
    gridHelper: getGridHelper(),
  };
};

export const getThreeCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(500, 800, 1300);
  camera.lookAt(0, 0, 0);

  return camera;
};
