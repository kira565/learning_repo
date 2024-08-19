import { useRef, useState } from "react";
import { flushSync } from "react-dom";

export const FlushSync: React.FC = () => {
  const listRef = useRef<HTMLUListElement>(null);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(initialTodos);

  function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    setText("");

    //! In this case it doesnt fit our requirements, state update is enqueued but
    //! we scroll before DOM will be commited
    // setTodos((todos) => [...todos, newTodo]);

    //* To fix this, commit to dom immidiately after callback
    flushSync(() => {
      setTodos((todos) => [...todos, newTodo]);
    });

    //* then proceed with scroll, todo is a;lready in the DOM by the time we sroll into it
    listRef.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  return (
    <div>
      <h1>Flush Sync</h1>
      <div>To scroll last added todo</div>
      <button onClick={handleAdd}>Add todo</button>
      <input
        className="border-2 border-solid border-cyan-100"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <ul ref={listRef}>
        {todos.map((todo) => (
          <div key={todo.id}>{todo.text}</div>
        ))}
      </ul>
    </div>
  );
};

let nextId = 0;
let initialTodos: { id: number; text: string }[] = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: "Todo #" + (i + 1),
  });
}
