// * Data types in JavaScript

// JS, like many programming languages, has a variety of data types to represent
// different kinds of data. The main data types in JS can be divided into
// two categories: //! primitive and non-primitive (reference) types

//todo PRIMITIVE Data
// Primitives are immutable, they are passed by value

// * 1. Number
// - represent both integer and floating-point nums. JS only has one type of number:
let age = 25;
let price = 99.9;

// * 2. String
// Represents sequance of characters. Strings can be enclosed in single quotes, double
// quotes or backticks
let greeting = "Hello, world!";
let message = `Welcome, ${name}!`;

// * 3. Boolean
//  represents  logical entities and can have two values: true and false
let isActive = true;
let isOver18 = false;

// * 4. Undefined
// A variable that has been declared but not assigned a value is of type undefined
let user;
console.log(user); // undefined

// * 5. Null
// Represents the intentional absence of any object value. It is a primitive value
// and is treated as a falsy value
let user2 = null;

// *  Symbol
// A unique and immutable primitive value typically used as the key of an object property

//* Bigint
// Used for representing integers with arbitrary
//percision(Используется для представления целых чисел с произвольной точностью.),
//useful for workingwith very large numbers

//BigInt values represent numeric values which are too large to be represented
//by the number primitive.

let bigNumber = BigInt(9007199254740991);
let anotherBigNumber = 1234567890123456789012345678901234567890n;

//todo NON-Primitive (reference) data
// All these elements are Object. They are passed by reference

// * Object
// Object is used to store collection of data and more complex entities
let person = {
  name: "Alice",
  age: 30,
};

// * Array -
// a special type of object used for storing ordered collections of data

let number = [1, 2, 3, 4, 5];

// * Function
// Functions in JS are object, they can be defined using function drcleataions
// or expressions
function greet() {
  console.log("Hello!");
}

let add = function (a: number, b: number) {
  return a + b;
};

//* Date
// represents dates and times. The date object is used to work with dates
let today = new Date();

//* RegExp
// Represnts regular expressions, which are patterns used to match character combinations
// in strings

// * Map
// A collection of keyed data items, similaar to an object but allows keys of any type
let map = new Map();
map.set("key", 2);

// * Set
// A collrction of unique values

let set = new Set();
set.add(1);
set.add(map);
set.add(set);

//todo Determininng data types

// JS is a dynamycally typed language, which means variables can hold values of
// different data types over time. The typeof operator can be used to determine the
// data type of value or variable

typeof 42; //number
typeof "hello"; // string
typeof true; // boolean
typeof undefined; // undefined
typeof null; // "object" (this is a historical bug in JavaScript)
typeof Symbol(); // symbol
typeof BigInt(123); // bigint
typeof {}; // object
typeof []; // object
typeof function () {}; // function

// todos Pitfall

// ! Type coercion (приведение типов)

// Javascript often performs type coercion, converting values from one type to another
// which can lead to unexpected results

let result = "5" + 2; //  "52"
//@ts-ignore
let difference = "5" - 2; // 3

// First example - since strings can be concatenated with + , the number is converted
// into a string, so number>string

// Second - since string cannot work with minus , but two numbers can, so string>number

//! Rule of type coercion

// JS follows a set of rules and priorities when it comes to type coercion.
// These rules dicatate how values of different data types are automatically converted
// to make them compatible for operations or comparsions:

// 1. When a numeric value is concatenated with string using +, number >> string
// 2 When a string value is involved in a arithmetic operation, JS attempts to convert it
// to a numeric value
// 3. When comparing values using == or != operators, js performs type coercion
// 4. JS has a concept of truthy and falsy values, where certain values are
// coerced to true or false in a boolen context
// Falsy values include false, 0 , "", null, undefined and NaN. All other values considered
// thruthy
