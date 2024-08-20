// * Memo 
// memo lets us skip re-rendering a component when its props are
// unchanged

const MemoizedComponent = memo(SomeComponent, arePropsEqual); //arePropsEqual?

//todo Reference
//Wrap a component in memo to get a memoized version of that component
// This memoized version of component will usually not be re-rendered
// when its parent component is re-rendered as lons as its prop have
//not changes. But React may still re-render it: memoization is a 
// performance optimization not a guarantee

import { memo } from 'react';

const SomeComponent = memo(function SomeComponent(props) {
  // ...
});

//* Parameters:

// Component: the component that we want to memoize. The memo does not modify 
// this component, but returns a new memoized component instead. Any valid React component
// including functions and forwardRef component is accepted

// optional arePropsEqual: A function, that accepts two arguments: pre props and new props,
// It should return true if the old and new props are equal: that is, if component will rerender
// the same output and behave in the same way with the new props as with the old. Otherwise it should
// return false. Usually we will not specify this function, by default React will compare each prop with Object.is

// Returns exact same component that not always rerender when parent being rerendered

//? DEEP DIVE Should i add memo everywhere?
// Optimizin with memo is only valuable when our component re-renders often with the same exact props and its
// re-rendering logic is expensive. If there is no perceptible lag when component re-renders, memo is unecessary.
//! keep in mind that memo is useless when props passed are always different, this is why we often need useMemo and useCallback

// todo Updating a memoized component using a context
// Even when a component is memoized it will still re-render when a context that is using changes. Memoization only has to do
// with props that are passed to the component from its parent
//todo Minimizing props changes
// When we use memo component rerender whenever any prop is not shallowly equa to what previously. That means
// React compares every prop with its prv value using Object.is comparsion.
// Note that Object.is(3,3) is true, but Object.is({},{}) is false.
//! if prop is an object, prevent the parent component from re-creating that object every time bu using 
//! use memo
  const person = useMemo(
    () => ({ name, age }),
    [name, age]
  );

//! A better way to minimize props changesm is to make sure the component accepts the minimum necessary information
//! in its props It could accept individual value instead of whole object:
<Profile name={name} age={age} />;


//todo Specifying a custom comparator
// In rare cases may be useful when we cant minimize props changes. 
//!PITFALL 
// If we provide a custom arePropsEqual //! WE MUST COMPARE EVERY PROP INCLUDING FUNCTIONS
//! if we return true when oldProps.onClick !== newProps.onClick it can cause bugs,
//! because these functions close over the props or state of parent component
//! AVOID doing deep equality