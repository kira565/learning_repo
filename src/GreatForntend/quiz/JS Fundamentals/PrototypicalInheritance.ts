//* Prototypical inheritance in Javascript;

// Prototypical inheritance is a feature in JS used to create objects that inherit
// properties and methods from other objects. Instead of class based inheritance
// model, JS uses a prototype-based model, where objects can directly inherit from
// other objects.

//* Key Concepts

// * 1. Prototypes:
//Every object in JS has a prototype, which is another object. When you create an
// object using an object literal or a constructor function, the new object is linked
// to the prototype of its constructor function or the Object.prototype if no
// prototype specified. This is comonly referenced (ссылаются) using __proto__ or
// [[Prototype]]. You can also get the prototype by using method Object.getPrototypeOf()

// Define a constructor function
function Person(name: string, age: number) {
  //@ts-ignore
  this.name = name;
  //@ts-ignore
  this.age = age;
}

// Add a method to the prototype
Person.prototype.sayHi = function () {
  console.log(`Hello my name is ${this.name} and Iam ${this.age} years old`);
};

// Create a new object using the constructor function:
//@ts-ignore
let jhon = new Person("Jhon", 30);

// The new object has access to the methods defined on the prototype
jhon.sayHi(); // Hello, my name is Jhon and Iam 30 y.o

// The prototype of the new object is the prototype of the constructor function

console.log(jhon.__proto__ === Person.prototype); // true
console.log(Object.getPrototypeOf(jhon) === Person.prototype); // true

// Also its possible to set the prototype of an object using method:

let newProto = {
  sayGoodbye: function () {
    //@ts-ignore
    console.log(`Goodbye, my name is ${this.name}`);
  },
};

Object.setPrototypeOf(jhon, newProto);

// Now Jhon has access to the method defined on the old prototype
jhon.sayGoodbye(); // Goodbye my name is Jhon

// But no longer has access to the methods defined on the old prototype
console.log(jhon.sayHi); // undefined

// * Prototype chain
// when a property or method is accessed on an object, JS first look for it on the object
// itself thhen the prototype and so on until it either finds the property or reaches
// the end of the chain i.e null.

//* Constructor functions:
//Javascript provides constructor functions to create objects, When a function
// is used as a constructor withthe new keyword, the new objects prototype
// [[Prototype]] is set to the constructors prototype property

// Define a constructor function
function Animal(name: string) {
  //@ts-ignore
  this.name = name;
}

Animal.prototype.sayName = function () {
  console.log(`My Name is ${this.name}`);
};

// Define new constructor
function Dog(name: string, breed: string) {
  //@ts-ignore
  Animal.call(this, name);
  //@ts-ignore
  this.breed = breed;
}

// Set the prototype of Dog to be a new instance of Animal
Dog.prototype = Object.create(Animal.prototype);

// Add a method to the Dog prototype
Dog.prototype.bark = function () {
  console.log("Wooof");
};

// create object
//@ts-ignore
let fido = new Dog("Fido", "Labrador");

// the new object has access to the methods defined on its own prototype and animal

fido.bark(); // Woof"
fido.sayName(); // My name is Fido

console.log(fido.fly); // undefined

//* 4. Object.create()
// This method creates a new object with the specified prototype object and properties.
// This is straightforward way to setup prototypical inheritance. If you create a object
// via Object.create(null) it will not inherit any properties from Object.prototype.
// This means the object will not have any build-in properties or methods like
// toString(), hasownProperty()

let proto = {
  greet: function () {
    //@ts-ignore
    console.log(`Hello, my name is ${this.name}`);
  },
};

let person = Object.create(proto);
person.name = "Jhon";

person.greet(); // Hello my name is Jhon

console.log(person.hasownProperty("name")); // true;

// Create an object that does not inherit from Object.prototype
let animal = Object.create(null);
animal.name = "Rocky";

// The new object does not have any built-in properties or methods
console.log(animal.toString); // undefined
console.log(animal.hasOwnProperty); // undefined

// But you can still add and access custom properties
animal.describe = function () {
  console.log(`Name of the animal is ${this.name}`);
};

animal.describe(); // "Name of the animal is Rocky"
