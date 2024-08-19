//* Synchronizing with Effects
// Some components need to syncchroize with external systems. For example
// we might want to control a non React component based on React state,
// setup server connection, or send an analytics log when a component
// appears on the screen. Effects let us run some code after rendering,
// so that we can synchronize component with some systems outside React.

//todo What are Effects and how are they different from events?

// Before getting to Effects, we need to be fabiliar with two types of
// logic inside react component:

//* 1. Rendering code.
//lives at the top level of component. This is where we take the props and 
// state, transfotm the, and return JSX we want to see on the screen.
//! Rendering code must be pure.
// Like a math formula, it should only calculate the result, but not to do 
// anything else.

//* 2 Event handlers.
// Event handlers are nested functions inside component that do things rather
// than just calculate them (делают действия а не просто вычисляют)
// An event handler might update an input field, submit an HTTP POST
// request to but a product, or navigate the user to another screen.
//! Event handlers contain side effects (they change the program state)
// caused by a specific user action (eg click,or typing)

// Sometimes this isnt enough. Consider a ChatRoom component that must connect
// to the chat server whenever its visible on the screen. Connecting to a 
// server is not a pure calculation, (it is side effect) so it cant happen
// during rendering. However, there is no single particular event like a 
// click that causes ChatRoom to be displayed.

//* Effects let us specify side effects that are caused by rendering itself, 
//* rather than by a particular event
// Sending a message in the chat is an event, because its directly caused
// by user clicking a specific button. However, setting up a server
//connection is an Effect, because it should happen no matter which 
// interaction caused the component to appear. Effects run at the end of 
// a commit after the screen updates. This is a good time to synchonize
// the React components with some external system (like network) or
// a third party library.

//? NOTE
//? capitalized Effects in this text refers to the React-specific
//? definition above, i.e SIDE EFFECTS CAUSED BY RENDERING.
//? Because there are not only side effects caused by renderings, but also
//? effects which we collect during rendering and reconsilation



//todo WE MIGHT NOT NEED AN EFFECT
//! We shouldnt rush to add Effects to component. 
// Keep in mind that Effects are typically used to "step out" of React code
// and synchronize with some external system (выйти из реакт кода и синх с 
// внешними системами). This includes browser APIs, third party widgets,
// network, and so on. If our Effect only adjusts some state based on
// other state, //!we might not need an Effect

//todo HOW to write an Effect

// To write an effect, follow these three steps:

//* 1. Declare an Effect.
// By default our Effects will run after every //? commit
//* 2. Specify the Effect dependencies
// Most effects should only re-run when needed rather than after every render
// For example, a fade-in animation should only trigger when a component appears.
// Connecting and disconnecting to chat room should only happen when 
// the component appears and disappears, or when the chat room changes.
//* 3 Add cleanup if needed.
// Some Effects need to specify how to stop, undo or clean up whatever they
// were doing. For example "connect" needs "disconnect", "subscribe"
// needs "unsubscribe" and fetch needs either "cancel" or "ignore"

import { useEffect } from 'react';
function MyComponent() {
    useEffect(() => {
      // Code here will run after *every* render
    });
    return <div />;
  }
  // Every rime conponent renders React will update the screen and then
  // run the code inside useEffect. In other words, useEffect //* "delays"
  //* a piece of code from running until that render is reflected on the screen

  // Lets see how we can use an effect to syncronize with an external system.
  // consider <VideoPlayer /> React component, it would be nice to control
  // whether its playing or paused by passing an isPlaying prop to it

  <VideoPlayer isPlaying={isPlaying} />;

  // Our custom videoplayer component renders the built-in vrowser <video />
  // tag:
  function VideoPlayer({ src, isPlaying }) {
    // TODO: do something with isPlaying
    return <video src={src} />;
  }
  
  // However the browser <video /> tag does not have an isPlaying prop
  // The only way to control it is to manually call the play() and pause()
  // methods on the DOM element. 
  //* We need to synchronize the value of isPlaying prop which tells 
  // * whether the video should currently be playing, with calls like
  //* play() and pause()

  // We first need to get a ref to the video DOM node
  // We might try to call play() or pause() during render but its not correct
  import { useState, useRef, useEffect } from 'react';

  function VideoPlayer({ src, isPlaying }) {
    const ref = useRef(null);
  
    if (isPlaying) {
      ref.current.play();  //! Calling these while rendering isn't allowed.
    } else {
      ref.current.pause(); //! Also, this crashes.
    }
  
    return <video ref={ref} src={src} loop playsInline />;
  }
  
  export default function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
      <>
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <VideoPlayer
          isPlaying={isPlaying}
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        />
      </>
    );
  }

// The reason this code is incorrect, is that it tries to do something with the DOM 
// during rendering. In React, //!rendering should be a pure calculation of JSX
//! and should not contain side effects like modifying the DOM

// Moreover, when VideoPlayer is called for the first time, its DOM does not exists
//yet!

