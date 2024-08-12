//* Describe event capturing (эвент промогейшон сверху вниз от предка к чайлду)

// Event capturing is a lesser-used counterpart(коллега) to event-bubbling in the DOM event propogation(распостранение)
// mechanism. It follows the opposite order, where an event triggers first on the ancestor(предок) element
// and then travels down to the target element

// Event capturing is rarely used as compared to event bubbling but it can be used in specific scenarios
// where you need to intercept events at higher level before they reach the target element(когда нужно перехватывать
// эвенты на более высоком уровне перед тем как они дойдут до таргет элкмента). It is disabled by default but
// can be enabledthrough the addEventListener()

//* What is event capturing
// Event capturing is a propagation mechanism in the DOM where an event (eg click) is first triggered at the root of document
// and then flows down through the DOM tree to target element.

// Capturing has a higher priority than bubbling. meaning that capturing event handlers are executed before bubbling event
// handlers, as shown by the phases of propagation:

// 1. Capturing phase - the event moves down towards(к) the target element
// 2. Target phase - event reaches the target elem
// 3. Bubbling phase - event bubbles up from the target element

//! note: event capturing is disabled by default

//* Capturing phase
// During the capturing phase, the event starts at the document root and propagates down to the target element.
// Any event listeners on ansestor(предок) elements in this path will be triggered before the target elements handler
// But note, that event capturing cant happen until the third argument of addEventListener() is set to true,
// here is the example
const parent1 = document.getElementById("parent")!;
const child = document.getElementById("child")!;

parent1.addEventListener(
  "click",
  () => {
    console.log("Parent element clicked (capturing)"); //1
  },
  true // Set third argument to true for capturing
);

parent1.onclick = () => {
  console.log("Hi"); // 2
};

child.addEventListener("click", () => {
  console.log("Child element clicked"); //3
});

// When click button it will trigger the parent element capturing handler first, followed by the child element

//* Stopping propagation
// Event propogation can be stopped during the capturing phase using stopPropagation method.
// This prevents the event from traveling further down(путешествие дальше вниз) the DOM Tree

const parent2 = document.getElementById("parent")!;
const child2 = document.getElementById("child")!;

parent2.addEventListener(
  "click",
  (event) => {
    console.log("Parent element clicked (capturing)");
    event.stopPropagation(); // Stop event propagation
  },
  true // Set third argument to true for capturing
);

child2.addEventListener("click", () => {
  console.log("Child element clicked");
});

// as result of stopping, just the parent event listener will now be called.

//* Uses of event capturing

// Event capturing is rarely used as compared to event bubbling, but it can be used in a specific scenarios where you need
// to intercept events at a higher level before they reach the target element

// 1. Stopping event bubbling. Given nested element (button) inside a container. Clicking the button might also trigger
// a click on container. By using enabling event capturing the container event listener, we can capture the click event
// there and prevent it from travelling down to the button, potentially causing unintended behavior

// 2. Custom dropdown menus: When building custom dropdown menu, we might want to capture clicks outside the menu
// element to close the menu. Using capture: true on the document object allows you to listen for clicks anywhere
// on the page and close the menu if the click happens outside its boundaries(границы)

// 3. Efficency in certain scenarios: In some situations, event capturing can be slighthly more effective than
// relying on bubbling. This is because the event doesnt need to propagate through all child elements before reaching
// the handler. However, the perfomant difference is usually negligible(незначительно) for most web apps
