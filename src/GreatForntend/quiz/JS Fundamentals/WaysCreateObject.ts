// * Ways to create object in JS

// * 1. Object literals

// The simplest and most popular way {}. It can be used when you need to create a single object
// with fixed set of properties.

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};

//* Object() constructor

// This method involves using the new keyword with the built-in Object constructor to create
// an object. You can then add properties to the object using dot notation. It can be used
// when you need to create an object from primitive value or to create an empty object.

const person2 = new Object();

//* Object.create() Method.

// This method allows to create a new object using an existing object as a prototype.
// The new object inherits properties and methods from the prototype object. It can
// be used when you need to create a new object with specific prototype.

// Object.create() Method
const personPrototype = {
  name: "unknown",
  age: 0,
  greet() {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  },
};

const person3 = Object.create(personPrototype);
person3.name = "John";
person3.age = 30;

person3.greet(); // Output: Hello, my name is John and I'm 30 years old.

//An object with a prototype can be created by doing Object.create(null).

//* ES2015 classes

//Classes provide a more structured and familiar syntax (similar to other programming
// languages) for creating objects. They define a blueprint and use methods to interact
// with the object's properties. It can be used when you need to create complex objects
// with inheritance and encapsulation.
class Person {
  constructor(public name: string, public age: number) {
    this.name = name;
    this.age = age;
  }
  greet = () => {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  };
}

const person4 = new Person("John", 30);
const person5 = new Person("Alice", 25);

person4.greet(); // Output: Hello, my name is John and I'm 30 years old.
person5.greet(); // Output: Hello, my name is Alice and I'm 25 years old.

//* Constructor functions

// Constructor functions are used to create reusable blueprints for objects. They define
// the proprties and behaviors shared by all objects that type. You use the new keyword
// to create instance of the object. It can be used when you need to create multiple objects
// with similar properties and methods

//todo However, now that ES2015 classes are readily (с готовностью) supported in modern
//todo browsers, theres little reason to use constructor function to create an object

// Constructor function
const Person3 = function (this: any, name: string, age: number) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  };
};

//@ts-ignore
const person6 = new Person3("John", 30);
//@ts-ignore
const person7 = new Person3("Alice", 25);

person6.greet(); // Output: Hello, my name is John and I'm 30 years old.
person7.greet(); // Output: Hello, my name is Alice and I'm 25 years old.
