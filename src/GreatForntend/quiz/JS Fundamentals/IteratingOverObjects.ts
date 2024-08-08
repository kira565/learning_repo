// * Iterating over objects

// Interating over objects properties and array properties is very common in Javascript and
// we have various ways to acheive this. Here are some of the ways to do it

//* For..in statement

// This loop iterates over all enumerable properties of an object, including those inherited
// from its prototype chain
const obj = {};
for (const property in obj) {
  if (Object.hasOwn(obj, property)) {
    console.log(property); // keys
  }
}

// Since for...in statement iterates over ALL the object's props (including inherited)
// Hence (следовательно) most of the time you should check whether the property exists
// on directly on the object via Object.hasOwn(obj, property)

//* Object.keys()
// is a static method that will return an array of the all enumerable property names of the
// object that you pass it. Since Object.keys() return an array, you can also sue the array iteration
// approaches listed below
Object.keys(obj).forEach((property) => {
  console.log(property);
});

//* Object.entries()
// This method returns an array of an objects enumerable properties in [key,value] pairs
const obj2 = { a: 1, b: 2, c: 3 };
Object.entries(obj2).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

//* Object.getOwnPropertyNames()

// Is a static method that will lists all enumerable and non-enumerable properties of the object,
// that you pass it. Since Object.getOwnPropertyNames() returns an array, you can also use the
// array iteration approaches listed below to iterate through it.
Object.getOwnPropertyNames(obj).forEach((property) => {
  console.log(property);
});

//todo Arrays

//*  for loop
const arr: number[] = [];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
//* Array.prototype.forEach()
// Maybe its more convinient sometime, however the downside is that we cannot stop the iteration
// halfway for or for...ofis more relevant if we need finer control over the iteration
arr.forEach((element, index) => {
  console.log(element, index);
});

//* For...of statement

// ES2015 introduces a new way to iterate, the for-of loop,
// that allows you to loop over objects that conform to the iterable protocol such as
// String, Array, Map, Set, etc. It combines the advantages of the for loop and the forEach()
// method. The advantage of the for loop is that you can break from it and the andvantage
// of forEach that we dont need a counter variable.

// Most of the time prefere forEach method but it realle depends on what we trying to do.
// Before ES2015 we used for loops when we needed to permaturely(преждевременно) terminate
// the loop using break; But now with ES2015 we can do that with for...of statement.
// Use for loops when we need more flexibility, such as incrementing the iterator more than
// once per loop

// Also when using the for...of statement, if we need to access both the index and value for
// each array element, we can do so with ES2015, Array.prototype.entires()

const arr2 = ["a", "b", "c"];

for (let [index, elem] of arr2.entries()) {
  console.log(index, ": ", elem);
}
