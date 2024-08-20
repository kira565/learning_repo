import { memo, useDeferredValue, useState } from "react";

export const DefferedValueExample: React.FC = () => {
  const [text, setText] = useState("");
  const defferedValue = useDeferredValue(text);

  return (
    <div>
      Value:{" "}
      <input
        className="border-2 border-solid border-cyan-300"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></input>
      <SlowList text={defferedValue} />
    </div>
  );
};

const SlowList: React.FC<{ text: string }> = memo(({ text }) => {
  let items = [];
  for (let i = 0; i < 250; i++) {
    items.push(<SlowListItem key={i} text={text} />);
  }

  return <ul>{items}</ul>;
});

const SlowListItem: React.FC<{ text: string }> = ({ text }) => {
  let startTime = performance.now();

  while (performance.now() - startTime < 1) {
    //do nothing
  }

  return <li>Text: {text}</li>;
};
