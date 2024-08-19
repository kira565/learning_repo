// * Manipulating the DOM with Refs

// React automatically updates the DOM to match render output, so our components wont often need to manipulae it.
// However, sometimes we might need access to the DOM element managed by React. For example, to focus a node,
// scroll to it, or measure its size and position. There is no built-in way to do those things in React.
// So we will need a ref to the DOM node.

//todo GETTING A REF TO THE NODE
// To access DOM node, managed by React, first, use useRef hook
import { useRef } from 'react';
const myRef = useRef(null);
// Finally pass the ref as the ref attribute.
<div ref={myRef} />

// The useRef Hook returns an object with a single property called current.
// Initially myRef.current will be null. When React creates a DOM node for this div, React will put a reference
// to this node into myRef.current. We can then access this DOM node from or event handlers. and use the 
// built-in browser API defined on it (Element - Document object)
//? eg myRef.current.scrollIntoView()

//In this example clicking the button will focus the input
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus(); // .focus() method of HTMLElement
    //? Element is a general interface for all types of elements, and HTMLElement - base interface for all HTML elements, 
    //?SVGElement - for all svg
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}

//While DOM manipulation is the most common use case for refs the useRef hook can be used for storing other things outside React.

//? DEEP DIVE: How to manage a list of refs using a ref callback: -------------------------------------------------------------
// In this above examples there are predefined numbers of refs. Hovewer, sometimes we might need a ref to each item in the list
// And we dont know how many we will have. Something like this wouldnt work:
<ul>
  {items.map((item) => {
    // Doesn't work!
    const ref = useRef(null);
    return <li ref={ref} />;
  })}
</ul>
//! Because we cannot use hooks like this, they can be called at the top level of component.

// One possible way around is to get a single ref to their parent element, and then use DOM manipulation methods like
// querySelectorAll to find the individual child node from it. However it can break if DOM structure changes.

//* Another solution is to pass a function to the ref anntribute. This is called a ref callback. React will call our ref
// * callback with the DOM node when its time to set the ref and with null when its time to clear it. This lets us
//* maintain our own array or Map and access any ref by its index or some kind of ID.

//This example shows how we can use this approach to scroll an arbitary element in a long list
import { useRef, useState } from "react";

export default function CatFriends() {
  const itemsRef = useRef(null);
  const [catList, setCatList] = useState(setupCatList);

  function scrollToCat(cat) {
    const map = getMap();
    const node = map.get(cat);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToCat(catList[0])}>Tom</button>
        <button onClick={() => scrollToCat(catList[5])}>Maru</button>
        <button onClick={() => scrollToCat(catList[9])}>Jellylorum</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(cat, node);
                } else {
                  map.delete(cat);
                }
              }}
            >
              <img src={cat} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push("https://loremflickr.com/320/240/cat?lock=" + i);
  }

  return catList;
}


//? ----------------------------------------------------------------------------------------------------------------------------

// todo ACCESSING ANOTHER COMPONENTS DOM NODES
// When we put a ref on a built-in component that outputs a browser element like <inpu />
// react will set that refs current property to corresponding DOM node (such as the actual input) in the browser

// However, if we try to put a ref on our own component like <Myinput /> by default we will get null
// Here is an example demonstratin it. notice that the button click doesnt focus input
import { useRef } from 'react';

function MyInput(props) {
  return <input {...props} />;
}

export default function MyForm() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus(); //!  Cannot read properties of null (reading 'focus') (11:21) 
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
//React also print in console 
//! Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

// This happens because by default React doesnt let a component access to the DOM nodes of other components. Not even for its own children
// It is intentionally, manual manipulating another component DOM nodes make code even more fragile(хрупким)

// Instead components that want to expose their DOM nodes have to opt in that behavior
// Component can specify that it forwards its ref to one of its children. Heres how MyInput can use the forward ref API:

const MyInput = forwardRef((props, ref) => {
    return <input {...props} ref={ref} />
})

// This is how it works:
// 1. <MyInput ref={inputRef} /> tells React to put the corresponding DOM Node into inputRef.current. However. its up to the MyInput
// component to opt into that (согласиться на это) - by default it doesnt.
// 2. The MyInput component is declared using forwardRef. //* This opts into receiving the inputRef from above as the second argument 
// which is declared after props
// 3. MyInput itself passes the ref it recieved to the <input /> inside of it

// Now it works:

import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}

// In design systems it is comon pattern for low-level components like buttons, inputs, and so on to forward their refs to their DOM nodes
// On the other hand, high level components like forms,lists or page sections usually will not expose their DOM nodes to avoid accidental dependencies
// on the DOM Structure

