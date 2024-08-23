import { forwardRef, MouseEventHandler } from "react";

export const ThreeApp = forwardRef<HTMLDivElement>(
  // {
  //   mouseMoveListener: (e: React.MouseEvent<HTMLDivElement>) => void;
  // }
  (_, containerRef) => {
    return <div ref={containerRef} />;
  }
);
