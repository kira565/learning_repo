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

//* Service Workers
// 1. Act as network proxy between web app, browser and network
// 2. Can intercept and handle network request, cache recources
// 3. Enable offline functionality and push notification
// 4. Have a lifecycle managed by the browser (install, activate, update)
// 5. No access to DOM and main thread resources for security

//* Service workers can be used for:
// 1. Caching
// 2. Offline support
// 3. Request handling
// 4. Background sync

//* Creating a service worker
// main.js

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(function (registration) {
      console.log("Service Worker registered:", registration);
    })
    .catch(function (err) {
      console.log("Service Worker registration failed:", err);
    });
}

//service-worker.js (service worker script)
self.addEventListener("fetch", function (event: any) {
  // FetchEvent type
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // return cached response if available
      if (response) {
        return response;
      }

      // Otherwise, fetch from network
      return fetch(event.request);
    })
  );
});

// In this example:
// 1. The main script registers a service worker at /service-worker.js
// 2. The service worker listens for the fetch() event, which is fired whenever the browser makes a network
// request
// 3. The service worker first checks if the requested resource is cached using caches.match(event.request)
// 4. If it is, it returns the cached response. Otherwise, it fetches the resource from the network using
// fetch(event.request)

//* Shared Workers
// Can be accessed from multiple scripts in different windows/tabs/iframes.
// ALlow data sharing between browser contexts via messaging interface
// Similar to dedicated web workers but with a broader scope

//* Use cases for shared workers
// State sharing across multiple windows

//todo BONUS
//* Worklets

// The Worklet interface is a lightweight version of Web Workers and gives developers access to low-level
// parts of the rendering pipeline. With Worklets, you can run JS and WebAssembly code to do graphics
// rendering or audio processing where high performance is required

//! Considerations and limitations

// 1. Same origin policy
// Workers must comply with the same origin policy, meaning the script that creates the worker and
// the worker script itself must be from the same origin

// 2. No DOM Access
// Workers do not have direct access to the DOM. They can communicate with the main thread through messages

// 3. Performance
// Creating and managing workers incurs(берет на себя) overhead. They should be used judiciously(разумно)
// for tasks that truly benefit from parallel execution

// 4. Error handling
// Proper error handling mechanism should be in place to handle any issues within the worker scripts.
