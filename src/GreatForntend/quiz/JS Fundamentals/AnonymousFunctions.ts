// * Anonymous functions
// The filter method is passed an anonymous function.
//(методу фильтра передается ананонимная функция)
const arr: number[] = [];
arr.filter((x) => x > 1);

// Anonymous functions provide a more concise(краткий) way to define functions
// especially for simple operations or callbacks. Besidesthat, they can also be used
// in the following scenarious

//* Immediate execution

// Anonymous functions are commonly used in Immediately invoked Function Expressions to
// encapsulate cdoe within a local scope. This prevent variables declared within
// the function from leaking to the global scope and polluting the global namespace

// This is an IIFE
(function () {
  var x = 10;
  console.log(x); // 10
})();

// x is not accessible here
//@ts-ignore
console.log(typeof x); // undefined

//* Callbacks
// anonymous functions can be used as callbacks that are used once and do not need to be used
// anywhere else. The code will seem more self-contained and readable when handlers are defined
// right inside the code calling them, rather than having to search elsewhere to find the
// function body
setTimeout(() => {
  console.log("Hello world!");
}, 1000);

//* High-order functions
// It is used as arguments to functional programming constructs like High-order functions or Lodash
// Higher order functions take other functions as arguments or return them as results. Anonymous
// functions are often ised with high-order functions like map, filter, reduce.
const arr3 = [1, 2, 3];
const double = arr3.map((el) => {
  return el * 2;
});
console.log(double); // [2, 4, 6]

//* Event handling

// In React, anonymous functions are widely used for defining callback functions inline for
// handling events and passing callbacks as props

// function App() {
//   return <button onClick={() => console.log("Clicked!")}>Click Me</button>;
// }
