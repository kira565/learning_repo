import { forwardRef } from "react";

export const ThreeApp = forwardRef<HTMLDivElement, unknown>(
  (_, containerRef) => {
    return <div ref={containerRef} />;
  }
);
