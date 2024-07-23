// * Scope
// var - function-scoped or if outside global-scoped
// let, const - block-scoped

function foo() {
  var a = 1;
  let b = 2;
  const c = 3;
}
// !outside they all will throw Reference Error

if (true) {
  var a = 1;
  let b = 2;
  const c = 3;
}
// outside a = 1 ,
//! b,c  are block-scoped so They throw Regerence error

//* Initialization
//var and let can be initialized without value but const not
var foo1;
let bar;
//!Error const must be initialized
//const baz;

//* Redeclaration
var foo2 = 1;
var foo2 = 1; // Redeclaration allowed

// !Error cannot redeclare
//const foo3 = 1;
//const foo3 = 2; same as let

//* Reassigment
var foo4 = 1;
foo4 = 2; //ok same as let

const boo4 = 1;
//!Error cannot assign
//boo4 =2

//*Accessing before declaration
//var variables are auto-initialized so it will be undefined
//@ts-ignore
console.log(foo3); // undefined
var foo3 = "foo";

//! ReferenceError: can't access lexical declaration  before initialization
//console.log(baz);
let baz = "baz";

//! ReferenceError: can't access lexical declaration  before initialization
//console.log(bar10);
const bar10 = "bar";

//*Conclusion
// In modern JavaScript, it's generally recommended to use const by default for variables that don't need to be reassigned. This promotes immutability and prevents accidental changes.
// Use let when you need to reassign a variable within its scope.
// Avoid using var due to its potential for scoping issues and hoisting behavior.
// If you need to target older browsers, write your code using let/const, and use a transpiler like Babel compile your code to older syntax.
