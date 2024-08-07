// * Hoisting (Подъем)
// Hoisting is a term used to explain the behavior of variable declarations in your code
// Подъем объясняет поведение при декларации переменных в коде

// Variables declared or initialized with the var keyword will have their declaration "moved" up
// to the top of their containing scope during compilation, which we refer as hosting.

// Only declaration is hoisted, the initizlization/assigment (if they persist) will stay where it is.
// Note, that the declaration is not actually moved - the JS engine parses the declarations during
// compilation and becomes aware(узнает) of variables and their scopes. Но это легче понять визуализируя
// объявления переменных как поднятие до вершины их области видимости.

// lets explain the few code samples.

// * Hoisting of variables declared using var

// Hoisting is seen in action here as even though "foo" is declared and initialized after the first
// console.log(), the first console .log prints it as undefined
//@ts-ignore
console.log(foo); //undefined
var foo = 1;
console.log(foo); //1

// We can visualize the code above as following:
var foo1;
console.log(foo1); //undefined
foo = 1;
console.log(foo); //1

// * Hoisting of variables declared using let const and class
// variables declared via let const and class are hoisted as well. However unlike var and function
// they are not initialized and accessing them before the declaration will result in a ReferenceError
// exception. The variable is in a "temporal dead zone" from the start of the block until the declaration
// is passed

//@ts-ignore
y; // ReferenceError cannot access y before initialization
let y = "local";
//@ts-ignore
z; // ReferenceError: Cannot access 'z' before initialization
const z = "local";
//@ts-ignore
Foo; // ReferenceError: Cannot access 'Foo' before initialization
class Foo {
  constructor() {}
}

//* Hoisting of function expressions
// function expressions are functions written in the form of variable declarations. Since they
// they have same behaviour as ordinary variables
//@ts-ignore
console.log(bar3); // undefined
//@ts-ignore
bar3(); // Uncaught TypeError: bar is not a function

var bar3 = function () {
  console.log("BARRRR");
};

//* Hoisting of function declarations
// Function declarations use the function keyword. Unlike function expressions, functions declarations
// have both the declaration and definition hoisted, thus they can be called even before they are declared
console.log(foo2); // [Function: foo]
foo2(); // 'FOOOOO'

function foo2() {
  console.log("FOOOOO");
}

//todo NOTE: the same applies to generator function*, async functions and async function generators

//* Hoisting of import statements
// Import declarations are hoisted. The identifiers the imports introduce are available in the entire
// module scope, and their side effects are produced before the rest of the modules code runs

// foo.doSomething(); // Works normally.

// import foo from "./modules/foo";

// * Under the hood
// In reality, JavaScript creates all variables in the current scope before it even tries to executes
// the code. Variables created using var keyword will have the value of undefined, when variabls created
// using let and const keywords will be marked as <value unavailable>. Thus(таким образом), accessng
// them will cause a RefferenceError, preventing you to acces them before initialization

// In ECMAScript specifications let and const declarations explained as below:
// The variables are created when their containing Environment Record is instantiated ()переменные создаются
// при создании экземпляра содержащей их среды) But may not be acessed in any way until the variables
// LexicalBinding is evaluated(лексический биндинг оценен`)

// for var:
// Var variables are created when their containing Environment Record is instantiated nd are initialized
// to undefined when created

//* Modern practices
// In practice modern code bases avoid using var and use let and const exclusively. It is recommended to
// declare and initialize your variables and impot statements at the top of the containing scope/module
// to eliminate the mental overhead of tracking when a variable can be used

// ESLint helps to prevent violations with the following rules
// no-use-before-define
// no-undef
