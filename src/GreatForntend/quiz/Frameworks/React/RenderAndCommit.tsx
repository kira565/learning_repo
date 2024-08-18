//@ts-nocheck
//* Render and Commit

// Before components are displayed on screen, they must be rendered by React.

// The full proccess includes 3 steps*

//1. Triggering a render
//2. Rendering the component
//3. Commiting to the DOM

//todo Step 1 Triggering a render

// There aretwo reasons for a component to render:

// 1. Its the component initial render
// 2. The components state has been updated.

//*Initial Render
// When app starts we need to trigger initial render. It happens by calling createRoot
// with the target DOM node, and then calling its render method with Component
import Image from "./Image.js";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(<Image />);

//* Re-renders when STATE UPDATES

// Once the component has been initialy rendered, we can triffer further(дальнейшие)
// renders by updating its state with set function (useState). Updating components
// state automatically queues render.

//todo Step 2 React renders a component
// After we triggered a render, React calls our component to figure out what to
// display on screen. "Rendering" is React calling our components
// (рендеринг это когда реакт вызывает наши компоненты)

//1. On initial render, React will call root component
// During initial render , react wil create DOM nodes for elements
//2. For subsequent renders(re-render), React will call the function component whose
//state update triggered the render
//During a re-render, React will calculate which of their properties, if any, have
//changed since the pevious render. It will not do anything with that information
// until the next step, commit phase

// This proccess is recursive: If the updated component returns some othr component,
// React will render that component next, and if that component also returning something
// it will render the component next and so on. The proccess will continue until
// there are no more nested components and React knows exactly what should be displayed
// on screen

//! Pirfall: Rendering must always be a pure calculation (Pure components)
//! it means same inputs, same outputs and it minds its own business

//? Optimizing performance: The default behabior of re-rendering all nested components
//? is not optimal for performance if the updated component is very high in tree.
//? There are several ways to solve it <PerformanceSection>

//todo Step 3 React commits changes to the DOM

// After rendering (calling) component, React will modify DOM.

//1. For initial render, React will use the appendChild() DOM API to put all the DOM
// nodes it has created on screen.
//2. For re-renders, React will apply the minimal necessary operations (calculated
// while rendering: step2) to make DOM match the latest renering output.

//! React only changes the DOM nodes if there is a difference between renders.
// For example, here is a component thar re-renders with different pops passed from
// its parent every second. Notice how you can add some text into the <input />,
// updating its value, but the text doesnt dissappear when the component re-renders
//* That works because during the last step, React only updates the content of
//* <h1> with the new time. It sees that the <input> appears in the JSX in the same
//* place as last time, so React doesnt tuch the <input> or its value

//todo And the last: Browser paint
//After rendering is done and React updated the DOM, the browser will repaint the screen.
// Although this process is known as “browser rendering”, we’ll refer to it as “painting”
// to avoid confusion throughout the docs.

//todo Recap
//Any screen update in a React app happens in three steps:
//1 Trigger
//2 Render
//3 Commit
//You can use Strict Mode to find mistakes in your components
//React does not touch the DOM if the rendering result is the same as last time
