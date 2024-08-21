import { useState } from "react";
import { Task, TaskProvider, useTasks, useTasksDispatch } from "./TaskContext";
import React from "react";

export const TaskListComponent: React.FC = () => {
  return (
    <TaskProvider>
      <h1>Context + Reducer usage example</h1>
      Day off in Kyoto
      <AddTask />
      <TaskList />
    </TaskProvider>
  );
};

const AddTask: React.FC = () => {
  const [text, setText] = useState("");
  const tasks = useTasks();
  const dispatch = useTasksDispatch();

  return (
    <div>
      <input
        className="border-2 border-solid border-cyan-300"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button
        onClick={() => {
          dispatch({
            type: "add",
            task: {
              id: tasks!.length,
              text: text,
              done: false,
            },
          });
          setText("");
        }}
      >
        Add
      </button>
    </div>
  );
};

const TaskList: React.FC = () => {
  const tasks = useTasks();

  return tasks.map((task) => <TaskItem task={task} key={task.id} />);
};

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const [editing, setEditing] = useState(false);
  const [taskText, setText] = useState(task.text);
  const dispatch = useTasksDispatch();

  function renderFields() {
    if (editing) {
      return (
        <React.Fragment>
          <input
            className="border-2 border-solid border-cyan-400"
            value={taskText}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={() => {
              dispatch({
                type: "change",
                task: {
                  ...task,
                  text: taskText,
                },
              });
              setEditing(false);
            }}
          >
            Save
          </button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <span>{task.text}</span>
          <button onClick={() => setEditing(true)}>Edit</button>
        </React.Fragment>
      );
    }
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) =>
          dispatch({
            type: "change",
            task: {
              ...task,
              done: e.target.checked,
            },
          })
        }
      ></input>
      {renderFields()}
      <button
        onClick={() =>
          dispatch({
            type: "delete",
            task,
          })
        }
      >
        Delete
      </button>
    </div>
  );
};
