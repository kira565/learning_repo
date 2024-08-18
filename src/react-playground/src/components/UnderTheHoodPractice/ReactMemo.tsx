// React memo is built-in High Order component
//! not useMemo hook

import React from "react";
import { ChildVerySlow } from "./Example1SlowChild";

// React.memo memoize components
// When parent constatly rerenders but children dont need it we can use React.memo to take entire children from last render
// and not do any operations

export const ReactMemoExample = () => {
  const Component = React.memo(ChildVerySlow, (prevProps, nextProps) => {
    if (prevProps !== nextProps) {
      return true;
    }
    return false;
  });

  return (
    <div>
      <Component />
    </div>
  );
};
