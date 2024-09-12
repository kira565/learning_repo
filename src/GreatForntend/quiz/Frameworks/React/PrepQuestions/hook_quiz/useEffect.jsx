//? The code inside the return block of useEffect runs at which of the following action?
// * Before component unmounting OR execution of the next useEffect (clean up before next effect)

//? How many calls we can make for useEffect or useState in a single component?
//* Unlimited

//? Which of the following is associated with the execution of useEffect in react?
//* Asynchronous
//useEffect runs asynchronously, ensuring it does not block the browser from rendering during its scheduled effects.

//? Return function inside useEffect is called?
//* CleanUp function

//? Which of the following could be an application of return function in useEffect?
//* all of these (avoid memory leaK(unsubscribe), remove unwanted things, reallocate resources)

//? Which of the following can be the possible arguments of useEffect()?
//* callback function and dependency array

//? What is the primary purpose of the useEffect hook in React?
//* To handle side effects

//? When should you use the useEffect hook?
//* When you want to trigger a side effect

//? What problem does the useEffect hook solve?
//* Handling side effects in functional components
// allowing developers to perform tasks like data fetching, subscriptions, or DOM manipulation.

//? How does the useEffect hook improve performance?
//* By reducing the number of component re-renders
//UseEffect improves performance by allowing developers to handle side effects in a declarative way, 
//reducing the need for manual cleanup and preventing unnecessary re-renders (with providing dependencies)

//? When should you avoid using the useEffect hook?
// * When you need to manage component state. We need to choose useState for this.

//? Can the useEffect hook be used to perform data fetching?
//* Yes, it's a recommended approach for data fetching

//? What is the purpose of the dependency array in the useEffect hook?
//* To define the dependencies for the effect
//When any of the dependencies change, the effect will re-run.

//? What happens if you omit the dependency array in the useEffect hook?
//* The effect will run on every render, when [] - only once

//? Can you call useEffect inside a conditional statement?
//* Yes, but it's not recommended

//? What is the purpose of returning a cleanup function in useEffect?
//* To clean up after the effect has been applied (clean up before next event) or when component unmounted

//? When does the cleanup function in useEffect run?
//* Before the component unmounts (or before next effect)

//? What is the effect of having an empty dependency array in useEffect?
//* The effect will run once after the initial render

//? Can you use async/await inside the callback function of useEffect?
//* Yes, it's a recommended approach

//? How do you handle cleanup for a subscription in useEffect?
//* Call the cleanup function returned by useEffect
//! probably it means not to call because its calling itself, but unsubscribe inside cleanup function

//? Is it safe to perform DOM manipulation inside the useEffect hook?
//* It depends on the specific use case (eg addEventListeners are recommended to be used here, but 
//* maybe we can avoid it using event handlers) so, for real DOM is ok, but for ReactDom its better to use react event handlers