//* The solution here is wrap the side effect with useEffect to move it out
//* of the rendering calcualtion.
import { useEffect, useRef } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  });

  return <video ref={ref} src={src} loop playsInline />;
}

// By wrapping the DOM update in an Effect we let react update the screen first
// Then Effect runs

// In this example eternal system is browser media API.

//! Pitfall
// By default Effects run every render. This is why code like this will 
// produce an infinity loop*
const [count, setCount] = useState(0);
useEffect(() => {
  setCount(count + 1); // setState -> rerender --> setState ...
});
//! this is generally bad practice to only work with local state in effect.
//! in this case we probably dont need an Effect

//todo Specify the Effect dependencies:

// By default Effects run after every render. Often, this is not what we want

// 1 Sometimes, its slow. Syncronizing with an external system is not always
// instant, so we might wantto skip doing it unless its necessary
// For example we dont want to reconnect to the chat server on every keystroke

// 2 Sometimes it wrong, when eg animation should only play once when
// component appears for the first time

// demonstration:
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  //! here useffect will run after each render
  //! because parent`s typing cause setState and rerender of it and its children
  useEffect(() => {
    if (isPlaying) {
      console.log('Calling video.play()');
      ref.current.play();
    } else {
      console.log('Calling video.pause()');
      ref.current.pause();
    }
  }, [isPlaying]); 
  //?? note if we add [] react will cause error: Missing dependency

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
//The problem is that the code inside of Effect depends on the isPlaying 
// prop to decide what to do, but this dependency was not explicity declared.
//* To fix this issue we added [isPlaying] to the dependency array

//! PITFALL
//! The behaviors without the array and with empty array are different
useEffect(() => {
    // This runs after every render
  });
  useEffect(() => {
    // This runs only on mount (when the component appears)
  }, []);
  useEffect(() => {
    // This runs on mount *and also* if either a or b have changed since the last render
  }, [a, b]);

  //? DEEP DIVE: WHY WE DONT USE REF IN DEPENDENCY ARRAY

    const ref = useRef(null);
    useEffect(() => {
      if (isPlaying) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }, [isPlaying]);

    // This is because the ref object has a stable identity. React 
    // guarantees that we always get the same object from the same useRef
    // call on evert render. It never changes, so it will never by itself
    // cause Effect to re-run. Therefore, it does not matter whether we include
    // it or not
    //! the setters from useState also have stable identity, so 
    // they are oftem ommited from dependencies. 
    //! but when we pass ref for example from a parent component,
    //! we would have to specify iy in the dep arr.


    //todo ADD CLEANUP IF NEEDED

    // Consider a different example. We write a chat room, we have connect()
    // we have sisconnect()

    //It would be slow to connect to the chat 
    //after every re-render, so you add the dependency array:
    useEffect(() => {
        const connection = createConnection();
        connection.connect();
      }, []); //? only once after initial render not every re-render
//The code inside the Effect does not use any props or state, so your dependency
// array is [] (empty). This tells React to only run this code when the component
// “mounts”, i.e. appears on the screen for the first time.

//* Example above cause next problem:
// user entered once ... connected, user switch page, returns back, 
// connected again. second connection is setted
// because we didnt destroy first one.

// Bugs like this are easy to miss. To help solve them in development React
// remounts every component once imidiately after initial mount.

