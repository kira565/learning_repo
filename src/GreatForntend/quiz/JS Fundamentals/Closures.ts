// * Understanding JavaScript Closures

//Closure is when a function is able to remember and access its lexical scope even when
// that function is executing outside its lexical scope

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

class A {
  f: Function;
  constructor() {
    this.f = () => this;
  }
}

class B {
  constructor(a: any) {
    console.log(a.f());
  }
}

new B(new A());

//todo Classic Interview question 1
// 1 What will the following code output?
for (var i = 0; i < 3; i++) {
  // замыкание (к моменту запуска таймера переменная i уже равна 10)
  setTimeout(function () {
    alert(i);
  }, 1000 + i);
}
// 3,3,3
//Переменная var – одна на все итерации цикла и видна даже после цикла.
// так как var существует в одном экземпляре на все итерации и она просто переписывается вот мы и получим к концу
// первого сет таймаута 3
// с let все иначе - так как у нее блочная видимость на каждый цикл будет свой let 0,1,2 как и ожидалось
//! у каждой итерации свой let в отличае от var

//todo Classic Interview question 2
// here need to implement curry
// but simplier than in greatfrontend

function curry(summ: number) {
  return (plus: number) => {
    summ += plus;
    return summ;
  };
}

//todo Classic Interview question 3
// use closure to create private counter

function counterClosure() {
  let counter = 0;

  return {
    add: () => {
      // ++ before means value of expression is the final value
      return ++counter;
    },
    retrieve: () => {
      // idk why just to show value?
      return counter;
    },
  };
}
