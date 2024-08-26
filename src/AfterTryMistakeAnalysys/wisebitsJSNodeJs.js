
// todo MISTAKE # 1
// Related to closures and this:
// * Question: consolelog output
class A { //typeof A === function
  constructor() {
    this.f = () => this; // this = A
  }
}

class B {
  constructor(a) {
    console.log(a.f());
    this.a = a;
  }
  showA() {
    console.log(this.a.f());
  }
}

new B(new A());

//! Wrong answer: undefined because arrow function takes this from parent context, so in this case its global object i said.
//! BUT ITS TRUE ONLY FOR OBJECT(EG LITERAL), CLASSES ARE FUNCTIONS, SO THIS HERE IS A CLASS INSTANCE OBJECT.

//* Right Answer: this arrow function parent context is class function (A). In constructor function when its called with word new, this - brand new Object, so its instance of A. Because of closure it is saved to this
//* so result Output: A { f: Function } 

const object = {
  fReady: () => {
    return this;
  },
};

// JS Object case
console.log(object.fReady()) //! this === globalObject/window/undefined 
// JS Class case
console.log(typeof A) //! function. TYPEOF CLASS FUNCTION THIS MEANS, ARROW FUNCTION HAS INNER CONTEXT OF THIS FUNCTION
console.log(A.f()) //! A { f: Function }
//! SO NEED TO CONSIDER JAVASCRIPT CLASSES AS FUNCTIONS

//todo MISTAKE # 2

//? Question: console.log output

const button = document.getElementById("button");

button.addEventListener("click", () => console.log("hello"));

button.onclick = () => {
  console.log("Hi");
};

button.removeEventListener("click", () => console.log("hello"));

//! Wrong answer: Hi > hello > hello

//* Right answer: hello > Hi

//? Description:
// Regarding events: There are two processes Event Bubbling and Event Capturing
// EventCapturing(Disabled by default but appear when we use addEventListener)
// event first triggered at the root of document and flows down to target element 
// has a higher priority than bubbling, it means that capturing event handlers
// are executed BEFORE bubbling event. SO CALLBACK OF EventListener is executed earlier

// what about removeEventListener - here we pass event and exact the same callback to
// identify the right event. SO this callback is not for execution but for identification
// it means there is no output for removeEventListener.

//todo MISTAKE #3 
//? Is there a same result of promise handling

const promise = new Promise((res, rej) => rej(new Error("error")));

const onFulfilled = () => {
    console.log("FULFILL")
}

const onRejected = () => {
    console.log("REJECT")
}

promise.then(onFulfilled, onRejected)
promise.then(onFulfilled).catch(onRejected)

//! Mistake: I said, that its different, because i forget that promise then accepts two arguments

//* Right Answer: RESULT IS THE SAME, 

//? Description:
// because then method has following signature:
// then(onFulfilledCb?: Function, onRejectedCb?: Function)
// catch method accept only callback for rejected promise


//todo MISTAKE #4
//? Question: console output

let a;
let b = 15 + a ?? undefined;
console.log(b)

//! Mistake: i said referenceError >> wtf =c

//* Right answer: undefined

//? Description:
// RefferenceError occurs when we try to access let or const before its initialization.
// var and let can be initialized without value, so a = undefined here
// 15 + undefined === NaN
// While type coercion of NaN to boolean === false
// Then, result will be undefined after ?? operator
// ??(operator) - nullish coalescing(нулевой оператор объединения) return right-side expression when left-side eq null or undefined

//todo MISTAKE #5
//? Question; final button color

// #button {
//   background: green;
// }
// button {
//   background: red;
// }
// .button {
//   background: blue;
// }

//! Mistake: blue (i said, because css can be re-writed from top to bottom)
//* Right Answer: #button (id) has a biggest priority so it will be green

//? Description (lets assume element <p class="par" id="par"></p>)
// Here we need to calculate selector priority: 
// The priority is next: 
// p {} = 1, 
// .par {} = 10
// p.par {} = 10 + 1,
// p.par.par2 {} =  1 + 10 + 10
// #demo {} = 100
// p#demo {} = 1 + 100
// #navbar p#par = 100 + 1 + 100
// <p style="color: pink"> = 1000

//todo Another theoretical weaknesses: websocket poor explaination, about thread memory management(how to pass data to another thread without copy to memory)