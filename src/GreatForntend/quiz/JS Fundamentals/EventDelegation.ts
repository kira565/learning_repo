//* Explain event delegation (привязка листенера к паренту за вместо привязки многих листереров ко многим детям)
// Event delegation is a technique in JS where a single event listener is attached to a parent element
// instead of attaching event listeners to multiple child elements. When event occurs on a child,
// the event bubbles up to the DOM tree and the parent element event listener handls the event based on the target element

// Event delegation provides following benefits:
// 1. Improved performance: Attaching a single event listener is more efficent than attaching multiple listeners
// to individual elements, especially for large or dynamic lists. This reduces memory usage and improves overall
// performance

// 2. Simplified event handling: With delegation you only need to write the event handling logic once in the parent

// 3. Dynamic element support: Event delegation automatically handles events for dynamically added or removed elements
// within the parent elements. There is no need to manually attach or remove event listeners when the DOM structure changes

//! However do note that:
// 1. It is important to identify the target element that triggered event
// 2. Not all events can be delegated because they are not bubbled.
//! non-bubbling events: focus, blur, scroll, mouseenter, mouseleave, resize

//* Event delegation
// How it works:
// 1. attach a listener to a common parent
// 2. event bubbling: when a event occurs on a child, it bubbles up to the common element
// 3. determine target: use event.target
// 4. Perform action based on target

// EXAMPLE
// HTML:
// <ul id="item-list">
//   <li>Item 1</li>
//   <li>Item 2</li>
//   <li>Item 3</li>
// </ul>

const itemList = document.getElementById("item-list")!;

itemList.addEventListener("click", (event) => {
  if ((event.target as HTMLElement).tagName === "LI") {
    console.log(`Clicked on ${(event.target as HTMLElement).textContent}`);
  }
});

// In this example a single click event listener is attached to ul element.

//USE Cases
// commonly used in scenarios like:

// Handling dynamic content in single page applications:

// HTML:
// <div id="button-container">
//   <button>Button 1</button>
//   <button>Button 2</button>
// </div>
// <button id="add-button">Add Button</button>
const buttonContainer = document.getElementById("button-container")!;
const addButton = document.getElementById("add-button")!;

buttonContainer.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.tagName === "BUTTON") {
    console.log(`Clicked on ${target.textContent}`);
  }
});

addButton.addEventListener("click", () => {
  const newButton = document.createElement("button");
  newButton.textContent = `Button ${buttonContainer.children.length + 1}`;
  buttonContainer.appendChild(newButton);
});

// In example above click event listener is attached  to the div container. When a new button is added dynamically and clicked,
// the event listener on the container handles the click event

//* Simplifying code by avoiding the need to attach and remove event listeners for elements that code
// HTML:
// <form id="user-form">
//   <input type="text" name="username" placeholder="Username">
//   <input type="email" name="email" placeholder="Email">
//   <input type="password" name="password" placeholder="Password">
// </form>

const userForm = document.getElementById("user-form")!;

userForm.addEventListener("input", (event) => {
  const { name, value } = event.target as HTMLFormElement;
  console.log(`Changed ${name}: ${value}`);
});

// In this example a single input event listener is attached to form element. It can respont to input changes for
// all child input elements

// ! Pitfalls (ловушки)

// 1. Incoorect target handling: Ensure correct identification of the event target
// 2. Not all Events can be delegated/bubbled: //! non-bubbling events: focus, blur, scroll, mouseenter, mouseleave, resize
// 3. Event overhead: While event delegation is generally more efficient, there needs to be complex logic written
// within the root event listener to identify the triggering element and respond appropriately(соответственно). This can
// introduce overhead and can be potentially more complex if not managed properly

// * Event delegation in JS Framweorks
// In React, event handlers are attached to the React root's DOM container into which the React tree is rendered.
// Even though(несмотря на то что) onCLick is added to child elements, the actual event listeners are attached to the
// root DOM node, leveraging event delegation to optimzie event handling and improve performance

// When event occurs React event listener capture it and determines which React component redndered the target element based
// on its internal bookkeeping (внутренняя бухкалтерия хаха). React then dispatches(отправляет) the event to the appropriate
// components event handler by calling the handler function with a synthethic event object. The synthetic event
// object wraps the native browser event, providing a consistent interface across different browsers and capturing
// information about the event

// By using event delegation React avoids attaching individual event handlers to each component instance, which would create
// significant overhead, espsecially for large component trees. Instrad, React leverages(воздействует на) the browser's native event
// bubbling mechanism to capture events at the root and disturbe them to appropriate components