//* to fix just add
useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []);

  // * CLEANUP FUNCTION IS CALLED WHEN COMPONENT UNMOUNTED

  // we will see
  //*Connecting...
  //!Disconnected
  //*Connecting...

  // * This is correct behavior, bt remounting comp React verifyes that
  // navigation away and back would not break our code.
  //* In prod we only will see Connecting...

  //todo Subscribing to Events
  // If Effect subscribe to something, need unsub
  useEffect(() => {
    function handleScroll(e) {
      console.log(window.scrollX, window.scrollY);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  //todo Triggering Animations
  useEffect(() => {
    const node = ref.current;
    node.style.opacity = 1; // Trigger the animation
    return () => {
      node.style.opacity = 0; // Reset to the initial value
    };
  }, []);

  //todo Fetching Data
  // If Effect fetches something, the cleanup func should either 
  //? abort the fetch or ignore its result
  useEffect(() => {
    let ignore = false;
  
    async function startFetching() {
      const json = await fetchTodos(userId);
      if (!ignore) {
        setTodos(json);
      }
    }
  
    startFetching();
  
    return () => {
      ignore = true;
    };
  }, [userId]);

  // We cant undo a nrtwork request that already happened, but cleanup func 
  //should ensure that the fetch thats not relevant anymore does not
  // keep affecting application. If userId cnages from Alice to Bob,
  // cleanup ensures that the Alice response is ignored even if it arrives 
  // after Bob

  //? DEEP DIVES: Good alternatives to data fetching in Effects
  // Manual approach has significant downisdes*
  //1. Effect dont run on the server: means that for usert to start fetch
  // something he need to load all JavaScript and Application to discover
  // that he needs to fetch something
  //2. Fetching directly in effects makes it easy to create "network waterfalls"
  // render parent - it fetches, render child - it fetches, etc
  // 3. It usualy means we dont preload or cache data. Eg if unmount,
  // it needs to fetch data again
  // 4. Not ergonomic there is a quite boilerplate code , fetch calls
  // like this can cause race conditions

  //? Use framework , like RTK or ReactQuery
  //? Otherwise we can build client-side cache manually


  //todo NOT EFFECT - buying a product
  // 
  useEffect(() => {
    // 🔴 Wrong: This Effect fires twice in development, exposing a problem in the code.
    fetch('/api/buy', { method: 'POST' });
  }, []);
  function handleClick() {
    // ✅ Buying is an event because it is caused by a particular interaction.
    fetch('/api/buy', { method: 'POST' });
  }

  //!React always cleans up the previous render’s Effect before the next render’s Effect
  //! Each Effect “captures” the text value from its corresponding render
  //! Effects from each render are isolated from each others (closure)

  //? DEEP DIVE: Each render has its own Effects-----------------------

  // We can think of useEffect as "attaching" a piece of behaviour to
  // the render output. Consider this effect:

  export default function ChatRoom({ roomId }) {
    useEffect(() => {
      const connection = createConnection(roomId);
      connection.connect();
      return () => connection.disconnect();
    }, [roomId]);
  
    return <h1>Welcome to {roomId}!</h1>;
  }

  //Let’s see what exactly happens as the user navigates around the app.

  //* Initial render 
  // The user visits <ChatRoom roomId="general" /> 

   // JSX for the first render (roomId = "general")
   return <h1>Welcome to general!</h1>;

   // Effect for the first render (roomId = "general")
  () => {
    const connection = createConnection('general');
    connection.connect();
    return () => connection.disconnect();
  },
  // Dependencies for the first render (roomId = "general")
  ['general']

  //React runs this Effect, which connects to the 'general' chat room.

 //* Re-render with same dependencies 
 //Let’s say <ChatRoom roomId="general" /> re-renders. The JSX output is the same:
  
 // JSX for the second render (roomId = "general")
  return <h1>Welcome to general!</h1>;

  //React sees that the rendering output has not changed, 
  //so it doesn’t update the DOM.

  //The Effect from the second render looks like this:

  // Effect for the second render (roomId = "general")
  () => {
    const connection = createConnection('general');
    connection.connect();
    return () => connection.disconnect();
  },
  // Dependencies for the second render (roomId = "general")
  ['general']

  // React compares ["general"] from the second render with ["general"]
  // from the first render. //! Dependencies are same, React ignores Effect
  //! from the second render

  //* Rerender with different dep
  //Then, the user visits <ChatRoom roomId="travel" />. This time, the component returns different JSX:
    // JSX for the third render (roomId = "travel")
    return <h1>Welcome to travel!</h1>;

    // /React updates the DOM to change "Welcome to general" into "Welcome to travel".
    //The Effect from the third render looks like this:
  // Effect for the third render (roomId = "travel")
  () => {
    const connection = createConnection('travel');
    connection.connect();
    return () => connection.disconnect();
  },
  // Dependencies for the third render (roomId = "travel")
  ['travel']

  // compare ["travel"] and ["general"]. Dependency is different,
  // Object.is("travel", "general") is false. The effect runs

  //! Before React can apply the effect from third render, it needs to clean
  // ! up the last Effect that did run.
  // The second render efect was skipped, so React needs to clean up the 
  // first renders effect. (from first render connection.disconnect())

  // After that, React runs the third renders Effect. It connects to the "travel"
  //chat room

  //* Unmount
  // Finally, lets say the user navigates away and the ChatRoom Unmounts.
  // React runs the last effect clean up function. The last effect was from
  // the third render. The third render cleanup adestroys travel connection

  //* When strict mode 
  //React remounts every component once after mount (state and DOM preserved)
  // It helps to find Effects that need cleanup and exposes bugs like race 
  // conditionds early.  Additionally, React will remount the Effects whenever you save a 
  //file in development. Both of these behaviors are development-only.
  //?------------------------------------------------------------------


  //todo RECAP

  //1. Unlike events, Effects are caused by rendering itself rather than
  // particular interaction.

  //2. Effects let us syncronize a component with some extternal system
  // 3. By default effects run after every render
  //4. React will skip the Effect if all dependencies have same values
  // 5. We cant choose our dependencies. They are determined by the code
  // inside the Effect
  // 6. Empty dependency array correpsonds component maunting []
  // 7. In Strict mode React mounts components twice dev only
  // 8. If effect breaks because of remounting need to impl cleanup function
  //! 9. React will call cleanup funcion before the Effect runs next time
  //! and during the unmount