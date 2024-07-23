// @ts-nocheck
//* What is the difference between `==` and `===` in JavaScript?

//TL;DR
//== is the abstract equality operator while === is the strict equality operator.
//The == operator will compare for equality after doing any necessary type conversions.
// The === operator will not do type conversion, so if two values are not the same
//type === will simply return false.

//! == короч преобразует типы перед сравнением а === нет

//Equality operator (==)
//The == operator checks for equality between two values but performs type coercion if the values are
// of different types. This means that JavaScript will attempt to convert the values to a common type before
// making the comparison.

42 == "42"; // true
0 == false; // true
null == undefined; // true
[] == false; // true
"" == false; // true

//In these examples, JavaScript converts the operands to the same type before making the comparison. For example, 42 == '42' is true because the string '42' is converted to the number 42 before comparison.
//However, when using ==, unintuitive results can happen:

1 == [1]; // true
0 == ""; // true
0 == "0"; // true
"" == "0"; // false

//As a general rule of thumb, never use the == operator, except for convenience when comparing against
// null or undefined, where a == null will return true if a is null or undefined.
const a = null;
console.log(a == null); // true
console.log(a == undefined); // true

//Strict equality operator (===)
//The === operator, also known as the strict equality operator, checks for equality between two values
// without performing type coercion. This means that both the value and the type must be the same
// for the comparison to return true.
console.log(42 === "42"); // false
console.log(0 === false); // false
console.log(null === undefined); // false
console.log([] === false); // false
console.log("" === false); // false
// /For these comparisons, no type conversion is performed, so the statement returns false if the
// types are different. For instance, 42 === '42' is false because the types (number and string) are different.

//Bonus: Object.is()
//There's one final value-comparison operation within JavaScript, that is the Object.is() static method.
//The only difference between Object.is() and === is how they treat of signed zeros and NaN values.
//The === operator (and the == operator) treats the number values -0 and +0 as equal, but treats NaN as not
// equal to each other.

Object.is(NaN, NaN); // true
Object.is(-0, 0);

//Use == when you want to compare values with type coercion (and understand the implications of it).
// Practically, the only valid use case for the equality operator is when against null and undefined
// for convenience.
//Use === when you want to ensure both the value and the type are the same, which is the safer
// and more predictable choice in most cases.
