import "./App.css";
import React, { useEffect, useRef } from "react";
import { ThreeApp } from "./components/ThreeApp";
import { AppControls } from "./components/AppControls";
import * as THREE from "three";
import { useThreeApp } from "./hooks/useTreeApp";
import { ThreeContext } from "./store/threeContext";

export interface Three {
  scene: THREE.Scene;
  renderer: THREE.Renderer;
}

function App() {
  const app = useThreeApp();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { renderer, camera } = app;

    if (ref.current && ref.current.childNodes.length <= 0) {
      ref.current.appendChild(renderer.domElement);
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <React.Fragment>
      <ThreeContext.Provider value={{ app, threeContainer: ref }}>
        <AppControls />
      </ThreeContext.Provider>
      <ThreeApp ref={ref} />
    </React.Fragment>
  );
}

export default App;
