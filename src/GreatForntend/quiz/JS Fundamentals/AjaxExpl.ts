// * AJAX - Asynchronous JavaScript and XML

// AJAx is a set of web development techinques uding many
// web technologies on the client side to create async web apps. Unlike traditional
// web apps where every user intercation triggers a full page reload, With AJAX , web
// applications can send data to and retrieve from server asynchronously.

// In practice, modern implementations commonly use JSON instead of XML,
// due to the advantages of JSON being native to JavaScript.

//XMLHttpRequest API
//Here's a basic example of how it can be used:

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.error("Request failed: " + xhr.status);
    }
  }
};
xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1", true);
xhr.send();

// fetch() API
//Alternatively, the fetch() API provides a modern, promise-based approach to
// making AJAX requests. It is more commonly used in modern web applications.

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Fetch error:", error));
