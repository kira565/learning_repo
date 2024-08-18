//@ts-nocheck
// * Keeping components pure

// Some JS functions are pure. Pure functions only perform a calculation and nothing more
// By strictly only writing our components as pure functions we can avoid an entire
// class of baffling bugs and unpredictable behaviour. To follow this principle
// we need to follow few rules.

// * A pure function charactrristics:
//1. Same input same output
//2 it minds its own business (it doesnt change any objects or variables that existed
//before)

//!React assumes that every component you write is a pure function.
//!This means that React components you write must always return the same JSX given
//!the same inputs

// We could think about components like about strict instructions, we follow them
// and dont introduce something new.

// Side effects: unintended consequances:
//! BAD, every time we call this component (instruction) it will produce
//! different JSX
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

//? Detectig impure calculations with StrictMode

// There are three kinds of inputs that we cann read while rendering:
//* props, state and context
//! We should always consider them as read-only

// When we want to change something in response to user input, we should set state
// instead of writing a variable. We nevert change preexisting variables or object
// while component is rendering.

// React offers Strict mode in which it calls each components function twice during
// development. By calling component function twice, Strict Mode helps find components
// that break these rules. It has no effect in production.

// * Local mutations are allowed:

// Its completely fine to change variables and objects that youve just created while
// rendering. In this example we created [] assign it to cups and push dozens of cups
export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}

//* Where we can cause side effects

// While functional programming relies heavily on purity, at some point
// somewhere, something has to change. These changes - updating the screen,
// starting an animation, changing the data - //! are called side effects.
// These things happen "on the side", not during render

// In react, side effects usually belong inside <event handlers>. Event handlers
// are the fucntions that react runs when we perform some action - for example
// when clicking the button. Even though event handlers are defined inside
//component, theu dont run during rendering! //! So event handlers dont need to be pure

// If you have exhausted all other options and cant find the right event handler,
// we still can attach it to JSX with // * <useEffect> call in component
// This tels react to execute it later after rendering, when side effects are allowed.
//! However, this approach should be last resort
//* When possible try to express logic with rendering alone,

//? Why React cares about purity?
// 1 Component could run in different env, eg server
// 2 We can improve performance by //? <skipping rendering>(memo)
// components whose inputs have nor changes.
// 3 If some data changes in the middle of rendering a deep component tree
// React can restart rendering without wasting time for outdated render.

// todo RECAP
// Component must be pure

// Rendering can happen any time , so component shouldnt depend on each others rendering
// sequence

// We shouldnt mutate any of the inputs that component use for rendering. That includes,
// props, state, and context. //! To update the screen set state instead of mutating
// preexisting objects

// Strive to express your component’s logic in the JSX you return. When you
// need to “change things”, you’ll usually want to do it in an event handler. As a last
// resort, you can //?useEffect.
