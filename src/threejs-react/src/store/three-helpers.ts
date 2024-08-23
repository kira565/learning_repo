import * as THREE from "three";

export interface InitialSceneProps {
  lights: THREE.Light[];
  mesh: THREE.Mesh;
  gridHelper: THREE.GridHelper;
}

export const getMesh = () => {
  const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshBasicMaterial({
      visible: false,
    })
  );
  planeMesh.rotateX(-Math.PI / 2);

  return planeMesh;
};

export const getGridHelper = () => {
  const helper = new THREE.GridHelper(20, 20);
  helper.name = "ground";
  return helper;
};

export const getHighlightedSquare = () => {
  const hlMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      color: "#fa0",
    })
  );
  hlMesh.rotateX(-Math.PI / 2);
  hlMesh.position.set(1, 0, 1);

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
    mesh: getMesh(),
    gridHelper: getGridHelper(),
  };
};

export const getThreeCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0, 15, -22);

  return camera;
};
