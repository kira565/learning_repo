//! What's the difference between a variable
//! that is: `null`, `undefined` or undeclared?

// Trait(черта)      null               undefined        undeclared
// Meaning      Explicity set        Variable has       Variable has not
//              by the developer     been declared      been declared
//              to indicate that     but not assigned   at all
//              variable hasnt val   value

// Type         object               undefined          //!throw ReferenceError

//Equality
//Comparsion    null==undefined      undefined == null  //!throws RefferenceError
//              - true                  - true

//! Undeclared
// Undeclared variables are created when you assign a value to
// an identifier that is not previously created using var let or const
// Undeclared variables will be defined globally, outside of
// the current scope. In strict mode, a ReferenceError will be
// thrown when you try to assign to an undeclared variable.
//Undeclared variables are bad just like how global variables are
// bad. Avoid them at all cost! To check for them, wrap its
// usage in a try/catch block.

function foo() {
  x = 1; // Throws a ReferenceError in strict mode
}

foo();
console.log(x); // 1

//! undefined
// undefined is a variable that has been declared but not assignet a value
// Its type undefined. IF function does not return
// any value as the result of excecuting it is assigned to variable,
// the variable also has the value of undefined

let foo1;
console.log(foo1); // undefined
console.log(foo1 === undefined); // true
console.log(typeof foo1 === "undefined"); // true

console.log(foo1 == null); // true. Wrong, don't use this to check if a value is undefined!

function bar() {} // Returns undefined if there is nothing returned.
let baz = bar();
console.log(baz); // undefined

//! null
// A variable that is null will have been explicity assigned to the null
//it represents no value and its different to undefined
//in the sense that it has been explicity assigned
const foo2 = null;
console.log(foo2 === null); // true
console.log(typeof foo2 === "object"); // true

console.log(foo2 == undefined); // true. Wrong, don't use this to check if a value is null!

// TODO
// 1 As a good habit never leave your variables //!undeclared ot unassigned
// Explicity assign null th them after declaring if you
// dont intend to use them yet

// 2 Always explicity declare variables before using them to prevent errors

// 3 Using some static analysis tooling (TS,Eslint) will enable
// checks that you are not referencing undeclared variables
