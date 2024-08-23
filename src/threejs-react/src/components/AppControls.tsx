import { useEffect, useMemo, useState } from "react";
import {
  getThreeIntersecVector,
  useThreeAppContext,
} from "../hooks/useTreeApp";
import { getHighlightedSquare } from "../store/three-helpers";

export const AppControls: React.FC = () => {
  const [drawingMode, setDrawingMode] = useState(false);
  const { app, threeContainer } = useThreeAppContext()!;
  const hlmesh = useMemo(() => getHighlightedSquare(), []);

  useEffect(() => {
    if (!threeContainer.current) return;
    const { mouse, rayCaster, camera, scene } = app;
    const element = threeContainer.current;

    function drawingListener(e: MouseEvent) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      rayCaster.setFromCamera(mouse, camera);
      const intersects = rayCaster.intersectObjects(scene.children);
      intersects.forEach((intersection) => {
        if (intersection.object.name === "ground") {
          const hPos = getThreeIntersecVector()
            .copy(intersection.point)
            .floor()
            .addScalar(0.5);

          hlmesh.position.set(hPos.x, 0, hPos.z);
        }
      });
    }

    if (drawingMode) {
      scene.add(hlmesh);
      element.addEventListener("mousemove", drawingListener);
    } else {
      hlmesh.geometry.dispose();
      hlmesh.material.dispose();
      hlmesh.parent?.remove(hlmesh);
      element.removeEventListener("mousemove", drawingListener);
    }
    return () => element.removeEventListener("mousemove", drawingListener);
  }, [drawingMode]);

  //Component for app controls
  return (
    <div className="absolute z-10 left-1 top-1 flex gap-2">
      <button className="button-eva" onClick={() => setDrawingMode((p) => !p)}>
        Add Warehouse Units
      </button>
      <button className="button-eva">Add Robot Units</button>
    </div>
  );
};
