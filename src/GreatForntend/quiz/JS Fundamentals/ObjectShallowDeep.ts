// In programming languages there are two spaces to store data in computer memory the stack
// and the heap

// stack - is temporary storage memory, to store local primitives ate refs to objects

// the hrap stores global variable. Object values are stored on the heap and the stack
// contains just reference to them

//! so entire object creates in heap, then we use many references to it in stack
// ! its removing when it doesnt contain references anymore

// We have to kinds of object copies in JS : shallow and deep. In a nutshell, shallow copies
// are used for "flat" objects (contains obly primitives) and deep copies for nested objects.

// flat : [1, 2, 3, 4, 5]

//nested: [“laptop”, {value: 5000}]

//* For Shallow copies we can use:
// 1 Spread syntax [...], {...}
// 2 Array.from()
// 3 Object.create()
// 4. Array.prototype.concat()

//* For deep copy

// 1. JSON.parse(JSON.stringify(obj))
const objOld = { a: "a" };
const obj = structuredClone(objOld);

//* Examples

const numbers = [1, 2, 3, 5];
const _numbers = [...numbers];

_numbers[0] = 10;

console.log(numbers);
console.log(_numbers);
// [1, 2, 3, 4, 5]
// [10, 2, 3, 4, 5]

// For such objects a shallow copy is sufficient (достаточно)

//* Lets look on problem with shallow copies and nested objects
const language = ["JavaScript", { age: 26, creator: "Brendan Eich" }];
const _language = [...language];

//@ts-ignore
_language[1].age = 126;

console.log(language);
console.log(_language);

// ["JavaScript", {age: 126, creator: "Brendan Eich"}]
// ["JavaScript", {age: 126, creator: "Brendan Eich"}]

// In this case changing the copy also altred the source value.

//* Let’s create a deep copy of the same object.

const language1 = ["JavaScript", { age: 26, creator: "Brendan Eich" }];
const _language1 = JSON.parse(JSON.stringify(language));
const __language1 = structuredClone(language);

_language1[1].age = 126;
//@ts-ignore
__language1[1].age = 1;

console.log(language);
console.log(_language);
console.log(__language1);

// ["JavaScript", {age: 26, creator: "Brendan Eich"}]
// ["JavaScript", {age: 126, creator: "Brendan Eich"}]
// ["JavaScript", {age: 1, creator: "Brendan Eich"}]

//! NOTE structuredClone() is a feature of browsers not Javascript itself
