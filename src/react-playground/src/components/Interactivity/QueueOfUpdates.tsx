import { useState } from "react";

export const QueueingOfUpdates: React.FC = () => {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [timeoutNumber, setTimeoutnumber] = useState(0);
  let [mutateDirectlyNumber, setMutateNumber] = useState(0);

  useState(() => {
    console.log("REREDER");
  });

  async function handleEnqueue() {
    setPending(pending + 1);
    await delay(3000);
    //! Broken realization:
    //! after added 1 and delay pending will show -1 from last value, which is impossible
    //! and while clicking fast both counters will behave unpredictable
    // setPending(pending - 1); // will cause Pendin -1
    // setCompleted(completed + 1);
    //* Solution:
    //* inside handle click event handler values of pending and completed
    //* ccorrespond to what they were at the time of the click event.
    //* for the first render pending was 0, so setPending(0 - 1) becomes -1
    //* which is wrong. Since we want to increment or decrement the counters,
    // * rather than(вместо того чтобы) set them to a concete value,
    //* determined during the click, we can instead pass the updater function
    //! note that async is doesnt matter, its just for mock delay when item is pending
    setPending((pending) => pending - 1);
    setCompleted((completed) => completed + 1);
  }

  return (
    <div>
      <h1>Queue of updates</h1>
      <div> Pending Items Count: {pending}</div>
      <div> Completed Items Count: {completed}</div>
      <div> Increment Timeout number: {timeoutNumber}</div>
      <div> Mutate State Directly number {mutateDirectlyNumber}</div>
      <button onClick={handleEnqueue}>Enqueue Item</button>
      <button
        onClick={() => {
          setTimeoutnumber((p) => p + 5);
          setTimeout(() => {
            alert(timeoutNumber); //* here we will have old value because it was taken from previous snapshot
          }, 5000);

          setTimeout(() => {
            setTimeoutnumber((prev) => {
              alert(prev); //* here we will see actual value, because updater function has actual value
              return prev;
            });
          }, 3000);
        }}
      >
        Increment Timeout
      </button>
      <button
        onClick={() => {
          mutateDirectlyNumber++;
          alert(mutateDirectlyNumber);
        }}
      >
        Mutate state directly
      </button>
    </div>
  );
};

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
