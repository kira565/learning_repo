//@ts-nocheck
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

//todo  __proto__ vs prototype

//* __proto__ -
// Is a property of Object.prototype
// It is exposes the hidden [[Prototype]] property of an object and allows
// to access or modify prototype(parent) of the object. //! It is deprecated

const obj1 = {
  sayHi(this: any) {
    console.log(`Hello im ${this.name}`);
  },
};
const obj2 = {
  name: "Jhon",
};

//! Old Deprecated way
console.log(obj2.__proto__); // Object.prototype
obj2.__proto__ = obj;
console.log(obj2.__proto__); // {sayHi: f}

//* New Way good approach
console.log(Object.getPrototypeOf(obj2)); // Object.prototype
Object.setPrototypeOf(obj2, obj1);
console.log(Object.getPrototypeOf(obj2)); // obj

obj2.sayHi(); // hello im Jhon

// todo Object.defineProperty - Property configurator
//this is the method that allows t odefine new poperties or modify existing ones.
// Method takes three parameters : object we want to define the property on,
// property name, and descriptor

const object = {};
Object.defineProperty(obj, "name", {
  value: "Kirill",
  writable: true,
  enumerable: true,
  configurable: true,
});
//! BY DEFAULT PROPERTIES CREATED WITH THIS FUNCTION ARE NOT WRITEABLE,
//! NOT ENUMERABLE AND NOT CONFIGURABLE

//? configurable
// when set to false:
// 1 type of property cannot be changed
// 2 property may not be deleted
// 3 other attributes of its descriptor cannot be changed
//? enumberable
// property is enumerable during enumerations only while true
//? writeable
// property may be changed with an assigment operator.

//* .prototype
// Is a psecial property that allmost all functions have (except arrow).
// Thats is only used when a function is invoked as a constructor function.

// The .prototype contains a refference to an object and when a constructor
// is used to creaate a new object, .prototype is set as the prototype
// of new the object

function ObjectFactory() {
  this.property = "Hi iam property!";
}

let obj3 = new ObjectFactory();

console.log(ObjectFactory.prototype === Object.getPrototypeOf(obj3)); //true
// or
console.log(ObjectFactory.prototype.isPrototypeOf(obj3)); // true

//! so basically object __proto__ has reference to the same object as .prototype
//! of constructor function that was used to create this object

// todo Object.freeze()
// static method freezes an object. Freezing prevent extensions and makes existing props
// non-writeable and non configurable. A frozen object can no longer be changed:
// new properties cannot be added, existing properties cannot be removed,
// their enumerability, configurability, writability, prototype cannot ve changeed or
// reassigned. This is the highest integrity level that possible in JS.
const obj = {
  prop: 42,
};

Object.freeze(obj);

obj.prop = 33;
// Throws an error in strict mode

console.log(obj.prop);
// Expected output: 42
