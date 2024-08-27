import { useEffect, useMemo } from "react";
import { getHighlightedSquare } from "../store/three-helpers";
import { useThreeAppContext } from "../store/threeContext";
import * as THREE from "three";

export const DrawingMode: React.FC = () => {
  const context = useThreeAppContext();
  const drawingObject = useMemo(() => getHighlightedSquare(), []);
  console.log(drawingObject);
  useEffect(() => {
    const { scene, onDrawListener } = context!.app;
    const callback = (e: MouseEvent) => onDrawListener(e, drawingObject);
    scene.add(drawingObject);
    context?.threeContainer.current!.addEventListener("mousemove", callback);

    return () => {
      drawingObject.geometry.dispose();
      drawingObject.material.dispose();
      drawingObject.parent?.remove(drawingObject);
      context?.threeContainer.current!.removeEventListener(
        "mousemove",
        callback
      );
    };
  }, []);

  function handleAddX(isIncrement: boolean) {
    drawingObject.scale.setX(
      isIncrement ? drawingObject.scale.x * 3 : drawingObject.scale.x / 3
    );
  }
  function handleAddZ(isIncrement: boolean) {
    drawingObject.scale.setZ(
      isIncrement ? drawingObject.scale.z * 3 : drawingObject.scale.z / 3
    );
  }
  function handleAddY(isIncrement: boolean) {
    drawingObject.scale.setY(
      isIncrement ? drawingObject.scale.y * 3 : drawingObject.scale.y / 3
    );
  }
  return (
    <div className="flex flex-col gap-2 rounded-md border-2 border-solid border-evaTextWarning text-evaTextWarning p-2">
      <div className="flex gap-2 items-center justify-between">
        <span className="font-bold">X</span>
        <div className="flex gap-1">
          <button
            className="button-eva w-[30px]"
            onClick={() => handleAddX(true)}
          >
            +
          </button>
          <button
            className="button-eva w-[30px]"
            onClick={() => handleAddX(false)}
          >
            -
          </button>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <span className="font-bold">Z</span>
        <div className="flex gap-1">
          <button
            className="button-eva w-[30px]"
            onClick={() => handleAddZ(true)}
          >
            +
          </button>
          <button
            className="button-eva w-[30px]"
            onClick={() => handleAddZ(false)}
          >
            -
          </button>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <span className="font-bold">Y</span>
        <div className="flex gap-1">
          <button
            className="button-eva w-[30px]"
            onClick={() => handleAddY(true)}
          >
            +
          </button>
          <button
            className="button-eva w-[30px]"
            onClick={() => handleAddY(false)}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};
