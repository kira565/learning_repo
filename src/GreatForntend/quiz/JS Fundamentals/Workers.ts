// * Workers in JavaScript

// Workers in JavaScript are a way to run scripts in background threads. Separate from
// the main execution thread of a web page. This allows for long-running or computationally
// intensive tasks (позволяет выполнять длительные или ресурсоемкие задачи) to be offloaded
// from the main thread, preventing the user interface from becoming unresponsive or janky

//* Web workers / Dedicated workers

// 1. Run script in background threads separate from the main UI thread.
// 2. Designed for CPU-intensive tasks like data processing, math computations, etc.
// Generally the non-async work.
// 3. Cannot directly access the DOM or other main thread resources for security.
// 4. Communicates with main thread via async message passing postMessage() onmessage/message
// 5. Terminated when main script is unloaded or explicity terminated
//todo Can be used for:
// Image/video processing
// Data compression
// Complex math

//todo Creating Web Worker

// To create a web worker you need a separate JS file that contains the code for the worker
// Heres an example

//main.js (main script)

// Check if the browser supports workers
if (window.Worker) {
  // Create a new Worker
  const myWorker = new Worker("worker.js");

  // Post a message to the worker
  myWorker.postMessage("Hello, Worker!");

  // Listen for messages from the worker
  myWorker.onmessage = function (event) {
    console.log("Message from Worker:", event.data);
  };

  // Error handling
  myWorker.onerror = function (error) {
    console.error("Error from Worker:", error);
  };
}

//worker.js (worker script)

// Listen for messages from the main script
onmessage = function (event) {
  console.log("Message from Main Script:", event.data);

  // Perform a task (e.g., some computation)
  const result = event.data + " - Processed by Worker";

  // Post the result back to the main script
  postMessage(result);
};

// In this example
// 1. main.js creates worker using the Woeker constructor and specifies worker.js
// as the script to run in the worker thread

// 2. It posts a message to the worker using postMessage()

// 3. the worker script worker.js listens for messages from the main script using onmessage

// 4. After processing the message the worker posts a message back to the main script using
// postMessage()

// 5. The main scripts listens for messages from worker using onmessage