//? DEEP DIVE: Exposing a subset of the API with an Imperatice handle. (Предоставление подмножества API с помощью императивного дескриптора)
// In above example, MyInput exposes the original DOM input element. This lets the parent component call .focus() on it.
// However this is also lets the parent do something elsem for example change its CSS style. In uncommon cases
// we may want to restrict the exposed fucntionality. We can do that with //? useImperativeHandle(ref, () => ({ })) Hook
// It gives React the instruction to provide special object with limited API
import {
  forwardRef, 
  useRef, 
  useImperativeHandle
} from 'react';

const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    // Only expose focus and nothing else
    focus() {
      realInputRef.current.focus();
    },
  }));
  return <input {...props} ref={realInputRef} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}

//todo WHEN REACT attaches refs
// In react every update is split in two phases:
// 1. During Rendering and Reconcilation, React calls components to figure out what should be on the screen.
// 2. Durin commit, React applies changes to thr DOM

// In general we dont want access refs during renderign and reconcilation. THat goes for refs holding DOM nodes as well
// During the first render, the DOM nodes have not yet been created, so ref.current will be null. And during the rendering of updates,
// the DOM nodes havent been updated yet. So its too early to read them.

//! React sets ref.current durring the commit phase
// Before updating DOM, React sets the affected ref.current values to null. After updating the DOM, React immediately sets them 
// to the corresponding DOM Nodes.

//! usually we will acces refs from event handlers.
// If we want to do something with a ref, but there is no particular event to do it. We might need an Effect
// Lets look on it on the next page

//? DEEP DIVE: Flushing state updates synchronously with flushSync (сброс обновлений состояний синхронно с помощью флаш синк)
// Consider code like this which adds a new todo and scroll the screen down to the last child of the list. Notice how, for some reason,
// it always scrolls to the todo that was //! jsut before the added one
import { useState, useRef } from 'react';

export default function TodoList() {
  const listRef = useRef(null);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    setText('');
    setTodos([ ...todos, newTodo]);
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  return (
    <>
      <button onClick={handleAdd}>
        Add
      </button>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: 'Todo #' + (i + 1)
  });
}

// The issue is with these two lines:
setTodos([ ...todos, newTodo]);
listRef.current.lastChild.scrollIntoView();
// * as we remember, in React state updates are queued.
// usually, this is what we want. However, here it causes a problem, because setTodos does not immidiately update the DOM.
// So, the time we csroll the list to its last element, the todo has not yet been attached. Thats why scrolling is always behind by 1 item.

//! To fix this, we can force React to update ("flush") the DOM synchronously.
// To do this, import flushSync from "react-dom" and wrap the state update into a flushSync call

flushSync(() => {
  setTodos([ ...todos, newTodo]);
});
listRef.current.lastChild.scrollIntoView();
//This will instruct React to update the DOM synchronously right after the code wrapped in flushSync executes. As a result, the last todo will already be in the DOM by the time you try to scroll to it


//todo BEST PRACTICES for DOM manipulations:

// Refs are an excape hatch, We should only use the, when we have to "step outside React"
// Common examples of this include managing focus, scroll position, or calling browser API
// that React doesnt expose.

// If we use it for non-distructive actions like above, we dont encourage any peoblems.
// Hovewer, if we try to modify the DOM manually, we can risk conflicting with the change React is making

// To illustrate the problem this example includes a welcome message and two buttons, 
// the first button toggles its presence using conditional rendering and state, 
// as we usually do in React. The secind button uses remove() DOM API to forcelly
// remove it from the DOM outside Reacts control.

//  After we manually removed the DOM element, trying to use setState to show it again will ead crash
//! This is because we changed DOM and React doesnt know how to continue to manage it correctly
// ! Avoid changeing DOM nodes managed by React. 
// It can cause inconsistent visual results or crashes

// However, this doesnt mean that we cant do it at all. It requires caution. 
//* We can safely modify parts of the DOM, that React has no reason to update.
// For example, if some div is always empty in the JSX, React wont have a reason to touch its children list
// Therefore its safe to manually add or remove elements there

// todo Recap 
// 1. Refs are generic concept, but most often they are used to hold DOM elements
// 2. We instruct React to put a DOM node into ref by passing <div ref={myRef}>
// 3. Usually we sue refs for non-desctructive actions like scrolling or measuring DOM elements
// 4. A component Doesnt expose its DOM nodes by default, we can opt into exposing DOM nodes by using forwardRef/
// 5. Avoid changing DOM nodes managed by React
// 6. If we do modify DOM nodes managed by React modify parts that react has no reason to update.