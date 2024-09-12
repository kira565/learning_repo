
// * useRef

//? What is the primary purpose of the useRef hook in React?
// *reference dom elements

//? When should you use the useRef hook?
// * reference dom elements

//? What problem does the useRef hook solve?
// * accessing and managing dom elems

// but also to keep variables that doesnt need in rendering and not related to component state (like store timeoutId or intervalId)

//? How does the useRef hook improve performance?
// * reducing components rerenders

// Explaination:
//UseRef improves performance by providing a way to
// access and manipulate DOM elements without causing unnecessary re-renders of components, maintaining performance.

//? When should you avoid using the useRef hook?
//*  when need to manage component state

//? Can the useRef hook be used to access and modify DOM elements?
//* Yes it provides access to DOM elements

//? How does the useRef hook handle changes to the referenced DOM element?
//* It preserves the reference to the DOM element

// Explaination:
// The useRef hook preserves the reference to the DOM element even if it changes, allowing you to access and manipulate 
// it without causing unnecessary re-renders of the component.

//? Can the useRef hook be used to store and update component state?
//* No, it cant be used to store state, its changes dont cause a rerender of component

//? In what scenarios might the useRef hook not provide significant benefits?
// * When only static references to DOM elements are needed

// Explaination:
// The useRef hook may not provide significant benefits when only static references to DOM elements are needed,
// as its primary purpose is to allow interaction with dynamic elements.

//? How does the useRef hook handle references to unmounted components?
// * It retains(сохраняет) the reference until manually cleared

// Explaination:
// The useRef hook retains(сохраняет) references to unmounted components until they are manually cleared, 
// nsuring that you can safely access and manipulate them even after they are unmounted

//? What is the primary difference between useRef and useState?
// * useState is for managing component state, while useRef is mainly for referencing DOM elements and keep information that 
// * shoudnt affect rendering proccess

//? Can the useRef hook be used to create persistent variables across re-renders?
//* Yes, useRef creates persistent variables

//Explaination:
//Yes, the useRef hook can be used to create persistent variables across(при) re-renders, as the ref object retains its value between renders.

//? How does the useRef hook handle re-renders of the component?
//* It preserves the reference to the DOM element

//? Can the useRef hook be used to store and update component props?
// * No props of component are immutable.

//? What is the main benefit of using useRef for referencing DOM elements?
// * It allows safe access and manipulation of DOM elements

//? if We dont pass innitial value argument "useRef()" what will return
// * Result will be { current: undefined } so its recommended to make useRef(null) will return { current: null }

//? How can you use the useRef hook to manage focus in a React component?
// * By attaching a ref to the focused element and using the useRef hook to track its focus state

//? Can the useRef hook be used to store and maintain mutable values between renders?
//*  Yes, useRef is suitable for storing mutable values

// Explain: Yes, the useRef hook can be used to store and maintain mutable values between renders, 
// as it creates a mutable ref object that persists across re-renders of the component.