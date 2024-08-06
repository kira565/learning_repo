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

//! Microtask queue

// Microtasks are tasks that have a higher prority than macrotasks and are executed
// immediately, after the currently executing script is completed and before the next
// macrotask is executed. Microtasks are usually used for more immediate(немедленный)
// lightweight operations that should be executed as soon as possible after the current
// operation completes . There is a dedicated microtask queue for microtasks.
//todo Microtasks include promises callbacks then catch and finally, await statements,
// todo queueMicriotask() and MutationObserver callback

//* EVENT LOOP ORDER:

// 1. THE JS Engine starts executing scripts, placing synchronous operations on the call stack.

// 2. When an asynchronous operation is encountered (eg setTimeout()), it is offloaded to the
// respective Web API aor Node APU to handle the operation in the background

// 3. Once the async operation completes, its callback function is placed in the respective queues -
// also known as macrotask queue / callback queue OR microtask queue.

// 4. The event loop continuosly monitors the call stack and executes items on the call stack
// If / when callstack is empty:
// 1. Microtask queue is processed. The event loop takes the first callback from microtask
// queue and pushes it to the call stack for execution.
