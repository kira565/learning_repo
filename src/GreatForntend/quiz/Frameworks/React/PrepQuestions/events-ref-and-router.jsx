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