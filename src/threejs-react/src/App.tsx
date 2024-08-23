import "./App.css";
import React, { useEffect, useRef } from "react";
import { ThreeApp } from "./components/ThreeApp";
import { AppControls } from "./components/AppControls";
import * as THREE from "three";
import { ThreeContext, useThreeApp } from "./hooks/useTreeApp";
import { getHighlightedSquare } from "./store/three-helpers";

export interface Three {
  scene: THREE.Scene;
  renderer: THREE.Renderer;
}

function App() {
  const app = useThreeApp();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.childNodes.length > 0) return;
    ref.current.appendChild(app.renderer.domElement);
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
