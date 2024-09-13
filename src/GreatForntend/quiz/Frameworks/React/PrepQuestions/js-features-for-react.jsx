// * Key JS features are used in react

// ? 1. General JS and ECMAScript
// js is popular scripting lang used tto build dynamic web pages. While HTML is used to create the structure of web page,
// and CSS to create the style and layout, JS is used to add behavior to the page. i.e to create functionality and
// interactivity. 
// The ECMAScript standart - the document which describes the way JS was intended to work.
// ECMAScript 2015 was the sixth release of the standart and is therefore also known as ES6. Following versions are
// marked in progression so we refer to ECMAScript 2016 - ES7, 2017 - ES8 and so on.

// Due to frequency wth new features are added to the standart some may not be supported in all browsers.
// So how we can ensure that our JS app would work as expected across all web browsers?
// There are 3 options:
//1. Wain until major browsers provide support for the new features. But its not an option usually
//2. Use a polyfill which is a piece of code (JS on the web) used to provide modern functionality on older browsers
//3. Use a JavaScript transpiller such as Babel or Traceur, that convert ECMAScript 2015+ code into Javascript
// version that is supported by all browsers

//* Statements vs Expressions

// ! 1 ✍️ A statement is a block of code that does something.
// ! 2 ✍️ An expression is a fragment of code that produces a value.

// * statements
//JavaScript statements can be blocks or lines of code that usually end with semicolons or are enclosed in curly brackets.
// (заключены в круглые скобки или заканчиваются точкой с запятой)
// example of statement:
document.getElementById("hello").innerHTML = "Hello World!";
//The statement above writes "Hello World!" in a DOM element with id="hello".

//* expression (produce a value)
// example:
msg = document.getElementById("hello").value;
//document.getElementById("hello").value is en expression as it returns a value.

//An additional example should help clarify the difference between expressions and statements:
const msg = "Hello World!";
function sayHello( msg ) {
	console.log( msg );
}
//the first line is a statement, where "Hello World!" is an expression,
//the function declaration is a statement, where the parameter msg passed to the function is an expression,
//the line that prints the message in the console is a statement, where again the parameter msg is an expression.
//? Why Expressions Are Important in React
//When building a React application, you can inject JavaScript expressions into your JSX code.
//For example, you can pass a variable:
const Message = () => {
	const name = "Carlo";
	return <p>Welcome {name}!</p>;
}

//!✍️ JSX only accepts JavaScript expressions in curly brackets. You are not allowed to write statements within your JSX code.
// This includes:
// Variables
// Strings with quotes
// Function calls
// Objects
// Conditional expressions

//* Immutability in React
// Mutability and Immutability are two key concepts in object-oriented and functional programming.
//Immutability means that a value cannot be changed after it has been created. Mutability means, of course, the opposite.

// In Javascript, primitive values are immutable, meaning that once a primitive value is created, it cannot be changed.
//Conversely, arrays and objects are mutable because their properties and elements can be changed without reassigning a new value.

//There are several reasons for using immutable objects in JavaScript:
// 1. Improved performance
// 2. Reduced memory consumption
// 3. Thread-safety
// 4. Easier coding and debugging

// Following the pattern of immutability, once a variable or object is assigned, it cannot be re-assigned or changed. 
// When you need to modify data, you should create a copy of it and modify its content, leaving the original content unchanged.

//? Immutability is also a key concept in React.
//The React documentation states:
// A component’s props and state are immutable snapshots.
// Never mutate them directly. Instead, pass new props down, and use the setter function from useState.
// We can think of the props and state values as snapshots that are updated after rendering

//? What JavaScript features can we use to guarantee the immutability of the state object in React? Let’s find out!

// * 1. Declaring variables
// in short words we had var, which declare globally and functional -scoped variable. when we declare var we can redeclare and update it
// both in the global and local scope:

// Declare a variable
var msg1 = "Hello!";
// Redeclare the same variable
var msg1 = "Goodbye!"
// Update the variable
msg1 = "Hello again!"

// var declarations also processed before any code executed because of hoisting.

//To fix these problems, ES6 introduced the let and const keywords. which declare variable to the scope of block statement
// so its much simlier to control our code with block-coped vatibles
//! ✍️ Thus, as a general rule, you should always use let and const instead of var.

// const restrict variable reassigning but it doesnt restrict refference types (object,arrays) mutations.
// because it doesnt gurantee strong immutability, we have the following:

//* Object.freeze()
// Declare a constant obj
const post = {
	id: 1,
	name: 'JavaScript is awesome',
	excerpt: 'JavaScript is an awesome scripting language'
};
// Freeze the object
Object.freeze(post);
// it restricts change and remove properties, also restricts re-assigning of the prototype.

//* Template literals
// If we need to combine string with the output of expression
//eg
`da da ${sayHello}`

//* Arrow functions
// Arrow functions are an alternative to anonymous functions in JS but with some differences and limitations
const MyFunctionalComponent = () => expression;

//! You will usually use Arrow Function in React applications unless there’s a specific reason not to use them.

//* Classes
// Classes are special type of functions for creating objects that use prototypical inheritance mechanism
//As with functions, you have two ways of defining a class:
const ExpressionCircle = class {}
class DeclarationCircle {}

//* The keyword this
// in JS this keyword is a generc placeholder usually used inside objects classes and functions ant id refers
// to different elements depending on the context or scope
//! arrow functions should only be used for non-method functions because they dont have their own this
//? Binding ‘this’ to Event Handlers in React class components
class MyComponent extends Component {
	state = { message: 'Hello World!' };

	showMessage(){
		console.log( 'This refers to: ', this );
		console.log( 'The message is: ', this.state.message );
	}

	render(){
		return( <button onClick={ this.showMessage.bind( this ) }>Show message from state!</button> );
	}
}
export default MyComponent;

//* Ternary operators
const drink = personAge >= 18 ? "Wine" : "Juice";

// * Short Circuit Evaluation
//The logical AND (&&) operator evaluates operands from left to right and returns true if and only if all operands are true.
{
	displayExcerpt &&
	post.excerpt.rendered && (
		<p>
			<RawHTML>
				{ post.excerpt.rendered }
			</RawHTML>
		</p>
	)
}

//* Spread Syntax
//In JavaScript, spread syntax allows you to expand an iterable element, such as an array or object, 
//into function arguments, array literals, or object literals.
function doSomething( x, y, z ){
	return `First: ${x} - Second: ${y} - Third: ${z} - Sum: ${x+y+z}`;
}
const numbers = [3, 4, 7];
console.log( doSomething( ...numbers ) );

//* Destructuring Assignment
const [state, setState] = useState(0)

//* farray methods like filter map and reduce
// ....

//* Exports and Imports
// As of ECMAScript 2015 (ES6), it is possible to export values from a JavaScript module and import them into another script
import React from 'react';
//?  import declarations are used to import read-only live bindings that are exported by other modules.
//? ✍️ The export declaration is used to export values from a JavaScript module.
//? ✍️ You can have multiple named exports per module, but only one default export.

// Named import:
import { MyFunction, MyVariable } from "./my-module";
// Default Import:
import MyComponent from "./MyComponent";
//Namespace import
import * as name from "my-module";
//Side effect import
import "module-name";

//Note that import declarations can only be used in modules at the top level (not inside functions, classes, etc.).