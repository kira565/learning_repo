// * What are Symbols used for

// Symbols in Javascript are a unique and immutable data type used
// primarly for object property keys to avoid name collisions

//* Key characteristics

// 1. Uniqueness - Each symbol value is unique, even if they have
// the same description

// 2. Immutability - Symbol values are immutable, meaning their value cannot be changed

// Non-enumerable - Symbol properties are not included in for..in loops or Object.keys()

// * Creating Symbols

// it can be created using Symbol function

const sym1 = Symbol();
const sym2 = Symbol("uniqueKey");

console.log(typeof sym1); // symbol

//@ts-ignore
console.log(sym1 === sym2); // false because eeach symbol is unique

//! Note that Symbol function must be called woth the new keyword

//* Using Symbols as object property keys

const obj: any = {};
const sym = Symbol("uniquekey");

obj[sym] = "value";
console.log(obj[sym]); // "value"

//* Symbols are not enumerable
// Symbol properties are not included in for...in loops or Object.keys
// this makes them suitable for creating private/internal object state
// Use Object.getOwnProprtySymbols(obj) to get all symbol properties on an object

const mySymbol = Symbol("privateProperty");
const obj1 = {
  name: "Jhon",
  [mySymbol]: 42,
};

console.log(Object.keys(obj)); // ["name"]
console.log(obj[mySymbol]); // 42

//* Global symbol registry
// You can create global Symbols using Symbol.for("key"), which creates a new Symbol in the global registry if
// it doesnt exist, or rturns exisiting one. This allows you to reuse Symbols across different parts of your
// code base or even across different code bases

const globalSym1 = Symbol.for("globalKey");
const globalSym2 = Symbol.for("globalKey");

//@ts-ignore
console.log(globalSym1 === globalSym2); // true

const key = Symbol.keyFor(globalSym1);
console.log("key"); // "globalKey"

//* Well-known Symbol

// Javascript includes several built-in Symbols referred as well-known Symbols

// Symbol.iterator: Defines the default interator for an object
// Symbol.toStringTag Used to create a string description for an object
// Symbol.hasInstance - Used to determine if an object is an instanceof a constructor

//* Symbol iterator
// Symbol.iterator allow to define custom function which will be used for interations
// like for of , .forEach, etc

let iterable = {
  [Symbol.iterator]() {
    let step = 0;
    return {
      next() {
        step++;
        if (step <= 5) {
          return { value: step, done: false };
        }
        return { done: true };
      },
    };
  },
};

for (let value of iterable) {
  console.log(value); // 1, 2, 3, 4, 5
}

//* Symbol.toStringTag
let myObj = {
  [Symbol.toStringTag]: "MyCustomObject",
};

console.log(Object.prototype.toString.call(myObj)); // "[object MyCustomObject]" that we usually see as [object Object]

//* Summary
// Symbols are a powerful feature in JavaScript, especially useful for creating unique object properties and
// customizing object behaviour. They provide a means(предоставляют средства) to create hidden properties,
// preventing accidental(случайный) access or modification, which particularly beneficial in large scale
// applications and libraries
