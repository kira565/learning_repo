//? What is the primary purpose of the useReducer hook in React?
// * Handling complex state logic ( eg when some props are depends on another props )

//? In the useReducer hook, what is the role of the dispatch function?
//* Triggering reducer actions

// Exp:
//The dispatch function in useReducer is used to trigger actions that modify 
//the state based on the defined reducer function.

//? What is the expected return value from the useReducer hook?
// * An array with state and dispatch function

//? When using useReducer, where is the state typically defined?
// * Inside the useReducer hook

//? What is an action in the context of useReducer?
// * An object describing the state change

//? How does useReducer handle multiple actions in a component?
// ! By using multiple useReducer hooks - PROBABLY NOT CORRECT ANSWER
// multiple actions are defined in reducer function utilizing switch(action.type) {}

//? What is the purpose of the initial state argument in useReducer?
// * To define the default state of the component

//? In useReducer, when is the reducer function called? 
// * Only when the dispatch function is explicitly called (reducer function called by 
// * dispatch function (it dispatches action))

//? How can you access the current state in the useReducer hook?
//* By directly accessing the state variable

//? What is the recommended use case for the useReducer hook in React?
//* Managing global application state

// Exp:
// useReducer is recommended for managing global application state and handling complex state logic.
// However it depends on compexity of state, eg form states that are complex and filends depends on each other

//? What is the key benefit of using the useReducer hook over useState in certain scenarios?
//* Improved performance

//Exp:
//useReducer can offer improved performance in scenarios involving complex state logic, as it allows 
//for more granular control over state updates.

//? In useReducer, what is the purpose of the action type within the dispatched action object?
// * To identify the action to be performed

//? How can you handle asynchronous operations in conjunction(соединение) with the useReducer hook?
// * By using a separate useEffect hook

//? What is the significance of the third argument in the useReducer hook, often referred 
//? to as the 'initializer' function?

// * To initialize the state based on external conditions, func allows dynamic state initialization.

//? In useReducer, when might you consider using the useContext hook in combination with it?
//* To share state among multiple components

//? What is the role of the second argument (initial state) in the useReducer hook?
// * To define the default state of the component

//? How does useReducer contribute to code organization and maintainability in larger React applications?
// * By centralizing state logic

//? What is the purpose of the useReducer's 'dependencies' array in the dependency optimization pattern?
//* The 'dependencies' array in useReducer is used to optimize re-renders by preventing unnecessary updates when specific dependencies haven't changed.

//? In useReducer, what is the primary difference between the 'dispatch' function and the 'useState' 
//? function used in conjunction with useState?

//* The 'dispatch' function allows for more complex updates

//? When implementing undo/redo functionality in a React application, 
//? how might useReducer facilitate this feature? 
//* By maintaining a history of state changes

// useReducer can be utilized to maintain a history of state changes, enabling the implementation of
// undo/redo functionality by navigating through the state history.undo/redo functionality by navigating
// through the state history.