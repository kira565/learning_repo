//* What are the pros and cons of using Promises insted of callbacks

//* Pros:

// 1. Avoid callback hell which can be unreadable

// callback hell, also known as pyramid of doom, i that occurs when you have miltiple
// nested callbacks in code. This can lead to code that is difficult to read, maintain and debug.

function getFirstData(callback: Function) {
  setTimeout(() => {
    callback({});
  });
}
function getSecondData(data: any, callback: Function) {
  setTimeout(() => {
    callback({ id: data.id, title: data.title + " Second Data" });
  }, 2000);
}

function getThirdData(data: any, callback: Function) {
  setTimeout(() => {
    callback({ id: data.id, title: data.title + " Third Data" });
  }, 2000);
}

// Callback hell
getFirstData((data: any) => {
  getSecondData(data, (data: any) => {
    getThirdData(data, (result: any) => {
      console.log(result); // Output: {id: 1, title: "First Data Second Data Third Data"}
    });
  });
});

//Promises address the problem of callback hell by providing a more linear
// and readable structure for your code.
// Example of sequential asynchronous code using setTimeout and Promises
function getFirstData2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: 1, title: "First Data" });
    }, 2000);
  });
}

function getSecondData2(data: any) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: data.id, title: data.title + " Second Data" });
    }, 2000);
  });
}

function getThirdData2(data: any) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: data.id, title: data.title + " Third Data" });
    }, 2000);
  });
}

getFirstData2()
  .then(getSecondData2)
  .then(getThirdData2)
  .then((data) => {
    console.log(data); // Output: {id: 1, title: "First Data Second Data Third Data"}
  })
  .catch((error) => console.error("Error:", error));

// 2. Makes it easy to write sequential asynchronous code that is readable with .then().

// In the code example above we use then() method to chain these Promises together,
// allowing the code to execute sequentially. It provides a cleaner and more manageable
// way to handle async operations in Javascript

// 3. Make it easy to write parallel async code with Promise.all()
// Both Promise.all() and callbacks can be used to write parallel async code. However,
// Promise.all() provides a more cincise and readable way to handle multiple Promises.
// Especially when dealing with complex async workfow

// * With promises these scenarios which are present in callback only coding will not happen:

// Call the callback to early
// Call the callback too late or never
// Call the callback too few or too many times
// Fail to pass along any necessary environment
// Swallow any errors/ exceptions that may happen
