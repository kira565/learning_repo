//@ts-nocheck
// * Queueing a series of state updates
// Setting a state variable will queue another render. But sometimes we might
// want to perform multiple operations on the value before queueing the next render
// To do this, it helps to understand //? How react batches state updates

// * React batches state updates

// Remember that
<button
  onClick={() => {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1);
  }}
>
  +3
</button>;
// This code , each render state values are fixed so the value of number will increase
// by +1 every click

// But there is one other gactor at play here.
//* React waits until all code in the event handlers has run before processing state update
// This is why the re-render only happens after all these setNumber() calls

// It can remaind a waiter taking the order at the restaurant(официант ждет пока все закажут)
// He can even take orders from other people at the table befor to go to the kitchen

//* This lets you update multiple state variables - even from multiple components without
//* triggering too many re-renders. But this is also means that the UI will not be updated
//* until after your event handler and any code in it completes. This behavior also
//* known as BATCHING , makes your react app run much faster. It also avoids dealing
//* with confusing "half-finished" renders where only some of the variables have been updated

//! React does not batch across multiple intentional events like clicks -
// each click is handled separately. Rest assured(будтье уверены) that React only
// does batching when its generally safe to. This ensures that, for example, if the
// first button click disables a form, the second click would not submit it again.

//todo Updating the same state multiple times before the next render

// its is an uncommon use case but if we want to update the same state variable
//multiple times before the next render, instead of passing the next state value
// like setNumber(number + 1),
// *we can pass a function that calculates the next state based on previous one in the
//* queue , like setNumber(prev => prev + 1). It is way to tell react to do something
//* with the state value instead of just replacing it.
import { useState } from "react";

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber((n) => n + 1);
          setNumber((n) => n + 1);
          setNumber((n) => n + 1);
        }}
      >
        +3
      </button>
    </>
  );
}
// now its working good, +3 each time

//* n => n + 1 is called an updater function. When we pass it to a state setter:
// 1. React queues this function to be processed after all other code in the event
// handler has run (реакт ставит функцию после всего остального когда в обработчике событий)
// 2. During the next render, React goes through the queue and gives us the final updateed state

setNumber((n) => n + 1);
setNumber((n) => n + 1);
setNumber((n) => n + 1);

// Heres how react works through these lines:
// 1. setNumber(n => n + 1): n => n + 1 is a function. React adds it to a queue.
// 2. setNumber(n => n + 1): n => n + 1 is a function. React adds it to a queue.
// 3. setNumber(n => n + 1): n => n + 1 is a function. React adds it to a queue.
//React stores 3 as the final result and returns it from useState.
// this is why clicking +3 increments value by 3

//* What happens if you update state after replacing it
const [number, setNumber] = useState(0);

<button
  onClick={() => {
    setNumber(number + 5);
    setNumber((n) => n + 1);
  }}
></button>;

//* Output: 6

//Here what this event handler telsl react to do;

// 1 setNumber(number + 5): number is 0, so setNumber(0+5). React adds "replace with 5"
// to its queue
// 2 setNumber(n => n + 1): n => n+1 is an updater function.
//react adds that func to the queue

//During the next render, React goes through the state queue:
// replace with 5 returns 5 >>> n => n+1 returns 6

//? We may have noticed that setState(5)
//? actually works like setState(n => 5), but n is unused!

//* What happens if you replace state after updating it
//Let’s try one more example. What do you think number will be in the next render?

<button
  onClick={() => {
    setNumber(number + 5);
    setNumber((n) => n + 1);
    setNumber(42);
  }}
></button>;

//* Output: 42

// heres working flow:
// 1. setNumber(number + 5): number is 0, so setNumber(0 + 5). React adds “replace with 5”
//to its queue.
// 2. setNumber(n => n + 1): n => n + 1 is an updater function. React adds that function
// to its queue.
// 3. setNumber(42): React adds “replace with 42” to its queue.

//During the next render, React goes through the state queue
//* Then React stores 42 as the final result and returns it from useState.

// * To summarize here s how we can think what we are passing to the setNumber state setter:

// 1 . An updater function eg n => n + 1, gets added to the queue
// 2. Any other value (eg number 5) adds "replace with 5" to the queue, //!ignoring whats already queued

// After the event handler completes, React will trigger a re-render. During the re-render,
// React will process the queue. Updater functions run during rendering , so
//! updater functions must be pure and only return the result,
// Dont try to set state from inside of them or run other side effects, In strict mode,
// React will run each updater function twice to find mistakes

// todo RECAP

// 1. Setting state does not change the variable in the existing render, but it requests a new render
// 2. React processes state updates after event handlers have finished running.
// This is called //? BATCHING
// 3. To update some state multiple times in one event, we can use //? setNumber(n => n+1) updater func

// thats challenge shows how it works
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  // TODO: do something with the queue...
  queue.forEach((element) => {
    if (typeof element === "function") {
      finalState = element(finalState);
    } else {
      finalState = element;
    }
  });

  return finalState;
}
