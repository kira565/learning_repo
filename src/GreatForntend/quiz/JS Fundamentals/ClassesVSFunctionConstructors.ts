// * What are the fifferences between ES2015 classes and ES5
//* Function Constructors

// ES5 function constructors and ES2015 classes are two different
// ways of defining classes in JavaScript. They both serve the same purpose, but they have different syntax and behaviour

//* ES5 Function constructors
// In ES5, you define a class-like structure using function constructor and prototypes. Heres an example:

// ES5 function constructor:
function Person(name: string, age: number) {
  //@ts-ignore (in TypeScript we cannot do proper typization) ts cannot guarantee whether(ли) the functions calls with or without new, so in Typescript the proper way to use classes
  this.name = name;
  //@ts-ignore
  this.age = age;
}

// defining class methods
Person.prototype.greet = function () {
  console.log(
    " Hello my name is " + this.name + "and Iam " + this.age + " y.o"
  );
};

//Creating an instance:
//@ts-ignore
const person = new Person("Jhon", 30);

person.greet(); // Hello my name is Jhon and Iam 30 years old;

//* ES 2015 classes
// ES 2015 introduces the class syntax, which simplifies the definition of classes and supports more
// features such as static methods and subclassing. Here is the example using ES2015:

interface IClassPerson {
  name: string;
  age: number;
}
class PersonClass implements IClassPerson {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }
}

const person2 = new PersonClass("Jhonn", 30);
person2.greet(); // Hello, my name is John and I am 30 years old.

//* Key Differences:
//1. Syntax and readability:
// ES5 Uses function constructor and prototypes, which can be less intuitive and harder to read
// ES2015 Uses the class keyword, making the code more conciese(краткий) and easier to understand

// * 2. Static methods:
// ES5: Static methods are added directly to the constructor function
// ES2015: Static methods are defined within the class using static keyword

// ES5
function Person2(name: string, age: number) {
  //@ts-ignore
  this.name = name;
  //@ts-ignore
  this.age = age;
}

Person2.sayHi = function () {
  console.log("Hi!");
};

Person2.sayHi(); // Hi!

// ES2015
class Person3 {
  static sayHi() {
    console.log("Hi!");
  }
}
Person3.sayHi(); // Hi!

//* 3 Inheritance
// ES5: Inheritance is achieved using Object.create() and manually setting the prototype chain
// ES2015 Inheritance is much simpler and more intuitive with extends keywords

//? ES5 Inheritance:
function Person5(name: string, age: number) {
  //@ts-ignore
  this.name = name;
  //@ts-ignore
  this.age = age;
}
Person5.prototype.greet = function () {
  console.log(
    "Hello, my name is " + this.name + " and I am " + this.age + " years old."
  );
};

function Student(name: string, age: number, grade: string) {
  // constructor function
  //@ts-ignore
  Person.call(this, name, age); // super analog //! manually call the parent constructor function
  //@ts-ignore
  this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student; // define specific constructor function

Student.prototype.study = function () {
  console.log(this.name + " is studying");
};

//@ts-ignore
const student = new Student("Alice", 20, "A");
student.greet(); // Hello my name is Alice and Iam 20 years old
student.study(); // Alice is studyng

//? ES2015 Inheritance

class Person6 {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(this.name + "is my name", this.age + "my age");
  }
}

class Student2 extends Person6 {
  grade: string;
  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }

  study() {
    console.log(this.name + "is Studying");
  }
}

const student2 = new Student2("ALICE", 25, "B");
student2.greet(); // hello my name is alice and im 25 yo
student2.study(); // Alice is studying

// * 4 super implementation
//ES5 Manually call the parent constructor function
//ES2015 Use the super keyword to call the parent class constructor and methods

//todo CONCLUSION
// While both ES5 and ES2015 approaches can achieve the same functionality, ES2015 classes provide a clearer and more concise way
// to define and wotk with object oriented constructs in JavaScript, which makes the code easier to writ, read and maintain. If
// we work with JS its generally recommended to use ES2015 classes over ES5 functon constructors
//! also only ES2015 classes works fine with TypeScript
