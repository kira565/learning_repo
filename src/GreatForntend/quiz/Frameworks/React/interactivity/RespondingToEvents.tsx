//@ts-nocheck
// TODO ADDING INTERACTIVITY

// SOme things on the screen update in response to user input. For example
// click switches user image. In React, data that changes over time is called state
// We can add state to any component, and update it as needed.

// todo Responding to events

// React lets add event handlers to JSX. Event handlers are functions that will be
// triggered in response to user interactions like clicking, hovering focusing,
// on form inputs and so on

// Built in components like <button> only support built-in browser events like
// onClick. However, we can also create our own components, and give their event
// handler props any application specific names that we like.
export default function Button() {
  function handleClick() {
    alert("You clicked me!");
  }

  return <button onClick={handleClick}>Click me</button>;
}

// We defined handleClick and then passed it as prop to button
// handleClick is a event handler.
// They are usually defined inside component
// They usually have name started with handle, followed by the name of event
//! pitfall
//! Functions must be passed, not called
//! if func is called, The method will be called when the component renders, not when the button is clicked

//! Note:
// Make sure to use appropriate HTML elements for event handling
// to handle click we need to use button and not div, for example
// This is important for accessibility

// * Event propagation

// Event handlers will also catch events from any children you component might have.
// We say that an event "bubbles" or "propagates" up to the tree: it starts
// with where the event happened and then goes up the tree

//This div below contains two buttons. They all have onClick handlers
export default function Toolbar() {
  return (
    <div
      className="Toolbar"
      onClick={() => {
        alert("You clicked on the toolbar!");
      }}
    >
      <button onClick={() => alert("Playing!")}>Play Movie</button>
      <button onClick={() => alert("Uploading!")}>Upload Image</button>
    </div>
  );
}
// if we click on either button, its onClick will run first , followed by the parent div
// onClick. So two messages will appear

//! Pitfall: All events propagate in React except onScroll, which only works on the JSX

//* To stop propagation we need to call e.stopPropagation() so the parent handler
//* wont run

//? DEEP DIVE: Capture phase events
// Event Capturing - we described (its opposite operation to bubbling, it goes
// from root to target and has higher priority, (it turns on after adding event listener )
// in React we can add it like this:
<div
  onClickCapture={() => {
    /* this runs first */
    // * simialr to div.addEventlistener(click, () => {})
  }}
>
  <button onClick={(e) => e.stopPropagation()} />
  <button onClick={(e) => e.stopPropagation()} />
</div>;

//todo Preventing Default Behavior
// Some browser events have default behavior like form, which enforce page reloading
// after submit
export default function Signup() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Submitting!");
      }}
    >
      <input />
      <button>Send</button>
    </form>
  );
}

//todo Can event handlers have side Effects?

// Absolutely! event handlers are the best place for sdie effects.

// Unlike rendering functions, event handlers dont need to be pure,
// so its a great place to change something - for example, change an inputs value
// in response to typing, or change a list in response to a button press.
// Hovewer, ni norder to change some information, we first need to store It.
// In React, this is done by using //? state, "a component memory"

//todo RECAP
//You can handle events by passing a function as a prop to an element like <button>.
//Event handlers must be passed, not called! onClick={handleClick}, not onClick={handleClick()}.
//You can define an event handler function separately or inline.
//Event handlers are defined inside a component, so they can access props.
//You can declare an event handler in a parent and pass it as a prop to a child.
//You can define your own event handler props with application-specific names.
//Events propagate upwards. Call e.stopPropagation() on the first argument to prevent that.
//Events may have unwanted default browser behavior. Call e.preventDefault() to prevent that.
//Explicitly calling an event handler prop from a child handler is a good alternative to propagation.
