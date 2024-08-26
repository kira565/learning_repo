import { forwardRef, MouseEventHandler, useEffect } from "react";

export const ThreeApp = forwardRef<HTMLDivElement>(
  // {
  //   mouseMoveListener: (e: React.MouseEvent<HTMLDivElement>) => void;
  // }
  (_, containerRef) => {
    useEffect(() => {
      console.log("RERENDER");
    });
    return <div ref={containerRef} />;
  }
);
