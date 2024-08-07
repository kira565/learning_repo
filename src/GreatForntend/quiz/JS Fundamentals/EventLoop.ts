// * Event loop n JS

// The event loop is the heart of JS async operations. It is
// a mechanism in browsers that handles the execution of code,
// allowing for async operations and ensuring that the single thread nature of JS engines
// does not block the execution of the programm.

// * Parts of the event loop
// To understand it better we need to understand about all parts of the system.
// These components are part of the event loop:

//! Call stack

// Callstack keeps track of the functions being executed in a program (остлеживает вызовы
// выполняемые в программе). When a function is called ,it is added to the top of the call stack
// When the function completes, it is removed from the call stack. This allows the program
// to keep track on where it is in the execution of a function and return the correct location
// when the function completes. As the name suggests it is a Stack data structure which
// follows last-in-first-out (классический стек все ок)

//! Web APIs/Node.js APIs

// Async operations like setTimeout, HTTP requests, file I/O, etc, are handled by
// todo Web API in the browser
// todo C++ API in the Node.js
// These APIs are not part of Javascript engine and run on separate threads, allowing them to
// execute concurrently without blocking the call stack

//! Task queue / Mactotask queue / Callback queue

// The task queue, also known as the macrotask queue / callback queue / event queue, is a queue
// that holds tasks that need to be executed. These tasks are typically asynchronous operations,
// such as callbacks passed to web API( eg setTimeout or setInterval), //! это колбеки которые переданы в веб апи
// and also user interface event handlers lkke clicks ,scrolls, etc

//! Microtask queue (then,catch,finally,await,queueMicrotask(), MutationObserver())

// Microtasks are tasks that have a higher prority than macrotasks and are executed
// immediately, after the currently executing script is completed and before the next
// macrotask is executed. Microtasks are usually used for more immediate(немедленный)
// lightweight operations that should be executed as soon as possible after the current
// operation completes . There is a dedicated microtask queue for microtasks.
//todo Microtasks include promises callbacks then catch and finally, await statements,
// todo queueMicriotask() and MutationObserver callback

//* EVENT LOOP ORDER:
//! Priority: sync code > microtasks > macrotasks

// 1. THE JS Engine starts executing scripts, placing synchronous operations on the call stack.

// 2. When an asynchronous operation is encountered(когда сталкивается с асинх операцией) (eg setTimeout()), it is offloaded to the
// respective Web API or Node API to handle the operation in the background

// 3. Once the async operation completes, its callback function is placed in the respective queues -
// also known as macrotask queue / callback queue OR microtask queue.

// 4. The event loop continuosly monitors the call stack and executes items on the call stack.

// If / when callstack is empty:
// 1. Microtask queue is processed. The event loop takes the first callback from microtask
// queue and pushes it to the call stack for execution. This repeats until microtask queue is empty.

// 2. Macrotask queue is processed. The event loop deaueues the first callback from macrotask queue and
// pushes it onto callstack for execution. However, after macrotask queue is processed, the event loop
// doesnt proceed with the next amcrotask yet! The event loop first checks the microtask queue. Checking the microtask queue
// is necessary as microtasks have higher priority than amcrotasks queue callbacks. The amcrotask queue callback that was
// just executed could have added more microtasks! (Только что выполненный колбек макротаск мог добавить больше микрозадач)
// 1. If the microtask queue is non-empty, process them as per the previous step
// 2. If the microtask queue is empty, the next macrotask queue callback is processed. This repeats until the macrotask
// queue is empty

// 5. This Process continues indenfinetly (процесс продолжается бесконечно), allowing JavascriptEngine to handle both sync and async
// operations efficently without blocking the call stack
console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
});

setTimeout(() => {
  console.log("Timeout 2");
}, 0);

console.log("End");

// Console output:
// Start
// End
// Promise 1
// Timeout 1
// Timeout 2

// Start End - first - cuz they are part of initial script (sync)
// Promise 1 - is logged next because promises and microtasks are executed immidiately after the item on the call stack
// Timeout1 and Timeout2 are logged last because they are amcrotasks and are processed after microtasks
