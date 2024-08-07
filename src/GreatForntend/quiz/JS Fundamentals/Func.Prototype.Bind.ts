// * Explain function prototype bind

// Function.prototype.bind allows to create a new function with a
// specific this context and, optionally, preset arguments,
// bind is most useful for preserving(сохранения) the value of this in methods
// of classes that you want to pass into other functions

// bind was frequently used on legacy React class component methods,
// which were not defined using arrow functions

const jhon = {
  age: 42,

  getAge: function () {
    return this.age;
  },
};

console.log(jhon.getAge()); //42

const unboundGetAge = jhon.getAge;
console.log(unboundGetAge()); // undefined

const boundGetAge = jhon.getAge.bind(jhon);
console.log(boundGetAge()); // 42

const mary = { age: 21 };
const boundGetAgeMary = jhon.getAge.bind(mary);
console.log(boundGetAgeMary()); // 21

// In the example above when the getAge is called without a calling object
// as unboundGetAge, the value is undefined; because the value of this
// within getAge() becomes the global object. boundGetAge() has its
// this bound to john, hence it is able to obtain age of jhon
// its allowed to bind getAge to abosolutely different object , like in
// example with mary

// * Use cases:

//* 1. Preserving context and fixing the this value in callbacks

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, iam ${this.name}`);
  }

  greetArrow = () => {
    console.log(`hello im ${this.name}`);
  };
}

const jhon1 = new Person("Jhon Doe");
// without bind this inside the callback will be the global objext
setTimeout(jhon1.greet, 1000); // Hello my name is undefined

// using bind to fix this value
setTimeout(jhon1.greet.bind(jhon), 2000); // Hello my name is jhon

// We can also use arrow functions to define class methods for this purpose
// instead of using bind. Arrow functions have the this value bound to
// its lexical environment (when they defines)

setTimeout(jhon1.greetArrow, 1000); // Hello my name is jhon

// * Partial application of functions (currying) частичное применение функций (карирование)

function multiply(a: number, b: number) {
  return a * b;
}

// using bind to create new function with some argument pre-set
const multiplyBy5 = multiply.bind(null, 5);
console.log(multiplyBy5(3)); // 15

// * Method borrowing
// Заимствование метода аналогично примеру выше с Mary
