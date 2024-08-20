import { memo, useEffect, useState } from "react";

export const MemoParent: React.FC = () => {
  const [counter, setCount] = useState(0);
  const [object, setObj] = useState({ name: "jhon", lastname: "penis" });
  const [arr, setArr] = useState([
    {
      id: 1,
      name: "biba",
    },
    {
      id: 2,
      name: "dodik",
    },
  ]);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        IncrementCount
      </button>
      <button
        onClick={() => setObj({ name: "jhon", lastname: "penis" })} //! setting same object will cause a rerender, we can use memo or deep Comparator func
      >
        Set same object(cause rerender because obj !== new obj)
      </button>
      <button
        onClick={() => setArr((prev) => [...prev, { id: 2, name: "dodik" }])} // if we return (prev) => prev memoized component will return
      >
        Increment array
      </button>
      {counter}
      <MemoChild array={arr} object={object} />
    </div>
  );
};

const MemoChild: React.FC<{ array: any[]; object: any }> = memo(({ array }) => {
  useEffect(() => {
    console.log("CHILD RERENDER", array);
    //* yes, its rerendered properly, only if array is really not equal to the old one,
    //* if array saem and even if state of parent changes, child doesnt rerender
  });
  return <div>{array.map((el) => el.id)}</div>;
});
