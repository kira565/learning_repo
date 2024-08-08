// * Understanding JavaScript Closures

// In JavaScript, a closure is a function that captures the lexical scope in which it was declared,
// allowing it to access and manipulate variables from an outer scope even after that scope has
// been closed

// Here is how it works

// 1. Lexical scoping
// Javascript uses lexical scoping, meaning a function's access to variables is determined by
// its actual location within the source code (джс использует лексическую область видимости то есть
// доступ функции к переменным определяется ее фактическим расположением в коде)
// ! there are three types of scopes: global, block and function

// 2. Function creation
// When a fuction is created, it keeps a reference to its lexical scope. This scope contains
// all the local variables that were in-scope at the time the closure was created

// 3. Maintaining state
// Closures are often used to maintain state in a secure way because the variables
// captured by the closure are not accessible outside function
// (Замыкания часто используются для безопасного сохранения состояния, поскольку переменные, захватываемые
// замыканием, недоступны вне функции.)

//* ES6 syntax and closures

// With ES6, closures can be created using arrow functions, which provide a more concise syntax and lexically
// bind the this value. Here is an example:

const createCounter = () => {
  let count = 0; // Data encapsulation (why use closures)
  return () => {
    count += 1;
    return count;
  };
};

const counter = createCounter();
console.log(counter()); // Outputs: 1
console.log(counter()); // Outputs: 2

// * Closures in React

// Closures in react
// Closures are everywhere. Below code shows a simple example of increasing a counter on a button click
// In this code, handleClick forms a closure. It has access to it's outer scope variable count
// and setCount

//@ts-ignore
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount([count + 1]);
  }
}

//* Why use closures?

// Using closures provide the following benefits:

// 1. Data encapsulation:
// Closures provide a way to create private variables and functions that cant be accessed from
// outside of closure. This is useful for hiding implementation details and maintaining
// state in an encapsulate way.

// 2. Functional programming
// Closures are fundamental in functional programming paradigms, where they are used to create
// functions that can be passed around and invoked later, retaining access to the scope in
// which they were created, e.g partial applications of currying

// 3. Event handlers and callbacks
// In JavaScript, closures are often used in event handlers and callbacks to maintain state or
// access variables that were in scope when the handler or callback was defined

// 4. Module patterns:
// Closures enable the module pattern in JavaScript, allowing the creation of modules with private
// and public parts
