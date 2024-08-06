//* Describe Event bubbling

// Event bubbling is a DOM Event propagation mechanism
// where an event (eg click) starts at the target element
// and bubbles up to the root of the document

// Event bubbling is essential for event delegation, where
// a single event handler manages events for multiple child
// elements, enchancing performance and code simplicity. While
// convinient, failing to manage event propagation properly
// can lead to unintended behavior, such as multiple handlers
// firing for a single event

// ? What is Event Bubbling ?

// Event bubbling is propagation(распостранение) mechanism in the
// DOM where an event such as click or a keyboard event, is
// first triggered on the target element that initiated the event
// and then propagates //!upward (bubbles) through the DOM tree to the root of Document

//* Note:
// Even before the event bubbling phase happens is the event
// capturing phase, which is opposite of bubbling where the event goes
// down from the document root to the target element

//* Bubbling phase
// During the bubbling phase, the event starts at the target element
// and bubbles up through its parents in the DOM hierarchy.
// This means that the event handlers attached to the target element and
// its ancestors can all potentially receive and respond to the event.

// HTML:
// <div id="parent">
//   <button id="child">Click me!</button>
// </div>

const parent = document.getElementById("parent")!;
const child = document.getElementById("child")!;

parent.addEventListener("click", () => {
  console.log("Parent element clicked");
});

child.addEventListener("click", () => {
  console.log("Child element clicked");
});

// When you click the "Click me!" button, both the child and parent event
// handlers will be triggered due to the event bubbling.

//* Stopping the bubbling
// Event bubbling can be stopped during the bubbling phase using
// the stopPropagation method. If an event handler calls stopPropagation(), it prevents the
// event from further bubbling (предотвращает дальнейший бабблинг события) up the DOM tree,
// ensuring that only the handlers of the element up to that point in the hierarchy are
// executed

child.addEventListener("click", (event) => {
  console.log("Child element clicked");
  event.stopPropagation();
});
