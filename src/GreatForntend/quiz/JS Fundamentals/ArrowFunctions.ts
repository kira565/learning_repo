// * Quiz Questions
// ?. Can you offer a use case for the new arrow => function syntax?

// the => syntax also known as arrow func, is a feature introduced
// in ES6 for JS. It provides a more concise way to write
// functions and also ha some differences in how this behaves
// compared to traditional function expressions.

// * Advantages of arrow functions
// 1. Conciseness (Краткость) - code is shorter and easier to read
// 2. //! this behavior -
// Arrow functions do not have their own this. Instead, they inherit
// this from the parent scope at the time they are defined. This is
// particulary useful in scenarios where you are dealing with callbacks
// and want to retain(сохранить) the context of this
// 3. Implicit return

// * When to use arrow functions

// 1. When you need a quick one-line function
// 2. In callback functions where you want to preserve the lexical scope of this
// 3. When workind with higher-order functions like map,filter,reduce

// * When not to use arrow functions

// 1.  Methods in objects: Arrow functions do not have their own this context,
// which can lead to unexpected behavior in object methods

// 2.  As constructors: Arrow functions cannot be used as constructor and will throw
// an error if used with the new keyword

// 3. When you need to use function hoisting. Arrow functions are not hoisted
// unlike traditional function declarations (подъем функции означает возможность использовать
// функцию до ее декларации):
console.log(greeting()); // "Hello there!"

function greeting() {
  return "Hello there!";
}

//! Стрелочные функции предоставляют доступ к среде где они были ОПРЕДЕЛЕНЫ, обычные - к среде где они
//! были ВЫЗВАНЫ

const globalObject: any = this;

globalObject.whoIsThis = "TOP"; // Identify this scope

// 1) Defining
const fancyObj: any = {
  whoIsThis: "FANCY", // Identify this object
  regularF: function () {
    console.log("regularF", this.whoIsThis);
  },
  arrowF: () => {
    console.log("arrowF", (this! as any).whoIsThis);
  },
};

// 2) Calling
console.log("TOP-LEVEL", globalObject.whoIsThis); // It's "TOP" here

//! IMPORTANT с одной стороны может показаться что стрелочная функция создана в скоупе объекта
//! НО ЛИТЕРАЛ ОБЪЕКТА НЕ ЯВЛЯЕТСЯ СКОУПОМ, поэтому функция и берет PARENT SCOPE чем является в данном случае
//! GLOBAL SCOPE
//! But clases are functional scope so arrow function in class use this as brand new object

fancyObj.regularF(); //! Output #1 (Fancy) REGULAR FUNCTION will always use this to represent who called it
//! In this case it is fancyObject
fancyObj.arrowF(); //! Output #2 (Top) ARROW FUNCTION TOOK this FROM global object, because
//!  it was available at the time it was defined

fancyObj.regularF.call({ whoIsThis: "FAKE" }); // Output #3 (Fake)
fancyObj.arrowF.call({ whoIsThis: "FAKE" }); // Output #4 (Top)
