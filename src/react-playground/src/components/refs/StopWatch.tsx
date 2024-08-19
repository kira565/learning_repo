import { useRef, useState } from "react";
//* Stopwatch utilizing refs concept. Ref is used to keep intervalId, because we dont need this variable for rendering

export const Stopwatch: React.FC = () => {
  const [startTime, setStart] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const intervalId = useRef<number | null>(null);

  function handleStart() {
    setStart(Date.now());
    setNow(Date.now());

    intervalId.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  return (
    <div>
      <h1>Stopwatch</h1>
      {startTime && now && (
        <div>Time passed: {((now - startTime) / 1000).toFixed(3)}</div>
      )}
      <button onClick={handleStart}>Start</button>
      <button
        onClick={() =>
          intervalId.current !== null && clearInterval(intervalId.current)
        }
      >
        End
      </button>
    </div>
  );
};
