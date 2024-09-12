// ? What is the primary purpose of the useMemo hook in React?
// * To memoize function results

//? When should you use the useMemo hook?
// * When you need to memoize function results to prevent unnecessary  and some other cases like preventing child re-render

// ? What problem does the useMemo hook solve?
//* Avoiding unnecessary re-renders

//? How does the useMemo hook improve performance?
// * By reducing the number of component re-renders

//? When should you avoid using the useMemo hook?
//* When the function is rarely used, or if result is not passed to children if its nt complex operation

//? What happens if you omit the dependencies array in the useMemo hook?
// *The function will always be memoized

//? Can useMemo be used to memoize asynchronous functions?
//* Yes, it can effectively memoize asynchronous functions 
//! Im not sure

//? What is the main benefit of memoizing function results using useMemo?
//* It prevents unnecessary re-renders also with reducing memory consumption in som cases

//? How does useMemo handle functions defined within the component's scope?
//* It requires explicit memoization using useMemo

//? In what scenarios might useMemo not provide significant performance benefits?
//* When the function result is frequently updated
//as the overhead of memoization may outweigh the benefits.

//? How does useMemo handle values passed as props to child components?
// * It memoizes values only if explicitly specified

//? Can useMemo be used to memoize values that change over time, such as the current time?
//* No, useMemo can only memoize static values
// there is no point to memoize value that changes over time.

//? What is the recommended approach for determining the dependencies array in useMemo?
// * same like in useCallback, need to provide all dependent variables used within the function
// but try to use primitives, if there is reference type we can make it with JSON.stringify(obj, array and so on)

//?What is the impact of using useMemo on the component's memory usage?
//* It reduces memory consumption by memoizing function results if used correctly

// ?In which scenarios might useMemo not be necessary?
// * When all values are defined within the component's scope and not passing down to the child components, also some other cases with memooverhead

//? How does useMemo handle values defined outside the component's scope?
// * It memoizes external values only if explicitly specified

//? What is the main disadvantage of using useMemo?
// * Potential increase in memory consumption
// in some cases with memooverhead

//? How does useMemo help in optimizing the performance of child components?
//* By reducing the number of re-renders in combination React.memo()

//? Can the useMemo hook be used to memoize complex computations?
//* Yes, it is suitable for memoizing all types of computations