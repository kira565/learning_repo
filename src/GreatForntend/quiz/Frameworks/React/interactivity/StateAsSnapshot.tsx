//@ts-nocheck
//* State as snapshot

// State might look like regular JS variable, Hovever state behaves more
// like snapshot. Setting it doesnt change the state variable you already have
// but instead triggers a re-render

//Here’s what happens when you click the button:

//1 The onSubmit event handler executes.
//2 setIsSent(true) sets isSent to true and queues a new render.
//3 React re-renders the component according to the new isSent value.

//Let’s take a closer look at the relationship between state and rendering.

// * Rendering takes a snapshot in time (в промежуток времени)

// Rendering means that React is calling component, which is a function. The JSX
// you return from that function is like a snapshot of the UI in time. Its props,
// event handlers, and local variables were all calculated
//* using its state at the time of the render.
// Unlike photography this snapshot is interactive! React updates the screen to
// match this snapshot and connects the event handlers.

//! When react re-renders a component:
// 1 React calls our function again
// 2 Function returns a new JSX snapshot
// 3 React then updates the screen(DOM) to match the snapshot, function returned

// As a component memory, state is not like regular variable that dissappears after
// function returns. State actually lives in React itself, outside of the function.
// When React calls a component, it gives us a snapshot of the state for that
// particular render. Our component returns a snspshot of the UI with a fresh set of
// props and event handlers in its JSX, all calculated
//* using the state values from that render

// 1 We tell react to update the state
// 2 react updates the state value
// 3 react passes a snapshot of the state value into the component

// Here is a little experiment how this work. In this example
import { useState } from "react";

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1); // 3 times!
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +3
      </button>
    </>
  );
}

// After click, that number only increments once per click.
//! Setting state only changes it for the next render.
// During 1 render number was 0, This is why in that render`s onClick handler,
// the valeue of number is still 0, even after setNumber(number+1) was called
//! so the new value of state appears only on new render

// Here is what this buttons click handler tells React to do:

//1 . setNumber(number + 1): number is 0 so setNumber(0 + 1).
//1 . setNumber(number + 1): number is 0 so setNumber(0 + 1).
//1 . setNumber(number + 1): number is 0 so setNumber(0 + 1).

//! So we set the state to 1 three times.

// todo State over time

//Try to guess what clicking this button will alert:
import { useState } from "react";

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 5);
          alert(number);
        }}
      >
        +5
      </button>
    </>
  );
}
// In this case it will be 0, correct

// * What if we use setTimeout ??
import { useState } from "react";

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 5);
          setTimeout(() => {
            alert(number);
          }, 3000);
        }}
      >
        +5
      </button>
    </>
  );
}
// * This is also 0,

//? Why ? The state stored on React may have changed by the time the alert runs, but
//? it was scheduled using a snapshot of state at the time the user interacted with it

//! A STATE VARIABLE VALUE NEVER CHANGE WITHIN A RENDER,
//even if its event handler`s code is asynchronous. Inside the render onClick, the
// value of number continues to be 0 even after setNumber(number + 5) was called.
// Its values was fixed when React took a snapshot of the UI by calling our component

//! REACT ALSO KEEPS THE STATE VALUE FIXED WITHIN ONE RENDER`S EVENT HANDLERS

// todo RECAP

// 1 Setting state requires a new render
// 2 React stores state outside of component
// 3 when call useState, React gives a snapshot of the state for that render
// 4 Variables and event handlers dont survive re-renders. Every render
// has its own event handlers
// 5 Every render (and functions inside it) will always see the snapshot of
// the state that react gavve to that render.
// 6. We can mentally susbstitute (заменить) state in event handlers, similarly
// to how we think about the rendered JSX
// 7. Event handlers created in the past have the state values from the render
// in which they were created
