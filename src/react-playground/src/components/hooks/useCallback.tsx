import { memo, useCallback, useEffect, useState } from "react";

export const UseCallbackParent: React.FC = () => {
  const [count, setCount] = useState(0);

  const func = () => {
    //! when function is not wrapped with usecallback,
    //! as prop it will never be the same and it cause re-render of Child
    console.log("FUNCTION CALL");
  };

  //* Preserve function: now memo works fine and func preserved from previous render
  const wrappedFunc = useCallback(func, []);

  return (
    <div>
      <h1>UseCallback memo case</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Increment to re-render
      </button>
      {count}
      <UseCallbackChildMemoCase func={wrappedFunc} />
    </div>
  );
};

const UseCallbackChildMemoCase: React.FC<{ func: () => void }> = memo(
  ({ func }) => {
    useEffect(() => {
      console.log("Child rerendered");
    });

    return (
      <div>
        Memoized Child component
        <button onClick={func}>Call Func</button>
      </div>
    );
  }
);
