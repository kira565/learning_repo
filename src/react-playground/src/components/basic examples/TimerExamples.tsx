import { useRef, useState } from "react";

export const TimerExample = () => {
  const [currentTime, setCurrent] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>();

  function start() {
    timer.current = setInterval(() => setCurrent((prev) => prev + 10), 10);
  }

  function pause() {
    if (timer.current) clearInterval(timer.current);
  }

  const minutes = ("0" + (Math.floor(currentTime / 60000) % 60)).slice(-2); // 1 min = 60000 ms // 20000 / 60000 % 60
  const seconds = ("0" + (Math.floor(currentTime / 1000) % 60)).slice(-2); // 1 sec = 1000 ms, we use % 60 to not to show more than 60 sec, so if we have 120 sec, 120 % 60 === 0, it means we started new minute
  const miliseconds = ("0" + Math.floor(currentTime / 10)).slice(-2); //

  return (
    <div>
      <div>{`${minutes}:${seconds}:${miliseconds}`}</div>
      <div>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
      </div>
    </div>
  );
};
