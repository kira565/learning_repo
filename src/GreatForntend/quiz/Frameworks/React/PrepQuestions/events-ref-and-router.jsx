//* React event object
// Our event handlers will receive a 
//? React event object also known as a synthetic event

<button onClick={e => {
  console.log(e); // e - React event object
}} />

//? DEEP DIVE SyntheticEvents
// In React, a synthetic event is an abstraction layer that React provides to 
// handle events in a consistent and cross-browser-compatible manner.

//Synthetic events are not native DOM events, instead, they are JS objects that wrap native events.
// React does this to ensure that event handling is consistent across different browsers and 
// to provide additional features like event pooling for performance optimization

//

//? -------------------------

// It conforms to the same standart as the underlying DOM events, but fixes some
// browser inconsistencies.

// Some React events do not map directly to the browser native events. For example onMouseLeave,
// e.nativeEvent will point to a mouseout event. The specific mapping is not part of public API and
// may change in the future. If we need the underlying browser event for some reason , read it from e.nativeEvent

//? Properties 
// React event object implements some of the standart Event properties

// 1 bubbles - boolean - return if the event bubbles through the DOM
// 2 cancelable - bool - returns if the event can be canceled
// 3 currentTarget - A DOM node, returns the node to which the current handler is attached in the React tree
// 4 - default prevented - bool, returns of preventDefault was called
// 5 - event phase - number - returns current phase of event
// 6 - isTrusted - bool - if initiated by user
// 7 - target - a DOM node, returns the node on which event has occured (which could be a distant child)
// 8 - timestamp - when event occures
//By react:
// 9 - nativeEvent - a DOM event

//? Methods 
// React event objects implement some of the standart Event methods
// 1 preventDefault - prevents the default browser action for the event
// 2 stopPropagation - Stops the event propagarion through the React tree
// By react:
// 3 isDefaultPrevented() returns bool if preventDefault was called
// 4 isPropogationStopped

//? Caveats 
// The value of currentTarget, eventPhase, target and type reflect the values
// your react code expects. Under the hood, react attaches event handlers at the root,
// but this si not reflected in React Event objects. For example
// e.currentTarget may not be the same e.nativeEvent.currentTarget. for polyfilled
// events e.type may differ from e.nativeEvent.type

//? Difference between HTML and REACT synthetic event handling
// 1. In HTML, the event name usually represents in lowercase as a convention:
//Whereas in React it follows camelCase convention:
{/* <button onclick="activateLasers()"></button>
<button onClick={activateLasers}> */}

//2. In HTML, you can return false to prevent default behavior:
//Whereas in React you must call preventDefault() explicitly:
//html:
<a
  href="#"
  onclick='console.log("The link was clicked."); return false;'
/>
//react
function handleClick(event) {
  event.preventDefault();
  console.log("The link was clicked.");
}
//3 In HTML, you need to invoke the function by appending () Whereas in react you 
//should not append () with the function name. (refer "activateLasers" function in the 
//first point for example)



//! To stop event propagation in React you should call the preventDefault method on the event object rather than returning false
//* in some test they say that we can return false but its not true


//! MORE CORE DESCR CHECK RESPONDING TO EVENTS FILE

//! FOR REFS CHECK REFS FILE

//* React Router
// React by default doesnt include built-in router
// The most popular solution is React Router "yarn add react-router-dom"

// Used to route to pages based on URL:

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// or older version 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

    //?  What does the component do in React Router?
    // * It provides conditional logic for rendering components
    // The component in React Router is used to render only the first route that
    // matches the location. It provides conditional logic for rendering components
    // ensuring that the only first matching route is rendered. THis particulary useful
    // for defining exclusive routes and handling 404 pages

    //? How do you navigate to a different URL using React Router?
    // * Using the component  <Navigate to="/dashboard" replace={true} />

  //? Styling links in React router 
//   <Link to={to} unstable_viewTransition>
//   <p
//     style={{
//       viewTransitionName: isTransitioning
//         ? "image-title"
//         : "",
//     }}
//   >
//     Image Number {idx}
//   </p>
//   <img
//     src={src}
//     alt={`Img ${idx}`}
//     style={{
//       viewTransitionName: isTransitioning
//         ? "image-expand"
//         : "",
//     }}
//   />
// </Link>


//? How to define route parameter in React Router
//* <Route path="/:id" />

//? How can you programmatically navigate to a new route in React Router?
// ! OLD approach:
// * Using this.props.history.push('/new-route')
//! NEW APPROACH
// * useNavigate hook
// *  const navigate = useNavigate();
//*   navigate("/session-timed-out");

//? NavLink - What is the use of the exact prop in a component?
//! new version changed from exact to end <NavLink end />
//* The end prop changes the matching logic for the active and pending states to only
//* match to the "end" of the NavLink's to path. If the URL is longer than to, it will
//*  no longer be considered active. EG
//<NavLink to="/tasks" end />	 URL : /tasks	 isActive - true
//<NavLink to="/tasks" end />	 URL : /tasks/123	 isActive - false (NOT MATCH)


// * RefCallbacks 
// We can pass refCallback instead of ref object, when we need to do something
// with appeared element, for example to set focus, its also guarantee that
// we perform this operation under element which is 100% exists, while ref.current can be 
// null, so function will run only when element appears

export function NewFormWithAutoFocus() {
  const setFocus = useCallback((element) => {
    element.focus()
  })

  return (
    <input ref={setFocus}></input>
  )
}