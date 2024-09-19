// * What is JSX ?
// Jsx stands for JavaScript XML and XML-like syntax extension to ECMAScript. Basically its just provides the syntax sugar
// for the React.createElement(type, props, ..children) function, giving us expressivness of JavaScript along with HTML like
// template syntax.
// EG 
export default function App() {
  return <h1 className="greeting">{"Hello, this is a JSX Code!"}</h1>;
}
// without JSX:
import { createElement } from "react";

export default function App() {
  return createElement(
    "h1",
    { className: "greeting" },
    "Hello, this is a JSX Code!"
  );
}

//* How to loop inside JSX
// We can simply use Array.prototype.map with ES6 arrow function syntax
// Fir example the items array of objects is mapped into array of components:

//eg loop 
const rows = [];
for (let i = 0; i < numrows; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    rows.push(<ObjectRow key={i} />);
}

<tbody>
  {items.map((item) => (
    <SomeComponent key={item.id} name={item.name} />
  ))}
  {rows}
</tbody>

//* How JSX prevent XSS attacks
// React DOM escapes any values embedded in JSX before rendering them. It ensures that anything, that not explicity
//written in our app can never be injected. Everything is converted to a string before being rendered.
const name = response.potentiallyMaliciousInput;
const element = <h1>{name}</h1>;
//This way we can prevent XSS(Cross-site-scripting) attacks in the application.

//* How to pring falsy value in JSX
// The falsy values such as false,null,undefined and true are valid children but they dont render anything.
// If we still need to print them we need to convert them into string
<div>My JavaScript variable is {String(myVariable)}.</div>

//* Do browser understand JSX?
// Ofc no, we need to convert our JSX to regualr Javascript that browsers can understand. The most widely used transpiler now
// is Babel

//* New JSX Transform (where we dont need to import React)
// Benefits:
// no need to import React, The compiled output might improve bundle size, 
//Before:
import React from "react";

function App() {
  return React.createElement("h1", null, "Good morning!!");
}
//After
function App() {
  return <h1>Good morning!!</h1>;
}
//? Under the hood:
import { jsx as _jsx } from "react/jsx-runtime";

function App() {
  return _jsx("h1", { children: "Good morning!!" });
}


// 
//? JSX elements must be wrapped in an enclosing tag.
//? What is this concept known as?
// * Encapsulation
//JSX elements must be wrapped in an enclosing tag, a concept similar to encapsulation in other programming languages.
// It means adjacent JSX elements must be wrapped in an enclosing parent tag like these 2 duvs below wrapped in react fragment
<React.Fragment>
  <div>1</div>
  <div>2</div>
</React.Fragment>

//* KEYS in React 
// Rules of keys 
// Keys must be unique among siblings. However, it’s okay to use the same keys for JSX nodes in different arrays.
// Keys must not change or that defeats their purpose! Don’t generate them while rendering.
//!Note about keys:
//1. Using indexes for keys is not recomended if the order of items may change. this can cause performance issues
//2. If this is component list provide key for component
//3. key attribute accepts either string or number and convert it as string type
//4. dont generate the key on the fly like using Math.random(), they will never match.



//* inline condition expressions:
messages.length > 0 && !isLogin ? (
  <h2>You have {messages.length} unread messages.</h2>
) : (
  <h2>You don't have unread messages.</h2>
);