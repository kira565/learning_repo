import { useState } from "react";

// We have a problem here, after increment a counter we have really slow performance and rendering
// its becase parent state changes runs re-render for all children
// * Profiler in devtools helps us to understand which components rerendered and how much time it took

//todo VERY SLOW COMPONENT DETECTED
export const ChildVerySlow: React.FC<{ verySlowProp?: string }> = () => {
  //... MANY DIFFICULT LOGIC
  return <div>Im very very slow component</div>;
};

//* SOLUTIONS:
//* 1. State collocation
// Isolation of rerender source, we can create separated <CounterComponent>
export const ChildCount: React.FC = () => {
  const [count, setCount] = useState(0); // Rerender of all children because of parent state change
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>Click me!</button>
    </div>
  );
};

export const Example1: React.FC = () => {
  const [count, setCount] = useState(0); // Rerender of all children because of parent state change
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>Click me!</button>
      <ChildVerySlow />
    </div>
  );
};
