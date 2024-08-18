//@ts-nocheck
// * State - A components Memory

// Components often need to change whats in the screen as a result of an interactions
// Typing into the form should update the input field , etc. Components need to
// remember things; the current input value, current image, etc. I nReact, this
// kind of component-specific memory called state.

//todo When regular variabl is not enough

// Here is a component that render a sculpture image. Clicking next button
// should show the next sculpture by changing index to 1, then 2 , so on.
// However this wont work
import { sculptureList } from "./data.js";

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <img src={sculpture.url} alt={sculpture.alt} />
      <p>{sculpture.description}</p>
    </>
  );
}

// The handleClick event handler is updating a local variable, but two things prevent
// that change from being visible

//! 1. Local variables dont persist between renders.
// When react renders this component a second time, it renders it from scratch -
//it doesnt consider any changes to the local variables
//! 2. Changes to local variables wont trigger renders.
// React doesnt eralize it needs to render the component again with the new data.

// * To update component with a new data, two things need to be happen:
// 1. Retain(сохранение) data between renders
// 2. Trigger React to render the component with new data (re-render)

//? the useState Hook provides those two things:
// 1. A state variable to retain the data between renders
// 2. A state setter function to update the variable and trigger React to render
// the component again

const [index, setIndex] = useState(0);

//This is how they work together in handleClick:

function handleClick() {
  setIndex(index + 1);
}

// ? Meet the hooks
// Hooks are special functions that are only available whilre React is //?rendering
// They let to connect to different  react features

//! Pitfall
// Hooks - functions starting with use - can only be called at the top level of
// components or customHooks. We cant call hooks inside conditions, loops, or
// other nested functions. Hooks are functions, but its helpful to think of them
// as unconditional declorations about component needs (безаговорочные декларации о
// нуждах компонента). You "use" React features at the top of component similar to
// imports at the top of the file

// todo Anatomy of useState
// When you call useState, you are telling React that you want this component to
// remember something:
const [index, setIndex] = useState(0);
// In this case we remember index

// The only argument to useState is the initial value of state variable. In this
// example the index initial value is 0

// Every time component renders, useState gives an array containing two values;
// 1. The state variable index with the value we stored
// 2 The state setter function setIndex, which can update the state variable
// and trigger React to render component again

//? In Action:
const [index, setIndex] = useState(0);

//1. Component renders the first time. Because we passed -, it will return
// [0, setIndex]. React remembers 0 is the latest state value

//2 We update the state, when a user clicks the button, it calls setIndex(index+1)
// This tells React to remember index is 1 now and triggers another render

//3. Component second render, React still sees useState(0) but because React
// remembers that we set index ti 1, it returns [1, setIndex]

//4. And so on

//todo Given a component multiple state variables
// We can define as many useState as we want.
//* Its a good idea to have multiple state variables if their state unrelated
// like index and showMore.
//! But if we find that we often change two states together, it might be easier to
//! combine them into one.
// For example if we have a form with many fields, its more convinient to have a
// single state variable that holds an object that state variable per field.
// Read //?<choosing the state structure>

// ? DEEP DIVE: How does React knows which state to return?
// useState call does not receive any information about which state variable it refers to
//  There is no "identifier" that is passed to useState, so how does it know which of the
// state variables to return ? Does it rely on some magic like parsing functions?
//* The answer is NO

// Instead, to enable their concise syntax, Hooks rely on stable call order on every
// render of the same component. This works well in practice, because if we follow the
//rule above, (Only call hooks at the top level), Hooks will always be called in the
//same order

// Internally(внутренне), React holds an array of state pairs for every component.
// It also maintains the current pair index, which is set to 0, before rendering.
// Each time we call useState, react gives the next state pair and increment the index

//todo State is isolated and private
// State is local to a component instance on the screen. In other words, if we
// render the same component twice , each copy will have completely isolated state
//? so state is closure
// This is what makes state different from regular variables that you might declare
// at the top of module. State is not tied(не привязан) to a particular function call or
// place in the code, but its "local" to the specific place on the screen. You rendered
// two <Gallery /> components so their state is stored separately.

// Also notice how parent component doesnt know anything about the children state.
// Unlike the props state is fully private to the component declaring it. The parent
// component cant change it, This lets us to add state to any component or remove it
// without impacting the rest of the components

// What if we want both galleries to keep their state sync ? The right way to do it
// in React is to remove state from child components and add it to their closest
// shared parent.

//todo RECAP
//1 Use a state variable when a component needs to “remember” some information between
// renders.

// 2 State variables are declared by calling the useState Hook.

// 3 Hooks are special functions that start with use. They let you “hook into” React
// features like state.

//4 Hooks might remind you of imports: they need to be called unconditionally. Calling
// Hooks, including useState, is only valid at the top level of a component or
// another Hook.

//5. The useState Hook returns a pair of values: the current state and the function
// to update it.

//6. You can have more than one state variable. Internally, React matches them
// up by their order.

//7 State is private to the component. If you render it in two places,
// each copy gets its own state.
