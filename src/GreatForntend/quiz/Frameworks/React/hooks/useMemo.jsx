//* useMemo performance hook
// use Memo is a React hook that let us cache the result of a calculation between re-renders
const cachedValue = useMemo(calculateValue, dependencies)
// todo Reference
// Call use memo at the top level of component to cache a calculation between rerenders
import { useMemo } from 'react';

function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  // ...
}

//? Note: caching values like this is also known as memoization

//todo USAGE

// * Skipping expensive recalculations
// To cache a calculation between re-renders, wrap it in a useMemo call at the top level of component
// On initial render the value we get from useMemo will be the result of calling our calculation

// on evert sunsequent render React will compare the dependencies with dependencies we passed during last render
// Object.is comparsion. If none of dependencies have changed, useMemo will return the value we already calculated before

//!In other words, useMemo caches a calculation result between re-renders until its dependencies change.

//Lets see when its useful
// By default React will re-run the entire body of component every time it re-renders. 
// eg filterTodos fucntion will re-run
function TodoList({ todos, tab, theme }) {
  const visibleTodos = filterTodos(todos, tab);
  // ...
}
// usually this isnt a problem because most calculation are very fast. However, if we giltering or transform
// a large array, or doing expensive compution, we might want to skip doing it again. 

//? Note: we should only rely on useMemo as a performance optimization. If our code desnt work without it, 
//? this is another problem

//?DEEP DIVE: HOW TO TELL IF A CALCULATION IS EXPENSIVE-------------------------------------------------------------
// In gerneral unless we are creating or looping over thousands of objects, its probably not expensive. If we 
// want to get more confidence, we can add a console log to measure time spend in piece of code
console.time('filter array');
const visibleTodos = filterTodos(todos, tab);
console.timeEnd('filter array');
// We will see logs like filter array: 0.15ms in console. If the overall logged time adds up to a signigicant amount
// (say 1ms or more) it might make sense to memoize that calculation. As an experiment we can then wrap the
// calculation in use Memo to verify whether the total logged time has decreased for that ineraction or not
console.time('filter array');
const visibleTodos2 = useMemo(() => {
  return filterTodos(todos, tab); // Skipped if todos and tab haven't changed
}, [todos, tab]);
console.timeEnd('filter array');
//useMemo won’t make the first render faster. It only helps you skip unnecessary work on updates.

// Keep in mind that our machine probably faster than users, so its good idea to test the performance with an artificial
//slowdown. For exmaple Chrome offers a CPU throttling option for this.

// Also note that measuring performance in development will not give the most accurate results. To get mist accurate
// timings build our app for prod and test it on a device like user have.

//? DEEP DIVE: Shold we add ueMemo everywhere---------------------------------------------------------------------------
// If the app is similar to documentation resource, and most interactions re coarse (like replacing page)
// memoization is usually unecessary. On the other hand, if app is more like a drawing editor and
// most interactions are granular (like moving shapes), then we might need it.

//! Optimizing with useMemo is only valuable in few cases:
// 1. The calculation is noticable slow and its dependencies rarely change.
// 2. We pass it as prop to a component wrapped in memo. We want to skip re-rendering if the value hasnt changed.
// Memoization lets our component re-render only when dependencies arent the same
// 3. The value we passing is later used as dpendency of some Hook. For example, maybe another useMemo
// calculation value depends on it. Or maybe we are depending on this value from useEffect

// There is no benefir of using useMemo in other cases. This is not also significantly harmful. But it has 
// the downside: code becomes less readable, also not all memoization is effective, a single value thats always new
// is enough to break memoization of an entire component

//! In practice we can make a lot of memoization unecessary by following a few principles:
// 1. When a component visually wraps other let it accept jsx as children. This way when wrapper component
// updates its own state, React knows that its children dont need to re-render
// 2. Prefer local state and dont lift state up any further than necessary. For example dont keep transient(переходящее) state
// like forms and whether an item is hovered at the top of tree in a global state library(like redux)
// 3. Keep rendering logic pure. 
// 4. Avoid unecessary Effects that update state. Most performance problems in React apps
// are caused by chains of updates originating from Effects that cause rerender over and over.
// 5. Remove unecessary dependencies from Effects instead of memoization.

//If a specific interaction still feels laggy, use the React Developer Tools profiler to see which 
//components would benefit the most from memoization, and add memoization where needed.

//todo Memoizing dependency of another hook
// Suppose we have a calculation that depends on an object created in component body
const searchOptions = { matchMode: 'whole-word', text };
const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions]); // 🚩 Caution: Dependency on an object created in the component body
  // ...
// Depending on a object like depeaths the point of memoizaiton. All code runs again
//!The lines of code creating the searchOptions object will also run on every re-render
  const searchOptions2 = useMemo(() => {
    return { matchMode: 'whole-word', text };
  }, [text]); // ✅ Only changes when text changes

    const visibleItems2 = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions2]); // ✅ Only changes when allItems or searchOptions changes
  // ...
  //!However, an even better fix is to move the searchOptions object declaration inside of the useMemo calculation function:
   const visibleItems3 = useMemo(() => {
    const searchOptions = { matchMode: 'whole-word', text };
    return searchItems(allItems, searchOptions);
  }, [allItems, text]); // ✅ Only changes when allItems or text changes

  // todo Memoizing a function
  //Suppose the Form component is wrapped in memo. You want to pass a function to it as a prop:
  export default function ProductPage({ productId, referrer }) {
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails
    });
  }

  return <Form onSubmit={handleSubmit} />;
}
// if the Form component is memoized, presumably you want to skip re-rendering it when no props have 
//changed. A prop that is always different would defeat the point of memoization.
export default function Page({ productId, referrer }) {
  const handleSubmit = useMemo(() => {
    return (orderDetails) => {
      post('/product/' + productId + '/buy', {
        referrer,
        orderDetails
      });
    };
  }, [productId, referrer]);

  return <Form onSubmit={handleSubmit} />;
}

//!This looks clunky! Memoizing functions is common enough that React has a built-in Hook specifically 
//!for that. Wrap your functions into useCallback instead of useMemo to avoid having to write an extra nested function:
export default function Page({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails
    });
  }, [productId, referrer]);

  return <Form onSubmit={handleSubmit} />;
}