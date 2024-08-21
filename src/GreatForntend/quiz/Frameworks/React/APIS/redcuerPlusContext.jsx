// * Scaling up wwith Reducer and Context

// Reducers let us consolidate(объединить) a component state update logic. Context let us
// pass information deep doen to other components. We can combine reducers and context together to
// manage state of a complex screen,

// Combine a reducer with context
//In this exmaple the state is managed by a reducer. reducer function contains all of the
// state update logic and is declared at the bottom of this line:
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <h1>Day off in Kyoto</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];


// A reducer helps keep the event handlers short and concise. However, as our app growns, we might run into another
// dificulty. //* Currently the task state and the dispatch function are only available in the top level TaskApp component
// To let other component read the list of tasks or change it, we have to explicity pass down the current state and 
// the event handlers that change it as props

// For example TaskApp passes list of tasks and the event handler to TaskList:
// /And TaskList passes the event handlers to Task:
<>
<TaskList
  tasks={tasks}
  onChangeTask={handleChangeTask}
  onDeleteTask={handleDeleteTask}
/>
<Task
  task={task}
  onChange={onChangeTask}
  onDelete={onDeleteTask}
/>
</>

// In a small example like this this works well but if we have tens or hundrens of components in the middle, passing
// down all state and functions can be quiet frustratiing!
// Thats why we need a context, to avoid prop drilling

//Here is how you can combine a reducer with context:
//Create the context.
//Put state and dispatch into context.
//Use context anywhere in the tree.

//todo Step 1: Create the context 
//the useReducer Hook returns the current tasks and the dispatch function that lets you update them:
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
//To pass them down the tree, we will create two separate contexts:
//Export them from a separate file so that you can later import them from other files:
import { createContext } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

//Here, you’re passing null as the default value to both contexts. 
//The actual values will be provided by the TaskApp component.

//todo Step 2: Put state and dispatch into context 
//Now we can import both contexts in your TaskApp component. 
//Take the tasks and dispatch returned by useReducer() and provide them to the entire tree below:

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  // ...
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        ...
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
//For now, you pass the information both via props and in context:
//In the next step, we will remove prop passing.

import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <h1>Day off in Kyoto</h1>
        <AddTask/>
        <TaskList/>
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId2 = 3;
const initialTasks2 = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];


//todo Step 3: Use context anywhere in the tree 
//Now we don’t need to pass the list of tasks or the event handlers down the tree:


export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext);
  // ...
  return (
    // ...
    <button onClick={() => {
      setText('');
      dispatch({
        type: 'added',
        id: nextId++,
        text: text,
      });
    }}>Add</button>)
}
//* The TaskApp component does not pass any event handlers down, 
//* and the TaskList does not pass any event handlers to the Task component either

//The state still “lives” in the top-level TaskApp component, managed with useReducer.
// But its tasks and dispatch are now available to every component below in the tree by importing and using these contexts.


//todo Moving all wiring into a single file 
//You don’t have to do this, but you could further declutter 
//the components by moving both reducer and context into a single file

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
//* This removes all the complexity and wiring from your TaskApp component:

import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}

//WE can also export functions that use the context from TasksContext.js:
// custom hooks
export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
//When a component needs to read context, it can do it through these functions:
const tasks2 = useTasks();
const dispatch2 = useTasksDispatch();

//Now all of the context and reducer wiring is in TasksContext.js. This keeps the components clean and uncluttered, 
//focused on what they display rather than where they get the data:

//* We can think of Taskprovider as a part of the screen that knows how to deal with tasks, useTasks is a way to read them.
// * and useTasksDispatch as a way to update them from any component below in the tree

//?Functions like useTasks and useTasksDispatch are called Custom Hooks. 

// /As your app grows, you may have many context-reducer pairs like this. This is a powerful way to scale your 
//app and lift state up without too much work whenever you want to access the data deep in the tree.

//todo Why React context is not a state management tool and why it doesnt replace redux

// * context provides a way to pass data through the component tree 
// Context doesnt actually manage anything at all, instead is like a pipe or wormhole


//* redux is a pattern and library for managing and updating app state using events called actions
// it helps ti manage global state - that is needed across many parts of application

// pattern and tools provided by redux make it asier to understand when where why and how
// the state in application is being updated

// redux implements Flux pattern that uses functional programming prinicplesto help us
// write as much of our code as predictable reducer functions.. Redux also uses middleware
// as way to extend the capabilities of the redux store including handling side effects.

//React-redux library allows any react component in the application to talk to the Redux store.
// This is only possible because //!React-Redux uses Context internally(внутри).
// ! However its critical to note that React-redux only passes down the Redux store instance
//! via context, not the current state value! (передает только экземпляр хранилища через контекст
//! а не текущее значение состояния)
// This is actually an example of using context for dependency injection, as mentioned above.
// We know that our redux-connected react components need to talk to redux store, but we 
// dont know or care which Redux store that is when we define the component. 
// The actual Redux store is injected into the tree at runtime, using React-redux <Provider />
// component (мы знаем что компоненту подключенному к редакс нужно взаимоедйствие с хранилищем
// но мы не знаем и не заботимся какое это хранилище когда определяем компонент
// Фактическое хранилище редакс вводится в дерево во время выполнения с помощью провайдера )
//* because of this React-redux also can be used to avoid prop-drilling, especially
//* because React-Redux uses Context internally instead of explicity putting a new value into
//* provider

// Besides problem with props-drilling we might want to use redux because of the following reasons:
// 1 Wanting to write state management logic completely separate from UI
// 2 Sharing state management logic between different UI layers (eg during migration from ANg to React)
// 3. using the power of  Redux middleware to add additional logic when actions are dispatched
// 4. Being able to persist portions of the Redux store (сохранять части состояния редакс)

// State management is gow state changes over time so this is not Context,
// React useState and useReducer are good example of state management

// ! Context and useReducer
// About Context + useReducer combination.
// Yes. Context+useReducer look really similar like Redux+Rect-redux, they both have:
// 1. stored value
// 2. a reducer function
// 3. dispatching action
// 4. a way to pass down that value and read in nested components

//* However, theres still a number of very significant differences in the capabilities
//* and behaviour of Context + useReducer vs Redux + React-Redux:
//Summary:
//! 1. Context+useReducer relies on passing the current state value via context.
//* React-Redux passes the current Redux store instance via context
//! That means that when useReducer produces a new state value, all components,
//! that are subscribed to that context will be forced to re-render
//! even if they only care about part of data
// This may lead to performance issues, depending on the size of the state value,
// how many components are subscrobed to that data, and how often they re-render
//* With React-Redux, components can subscribe to specific pieces of the store state
//* and only re-render when those values change
// 2. useReducer does not have middleware, we can try useEffect but it is limited.

//todo What to choose:
// 1 only props drilling - Context
// 2 some moderately complex react component state - Context + useReducer
// 3 better traceability(отслеживаемость) of the changes to state over time and need to
// ensure that only specific components re-render when the state changes, need more powerful
// capabilities for managing side effects, use react + redux