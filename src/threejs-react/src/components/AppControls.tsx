import { DrawingMode } from "./ControlWindow";
import React, { useState } from "react";

export const AppControls: React.FC = () => {
  const [drawingMode, setDrawingMode] = useState(false);

  //Component for app controls
  return (
    <React.Fragment>
      <div className="absolute z-10 left-1 top-1 flex gap-2">
        <div className="flex gap-2">
          <button
            className="button-eva"
            onClick={() => setDrawingMode((p) => !p)}
          >
            Add Warehouse Unit
          </button>
          <button className="button-eva">Add Robot Unit</button>
        </div>
      </div>
      <div className="absolute z-10 right-1 top-1">
        {drawingMode && <DrawingMode />}
      </div>
    </React.Fragment>
  );
};
