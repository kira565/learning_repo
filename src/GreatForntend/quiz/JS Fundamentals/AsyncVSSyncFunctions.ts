// * Explain difference between sync and async functons

//In JS the concepts of sync and async functions are fundamental to understanding how code
// execution is managed, particulary in the context of handling operations like I/O tasks,
// API calls, and other time-consuming processes

// * Synchronous functions

// Sync functions execute in a sequental order, one after the other. Each operation must
// wait for the previous one to complete before moving on to the next

// 1. Sync code is blocking - meaning the program execution halts until the current operation
// finishes (выполнение программы останавливается пока не завершится текущая операция)

// 2. It follows a strict sequance, executing instructions line by line

// 3. Sync functions are easier to understand and debug since the flow is predictable

//* Examples:
// Reading file sync (block program until file is read)
//@ts-ignore
const fs = require("fs");
const data = fs.readFileSync("large-file.txt", "utf8");
console.log(data); // Execution is blocked until the file is read.
console.log("End of the program");

// Looping over the Large datasets:
const largeArray = new Array(1_000_000).fill(0);
// Blocks the main thread until the million operations are completed.
const result = largeArray.map((num) => num * 2);
console.log(result);

//* Async fucntions
// Async fucntions do not block the execution of the programm. They allow other operations to
// continue while waiting for a response or completion of a time consuming task.

// 1. Async code is non-blocking, allowing the program to keep running without waiting
// for a specific operation to finish

// 2. It enables concurrent execution, improving performance and responsiveness

// 3. Async functions are commonly used for tasks like network requests, file I/O and timers

// *Async func Examples

// 1. Network requests
console.log("Start of the program"); // This will be printed first as program starts here

fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    /** Process the data without blocking the main thread
     *  and printed at the end if fetch call succeeds
     */
  })
  .catch((error) => console.error(error));

console.log("End of program"); // This will be printed next before the fetch callback

// * User input and events:
// Handling user input events, such as clicks, key presses or mosue movements,is
// inherently(по своей сути) asynchronous. The application needs to these events without
// blocking the main thread, ensuring a smooth user experience

const button = document.getElementById("myButton")!;
button.addEventListener("click", () => {
  // Handle the click event asynchronously
  console.log("Button clicked");
});

// * Timers and Animations:
// Timers setTimeout and setInterval and animations eg requestAnimationFrame are async
// operations that allow the application to schedule tasks or update animations without
// blocking the main thread

setTimeout(() => {
  console.log("This message is delayed by 2 seconds");
}, 2000);

const animationId = requestAnimationFrame(() => {});

// By using async functions and operations, JS can handle time-consuming tasks without freezing
// the user interface or blocking main thread.

//! Important to notice, that async fucntions do not run on a different thread.
//! They still run on the main thread. However, it is possible to achieve parallelism in
//! Javascript by using WEB WORKERS

//* Achieving parallelism in JavaScript via web workers
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers

// Web workers allow you to spawn separate background threads that can perform CPU-intensive
// tasks in parallel with the main thread. These worker threads can communicate with the
// main thread via message passing, but they do not have direct access to the DOM or other
// browser APIs

// main.js
const worker = new Worker("worker.js");

worker.onmessage = function (event) {
  console.log("Res from worker", event.data);
};

worker.postMessage("Start computation");

//worker.js
self.onmessage = function (event) {
  const result = performHeavyComputation();
  self.postMessage(result);
};

function performHeavyComputation() {
  // CPU-intensive computation
  return "Computation result";
}

// In this example the main thread creates a new web worker and sends it a message to
// start a computation. The worker performs the heavy computation in parallel with the
// main thread and sendds the result block via postMessage()

//* Event Loop

// The async nature of JAvaScript is powered by a JavaScript engine`s event loop allowing
// concurrent operations even though JavaScript is single threaded.  Its an important concept.
