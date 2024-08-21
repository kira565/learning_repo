import { createContext, ReactNode, useContext, useReducer } from "react";

export interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface TaskAction {
  type: "delete" | "add" | "change";
  task: Task;
}

const TaskContext = createContext<Task[]>([]);
const TaskDispatchCotnext = createContext<React.Dispatch<TaskAction> | null>(
  null
);

export const TaskProvider: React.FC<{ children: ReactNode[] | string }> = ({
  children,
}) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TaskContext.Provider value={tasks}>
      <TaskDispatchCotnext.Provider value={dispatch}>
        {children}
      </TaskDispatchCotnext.Provider>
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};

export const useTasksDispatch = () => {
  const dispatch = useContext(TaskDispatchCotnext);
  if (!dispatch) {
    throw Error("Dispatch value is undefined");
  }
  return dispatch;
};

const taskReducer = (tasks: Task[], action: TaskAction) => {
  const { id, done, text } = action.task;
  switch (action.type) {
    case "add": {
      return [
        ...tasks,
        {
          id,
          done,
          text,
        },
      ];
    }
    case "delete": {
      return tasks.filter((task) => task.id !== action.task.id);
    }
    case "change": {
      return tasks.map((task) => {
        if (task.id === id) {
          return action.task;
        } else {
          return task;
        }
      });
    }
    default: {
      throw Error("Unknown action" + action.type);
    }
  }
};
