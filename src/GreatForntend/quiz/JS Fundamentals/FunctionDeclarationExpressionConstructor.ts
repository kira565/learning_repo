// ? What is difference between
// ? `function Person(){}`, `const person = Person()`, and `const person = new Person()`?

//* Function Declaration

// function Person() {} is a standart function declaration for JavaScript. When written
// in PascalCase, it follows the convention for function intended to be used as constructors
function Person(name: string) {
  //@ts-ignore
  this.name = name;
}

// This code defines a function named Person that takes a parameter name and assign this parameter
// to the name prop of the object created from this constructor function. When the this keyword
// is used in a constriuctor, it refers to the newly created object

//* Function call

// const person = Person() simply invoke the functions code. When you invoke Person as regular
// function (i.e without new keyword), the function does not behave as a constructor..
// Instead it executes its code and returns undefined if no return value is specified and
// that gets assigned to the variable intended as instance. Invoking as such is a common mistake
// if the function is intended to be used as a constructor.
//@ts-ignore
function Person1(name: string) {
  //@ts-ignore
  this.name = name;
}

const person1 = Person1("John");
console.log(person1); // undefined
//@ts-ignore
console.log(person1.name); // Uncaught TypeError: Cannot read property 'name' of undefined

// In this case Person("Jhon") does not create a new object. The person variable is assigned
// undefined because the Person function does not explicity return a value. Attempting to
// access person.name throws an error because person is undefined

//* Constructor call
// const person = new Person() - creates an instance of the Person object using the new operator
// which inherits from Person.prototype. An alternative would be to use Object.create such as:
// Object.create(Person.prototype) and Person.call(person, "Jhon") initializes the object.

function Person2(name: string) {
  //@ts-ignore
  this.name = name;
}
//@ts-ignore
const person2 = new Person2("Jhon");
console.log(person2); // Person { name: 'John' }
console.log(person2.name); // 'John'

// Alternative
const person3 = Object.create(Person2.prototype);
Person.call(person3, "John");
console.log(person3); // Person { name: 'John' }
console.log(person3.name); // 'John'

// In this case new Person("Jhon") creates a new object and this within Person refers to this new
// object. The name property is correctly set on the new object. The person variable is assignied
//  the new instance of Person with the name property set to Jhon. And for the alternative object
// creation, Object.create(Person.prototype) creates a new object with person.prototype as
// its prototype Person.call(person, "Jhon") initialize the objext, setting the name proerty
