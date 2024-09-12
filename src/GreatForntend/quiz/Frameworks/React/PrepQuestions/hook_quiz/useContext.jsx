//? What is the purpose of the useContext hook in React.js?
//*To consume a context value

//? When using the useContext hook in React.js, what is the primary purpose of the context provider?
//* To provide the context value to its descendants

//? How do you create a context in React.js?
//* Using the createContext function

//? In a functional component, how do you consume a context using the useContext hook?
//* const context = useContext(ContextName);

//? How can you provide a default value to a context using the createContext function in React.js?
//* By passing a default value to the createContext function

//? Can you use the useContext hook inside a class component?
//* No

//? What happens if the context provider is not present in the component tree when using useContext?
//* The useContext hook returns the default value

//? How do you provide a context value using the Context.Provider component?
//* <Context.Provider value={contextValue}>...</Context.Provider>

//? What is the purpose of the defaultValue parameter in the createContext function?
//* To set a default value for the context

//? How can you access the context value outside of the render function in a functional component?
//* Creating a separate custom hook (it can be used in another hook for example)

//? In the useContext hook, what should be passed as an argument to identify the context to be consumed?
//* Context object: useContext(SomeContext)

//? What is the purpose of the displayName property when defining a context with createContext?
//* It is used for debugging purposes

//? How can you update the context value dynamically using the useContext hook?
//* By updating the value provided by the context provider 
//! not sure if its formulated correctly
//* If we want to update context value. we can use state(useState/useReducer), and provide methods for updating

//? When using multiple contexts in a component, how do you consume them using useContext?
//* Call useContext for each context separately

//? What is the purpose of the Provider component in the context API?
//* To provide the context value to its descendants

//? How can you use the useContext hook in a class component?
//* Wrap the class component with a functional component that uses useContext

//? What is the purpose of the useContext hook in the component lifecycle?
//* It is not related to the component lifecycle

//? How can you share state logic between components using useContext?
//* Define a context that holds the shared state (state lifting)

//? In a context provider, how can you provide multiple values to different parts of the component tree?
//* Use the value prop with an object containing multiple values
//* or using several separate context 
//eg for useReducer we can use StateContext and StateDispatchContext in combo, 

//? What happens if you nest multiple context providers in the component tree?
// ! need to mention that they are similar contexts (StateContext and StateContext) similar providers
//* The innermost provider overrides the values of the outer providers
// if they are different we can access particular context by context object 