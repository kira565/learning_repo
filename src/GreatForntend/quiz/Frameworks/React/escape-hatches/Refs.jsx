// * Referencing values with refs
// When we want a component to "remember" some information , but we dont want that information to trigger new renders,
// we can use ref

//* Adding ref to component
// we can add a ref to component using useRef hook in React:
import { useRef } from 'react';
const ref = useRef(0);
//useRef returns an object like this:
const refObj = { 
  current: 0 // The value you passed to useRef
}

// We can access the current value of that ref through ref.current property. This value is intentionally mutable, meaning
// we can both read and write ti it. It's like a secret pocket of component that React doesnt track. 
//? this is what makes it an "escape hatch"(аварийный люк) from React's one-way data flow

//Example:
// here is a button will increment ref.current  on every click
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}
//The ref points to a number, but like state we could point to anything: string, object, etc... Unlike state, ref is a plain
// Javascript object, with the current property that we can read and modify

//! Note: component doesnt re-render with every increment.
// Like state, refs are retained(сохраняется) by React between re-renders. However, setting state re-render a component.
// Changing ref does not!

// * Example; building a stopwatch
// We can combine refs and state in a single component. For example, lets make a stopwatch, that user can start or stop by
// pressing a button. In order to display how much time has passed since the user pressed "Start", we need to keep track
// of when the Start button was pressed and what the current time is.
//! This information is used for rendering, so we will keep it in state;
// When the user press "Start" w will see setInterval in order to update the time every 10 ms:
import { useState } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);

  function handleStart() {
    // Start counting.
    setStartTime(Date.now());
    setNow(Date.now());

    setInterval(() => {
      // Update the current time every 10ms.
      setNow(Date.now());
    }, 10);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>
    </>
  );
}

// When the "Stop" button is pressed, we need to cancel the existing interval so that it stops updating the now state variable
// We can do this by calling clearInterval, but we need to give it intervalId, that was previously returned by the setInterval
// call when the user presset Start. We need to keep interval ID somewhere.
//! Since the intervalId is not used for rendering, we can keep it in ref:
import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>
      <button onClick={handleStop}>
        Stop
      </button>
    </>
  );
}

//! When a piece of information is used for rendering, keep it in state
//! When a piece of information is only needed by event handlers and changing it doesnt require a re-render,
//! using a ref may be more efficient

// todo DIFFERENCES BETWEEN REFS AND STATE
// It could seems like refs less trict than state - they are mutable and we can yse them in many cases. But in reality,
// in most cases we want to use state. Refs are an "escape hatch", we wont need often. Heres how state and refs compare:

//              refs                                                                        state
// useRef(initialVal) returns {current: initialValue}            useState(initialValue) returns curr val and setter [val,setVal]

// Doesnt trigger re-render when we change it                   Trigger re-render when we change it

// Mutable - we can modify and update current value             "Immutable" - we must use the state setting function to 
// outside of the rendering proccess                            modify state variables to queue a re-render

// We shouldnt read or write the current value                  We can read state at any time. However each render has its own
// during renderning                                            snapshot of state which doesnt change

// * Here is a counter button that implemented with state:
// Unlike previous examle when we show current click inside browser alert, 
// here we need value displayed, thats why we need to use state, cuz we need a re-render
// ! with ref it wont work cuz it doesnt cause a re-render
// This is why reading ref.current during render leads to unreliable code. If we need that, use state instead
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      You clicked {count} times
    </button>
  );
}

//? DEEP DIVE: HOW DOES useRef work inside?
// Although (хотя) useState and useRef are provided by React, in principle useRef could be implemented on top of useState
// (поверх useState), We can imagine that inside of React, useRef is implemented like this:
// Inside of React
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
// During the first render, useRef returns {current: initialValue}. This object is stored by React, so during the next render 
// the same object will be returned. //! Note how the state setter is unused in this example. It is unecessary because
//! useRef always needs to return the same object!

// React provides a built-in version of useRef because it is common enough in practice. But we can think of it as a regular
// state variable without a setter.

//todo WHEN TO USE REFS
// Typically, we will use ref when our component needs "step outside"(выйти наружу реакта) React and communicate with
// external APIs - often a browser API that will not impact the appearance of the component. Here are a few of these
// rare situations:

// 1. Storing timeout IDs
// 2 Storing and manipulating DOM Elements
// 3 Storing other objects that arent necessary to calculate the JSX

//! If component needs to store some value, but it doesnt impact the rendering logic, choose refs

//todo BEST PRACTICES:

// Following these principes will make your component more predictable

        //1. Treat refs as an escape hatch! (запасной выход). Refs are useful when you work with external systems
        //or browser APIs. If much of our application lofic and data flow relies on refs, we might want to rethink
        // our approach

        // Dont read or write ref.current during rendering. If some information is needed during rendering, use state
        // instead. Since React doesnt know when ref.current changes, even reading it while rendering makes component
        // behaviour difficult to predict.(The only exception here is code like if(!ref.current) ref.current = something)
        // which only sets the ref once during the first render

// Limitations of React state dont apply to refs (Ограничения состояния в реакте не распостраняются на ссылки). For example
//! state acts like a snapshot every render and doesnt update synchronously. But when we mutate the current value of a ref,
//! it changes immidiately:
// ref.current = 5, console.log(ref.current) //5
//* this is because ref itself a regular javascript object, and it behaves like one
// We also shouldnt care about avoiding mutation, because ref is not used for rendering. React doesnt care what we do with refs.        

// todo REFS AND THE DOM
// We can point a ref to any value. However the most common use case for refs is to access DOM element. For example, this is handy if we want
// to focus an input programmaticaly. When we pass a ref to a ref attribute in JSX, like <div ref={myRef} /> React will put the correpsonding
// DOM element into myRef.current. Once the element is removed from the DOM, React will update myRef.current to be null.
//? We can read more aboit it <Manipulating the DOM with Refs>

//todo RECAP

// 1. Refs are an escape hatch to hold onto values that arent used for rendering. We wont need them often.
// 2. A ref is a plain JS object with single property current, which we can read or set.
// 3. We can ask React to give our ref by calling useRef Hook
// 4. Like state, refs let us retain information between re-renders of a component
// 5. Unlike state, setting the ref current value doesnt trigger a re-render,
// 6. Dont read or write ref.current during rendering, this makes component hard to predict