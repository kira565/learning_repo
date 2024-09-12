// ? What is the primary purpose of the useCallback hook in React?
// * To memoize functions

//? When should you use the useCallback hook?
//* When you need to memoize a function to prevent unnecessary renders

//? What problem does the useCallback hook solve?
//* Avoiding unnecessary re-renders

//? How does the useCallback hook improve performance?
//* By reducing the number of component re-renders

//? When should you avoid using the useCallback hook?
// ! When the function is rarely used - Im not sure
//* 1. When the function is not passed to child components
// Because with this hook we primarly need to prevent rerenders of child component , and because the fact,
// that all children compoents rerenders when parent re-renders, we need to use it in combination
// with React.memo() HOC for child component, which allows us to not rerender if props are same

//? What happens if you omit the dependencies array in the useCallback hook?
// * The function will always be memoized
// Exp:
// meaning it won't change between renders.

//? Can useCallback be used to memoize asynchronous functions?
//! No, useCallback is only for synchronous functions - its not true, we can use async functions wrapped in useCallback
// Asynchronous functions require different memoization techniques.

//? What is the main benefit of memoizing callback functions using useCallback?
// * It prevents unnecessary re-renders

//? How does the useCallback hook handle functions defined within the component's scope?
//* It requires explicit memoization using useCallback

//? In what scenarios might useCallback not provide significant performance benefits?
//* When the function is frequently updated
//as the overhead of memoization may outweigh the benefits.

//? How does useCallback handle functions passed as props to child components?
//* It memoizes functions only if explicitly specified

//? Can useCallback be used to memoize functions that use useState or useContext hooks?
// * Yes, it memoizes functions containing useState or useContext calls

//? What is the recommended approach for determining the dependencies array in useCallback?
//* First of all its better to use primitive becasue react uses Object.is for comparsion. So primitives are not comparing by refference,
// * while object are. So to use objects in dependency array, make sure that this object was also memoized using useMemo()
  const person = useMemo(
    () => ({ name, age }),
    [name, age]
  );
//* now it can be safely used as dependency
//difference between Object.is and === :
Object.is(NaN, NaN); // true
Object.is(-0, 0); // false 
// and wiseversa
//! we can use JSON.stringify( [], {} <or any other reference type>) to pass it inside depednencies array
//! we always need to try to avoid extra dependencies which are not changes or changes everytime, in 2nd case its useless to memoize

//? What is the impact of using useCallback on the component's memory usage?
// * It reduces memory consumption by memoizing functions 
//! IDK can be wrong

//? In which scenarios might useCallback not be necessary?
//* When all functions are defined within the component's scope
// Exp: 
// They not need to be passed as props or used by child components.

//? How does useCallback handle functions defined outside the component's scope?
// * It memoizes external functions only if explicitly specified

//? What is the main disadvantage of using useCallback?
//* Potential increase in memory consumption
//  due to the memoization overhead, which may outweigh the performance benefits in certain scenarios.

//? How does useCallback help in optimizing the performance of child components?
//* By reducing the number of re-renders triggered by function changes

//? What is the difference between the useMemo and useCallback hooks?
// * useMemo is used for memoizing function results, while useCallback is used for memoizing functions themselves