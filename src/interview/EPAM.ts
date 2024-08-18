// @ts-nocheck
//javascript section

// todo 1
const arr = [1, 3, 4, 5];
arr.name = "dada";

//* for..in loop iterates over all enumerable properties of an object
//* including inherited from prototype chain
//! for...in loop particulary used to iterate over object
// so in case of array it will iterate all enumerable props and //! NOT ONLY ARRAY ELEMS
// array is an object so it is allowed

// so we can also for example add to prototype
Array.prototype.bibo = "bibo";
// and as result we will get
for (let el in arr) {
  console.log(el); //0,1,2,3,"dada","bibo"
}
//! Conclusion: using for...in for Arrays is generally not recommended

//* ES2015 new way to iterate all fine, Array has built in iterator and it
// * iterates through array values
for (let el of arr) {
  console.log(el); //1,3,4,5
}

//todo2
console.log(4);
const promise = new Promise((res, ref) => {
  console.log(3);
  setTimeout(() => {
    console.log(1);
    res(6);
    console.log(2);
  });
  console.log(5);
});

promise.then((val) => {
  console.log(val);
});

//Outpit:

//4, 3, 5, 1, 2, 6

//todo 3
const obj = {
  name: "bobby",
  func: () => {
    // todo how to make it ok using bind apply or call
    return this.name + "my name ";
  },
};

//todo 4
const obj = {};
//how to define setter or getter and how to add
// protected properties

// * setter and getter answer was right
const obj = {
  beer: "",

  set beer(val: any) {
    return val;
  },

  get beer() {
    return this.beer;
  },
};

//todo4 prototype vs __proto__

// __proto__ expsoses hidden [[Prototype]] property
// .prototype - function property which used to create new Object
// so basically __proto__ has reference to .prototype of constructor
// if object has been created using this constructor

//typescript session is super fail

// TypeGurads, Union,
// any vs unknown
// class method modifiers
// infer

//react session

// forward ref
// when rerender
// useLayoutEffect
// how many methods to manage state

//node.js

//security supre fail xxs attacks etc
