//@ts-nocheck
//* Updating objet in state

// State can be hold any kind of JS value, including objects. But we shouldnt change
// the objects that we hold in THe React State directory. Instead when we want to update
// an object, we need to create a new one (or make a copy of existing), and then set the
// state to use that copy

//todo WHAT IS MUTATION
// So far we are working with numbers, strings and booleans, these kinds of values are
// immutable in Javascript. Meaning they are unchangeable or readonly. We can trigger
// re-render to replace a value:
const [x, setX] = useState(0);
setX(5);

// THe x state changed from 0 to 5 but number 0 itself didnt change. Its not possible to
// make any changes to the built in primitives like numbers, strings, booleans in JS.

// Now lets consider an object in state
const [position, setPosition] = useState({ x: 0, y: 0 });

// technically its possible to change the contents of the object itself. This is called
// !mutation:

position.x = 5;

// However although objects in React state are technically mutable, we should treat them
// as if they were immutable - like numbers, booleans and strings. Instead of mutating
// them, we should always replace them.

//todo LOOK AT STATE AS READONLY
//! in other words we should think about Javascript object that we put into state as about
//! read-only

// this example should represent the current pointer position . But dot stays in the initial
import { useState } from "react";
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  return (
    <div
      onPointerMove={(e) => {
        position.x = e.clientX;
        position.y = e.clientY;
      }}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          backgroundColor: "red",
          borderRadius: "50%",
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20,
        }}
      />
    </div>
  );
}

// The problem is here
// onPointerMove={e => {
//     position.x = e.clientX;
//     position.y = e.clientY;
//   }}

// this code modifies object assigned to position from the prev render, but without
// using the state setting function, React has no idea that object has changed.
// So React doesnt do anything.

// to trigger a re-render create a new object and pass to the state;

setPosition({
  x: e.clientX,
  y: e.clientY,
});

//With set position we telling React : replace position with new object, render this comp
// again

// ? DEEP DIVE: Local mutation is fine
// This code is the problem because it modifies existing object;
position.x = e.clientX;
position.y = e.clientY;

// But this code is absolutely fine, because we mutating a fresh object, we jsut created
const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
// In fact its completely equivalent to
setPosition({
  x: e.clientX,
  y: e.clientY,
});

//! Mutation is only a problem when we change existing object that are already in state.
//! Mutatung an object we just created is okay because no other code references it yet.
//! Changing it isnt going to accdentaly impact something that depends on it.
//! This is called a "LOCAL MUTATION" , we can even do local mutation while rendering
//! very convinient and completely ok

//* Copying object with the spread syntax
// When we want to include existing data as a part of the new object
setPerson({
  ...person, // Copy the old fields
  firstName: e.target.value, // But override this one
});
//! note that spread syntax is "shallow", it only copies things one level deep,
//! it make it fast but that means we need to do something like this for updating nested prop:
setPerson({
  ...person, // Copy the old fields
  bestFriend: {
    ...person.bestFriend,
    firstName: "Dodo",
  },
  firstName: e.target.value, // But override this one
});

//? DEEP DIVE: Using a single event handler for multiple fields

// We can also use [ and ] braces inside our object definition to specify a property with
// dynamic name. Here is the same example, but with a single event handler instead of
// three different ones

const [person, setPerson] = useState({
  firstName: "Barbara",
  lastName: "Hepworth",
  email: "bhepworth@sculpture.com",
});

function handleChange(e) {
  setPerson({
    ...person,
    [e.target.name]: e.target.value,
  });
}
<input name="firstName" value={person.firstName} onChange={handleChange} />;
<input name="email" value={person.email} onChange={handleChange} />;
<input name="lastName" value={person.lastName} onChange={handleChange} />;

// here is the e.target.name refers to name property given to input

//? Deep Dive: Objects are not really nested
// An object like this appears nested in code
let obj = {
  name: "Niki de Saint Phalle",
  artwork: {
    title: "Blue Nana",
    city: "Hamburg",
    image: "https://i.imgur.com/Sd1AgUOm.jpg",
  },
};

// HOwever "nesting" is an inacurate way to think about how objects behave. When the code
// executes, there is no such thing as a "nested object". We really looking at two different
// objects:
let obj1 = {
  title: "Blue Nana",
  city: "Hamburg",
  image: "https://i.imgur.com/Sd1AgUOm.jpg",
};

let obj2 = {
  name: "Niki de Saint Phalle",
  artwork: obj1,
};
// Obj1 is not inside obj2
let obj1 = {
  title: "Blue Nana",
  city: "Hamburg",
  image: "https://i.imgur.com/Sd1AgUOm.jpg",
};

let obj2 = {
  name: "Niki de Saint Phalle",
  artwork: obj1,
};

let obj3 = {
  name: "Copycat",
  artwork: obj1,
};

// if we were mutate obj3.artwork.city,  it would affect both obj2 and obj1,
// obviously because object is referenced data type.

// todo Write concise update logic with Immer

// If our state is deeply nested, we might want to consider flattening it. But if we
// dont want to change state structure, we might prefer a shortcut to nested spteads.
//?<Immer>
// is a popular library that lets write using the convinient but mutating syntax and takes
// care of producing the copies. With immer , the code we write looks like we
// breaking the rules and mutating an object
updatePerson((draft) => {
  draft.artwork.city = "Lagos";
});
//But unlike a regular mutation, it doesn’t overwrite the past state!
// Immer provide proxy object and records what we do with it.
// useImmer / yarn add use-immer

//? DEEP DIVE: Why mutating state is not recomended in React
// 1. Debugging.
// 2. Optimization: Common react optimization is skipping work if prev props or state are
// the same if you never mutate state is very fast tocheck whether there were any changes
// 3 New features are rely on state as snapshot, if we mutate past state, that can breake it
// 4. Requirement changes: eg hard to implement Undo/Redo
// 5. Simpler implementation:  React doesnt rely on mutation, it does not need to do
// anything special with object. It does not need to hijack their properties, etc.

// todo RECAP
// 1. Treat(относиться как к иммутаблу) all state in React as immutable.
// 2. When we store object in state, mutating them will not trigger renders.
// it will change state in prev snapshot
// 3. Instead of mutating of object , create a new version of it and trigger a rerender by
// setting state
// 4. You can use the {...obj, something: 'newValue'} object spread syntax to create copies of objects.
// 5. Spread syntax is shallow: it only copies one level deep.
// 6. To update a nested object, you need to create copies all the way up from the place you’re updating.
// 7. To reduce repetitive copying code, use Immer.
