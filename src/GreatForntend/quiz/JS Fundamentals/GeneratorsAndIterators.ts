// * What are iterators and generators and what are they used for ?

//todo ITERATORS

// Iterators are objects that define sequence and provide next() method to access the
// next value in the sequence. They are used to iterate over data structures like
// arrays, strings, and custom objects. The key use case of iterators include*

// 1. Implementing the iterator protocol to make custom objects iterate, allowing
// them to be used with for...of loops and other language constructs that expect
// iterables.

// 2. Providing a standart way to iterate over different data screuctures, making
// code more reusable and maintainable

// ? Live example: creating custom iterator for a range of numbers:
// In JavaScript we can provide a default implementation for iterator by
// implementing [Symbol.iterator]() in any custom object.

// Define class named Range
class Range {
  start: number;
  end: number;
  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  // Define the dafault iterator
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    // Returns an object with a next method
    return {
      // next method return next value in the iteration
      next() {
        // if range is not completed
        if (current <= end) {
          return { value: current++, done: false };
        }
        // otherwise
        return { value: undefined, done: true };
      },
    };
  }
}

const range = new Range(1, 3);
for (const number of range) {
  console.log(number); // 1,2,3
}

const objectWithoutIterator = {};

//@ts-ignore
for (const a of objectWithoutIterator) {
  // error must have iterator
}
const objectWithIterator = {
  [Symbol.iterator]() {
    return {
      next() {
        return { value: 1, done: false };
      },
    };
  },
};
//
for (const a of objectWithIterator) {
  //1,1,1,1,1
}

//* Built-in objects using iterator protocol
// In JavaScript, several built-in object implement the iterator protocol, meaning
// they have a default iterator method. This allows the, to be used in costructs like
// for...of loops and with the spead operator. Here are some of the key built in objects
// that implement iterators*

// 1. Arrays: Arrays have build-in iterator that allows you to iterate over their elems

const array = [1, 2, 3];
const iterator = array[Symbol.iterator]();

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}

for (const value of array) {
  console.log(value); // Logs 1, 2, 3
}

const string = "hello";
const iterator2 = string[Symbol.iterator]();

console.log(iterator2.next()); // { value: "h", done: false }
console.log(iterator2.next()); // { value: "e", done: false }
console.log(iterator2.next()); // { value: "l", done: false }
console.log(iterator2.next()); // { value: "l", done: false }
console.log(iterator2.next()); // { value: "o", done: false }
console.log(iterator2.next()); // { value: undefined, done: true }

for (const char of string) {
  console.log(char); // Logs h, e, l, l, o
}

const nodeList = document.querySelectorAll("div");
//@ts-ignore need lib: [dom.iterable]
const iterator3 = nodeList[Symbol.iterator]();

console.log(iterator3.next()); // { value: firstDiv, done: false }
console.log(iterator3.next()); // { value: secondDiv, done: false }
// ...

//@ts-ignore need lib: [dom.iterable]
for (const node of nodeList) {
  console.log(node); // Logs each <div> element
}

// Map and Set are also have built-in iterators

//todo  ITERATORS
// Generators are a special kind of fucntion that can pause and resume their execution,
// allowing them to generate a sequance of values on-the-fly. They are commonly
// used to create iterators but have other applications as well.

//* The key use cases of generators include:
// 1. Creating Iterators is a more conciese(краткий) and readable way compared
// to manually implementing the iterator protocol

// 2. Implementing lazy evaluation, where values are generated only when needed,
// saving memory and computation time

// 3. Symplifying async programming by allowing code to be written in a
// sync-looking style using yield and await

//* Benefits of generators:
// 1. Lazy evaluation: They generate values on the fly and only when required, which is
// memory efficient

// 2. Pause and resume: Generators can pause execution via yield and can also
// recieve new data upon resuming

// 3. Async iteration: With the advent ( с появлением) of async/await, generators
// can be used to manage async data flows

//* Live Example: Creating a iterator using a generator function:
// We can rewrite our Range example to use generator function:

class RangeGenerator {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  *[Symbol.iterator]() {
    let current = this.start;

    //while range is not completed,
    while (current <= this.end) {
      // yield current value
      yield current++;
    }
  }
}

// Create a new Range object with start = 1 and end = 3
const range2 = new RangeGenerator(1, 3);
// Iterate over the range object
for (const number of range2) {
  // Log each number to the console
  console.log(number); // 1, 2, 3
}
// or same behavior
const iterator4 = range2[Symbol.iterator]();
console.log(iterator4.next()); // {value: 1, done: false}
console.log(iterator4.next()); // {value: 2, done: false}

//* Iterating over data streams

// Generators are well-suited for iterating over data streams, such as fetching data from
// an API or reading files. This example demonstrates a generator to fetch data from
// an API in batches (пакетное получчение данных из апи)

async function* fetchDataInBatches(url: string, batchSize = 10) {
  let startIndex = 0;
  while (true) {
    const response = await fetch(
      `${url}?start=${startIndex}&limit=${batchSize}`
    );
    const data = await response.json();
    if (data.length === 0) break;
    yield data;
    startIndex += batchSize;
  }
}

async function performBatching() {
  const dataGenerator = fetchDataInBatches("https://api.example.com/data");
  for await (const batch of dataGenerator) {
    console.log(batch);
  }
}

// This generator function fetchDataInBatches fetches data from an API in batches
// of a specified size. It yields each bach of data, allowing you to process it
// before fetching the next batch. This approach can be more memory efficient than
// fetching all data at once.

//* Async Generator (strange because previous also async)

// Generators can be used to implement async iterators. which are useful to
// work with async data sources. This example demonstrate an async iterator
// for fetching data from API

async function* fetchDataAsyncIterator(url: string) {
  let page = 1;
  while (true) {
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();
    if (data.length === 0) break;
    yield data;
    page++;
  }
}

const asyncIterator = fetchDataAsyncIterator("https://api.example.com/data");
async function fetchPage() {
  for await (const dataChunk of asyncIterator) {
    console.log(dataChunk);
  }
}

// The generator function fetchAsyncIterator is an async iterator that fetches
// data from an API in pages. It yields each page of data, allowing you to
// process it before fetching the next page. This approach can be useful
// for handling large datasets or long-running operations.

// Generators are also exensivly used in JS Libraries and Frameworks, such as
// Redux-Saga and RxJS, for handling async oeprations and reactive programming.

//* Summary
// Iterators and generators provide a pweorful and flexible way to work with
// collections of data in JavaScript. Iterators define standartized way to traverse
// data sequances, while generators offer a more expressive and efficient way to create
// iterators, handle async operations, and compose complex data pipelines
// (составлять сложные конвееры данных)

//* Just task by me for my self:
// Implement Doubly Linked list with iterator

class DoublyLinkedListNode<T> {
  value: T;
  next: DoublyLinkedListNode<T> | null;
  prev: DoublyLinkedListNode<T> | null;
  constructor(
    value: T,
    next: DoublyLinkedListNode<T> | null,
    prev: DoublyLinkedListNode<T> | null
  ) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList<T> {
  head: DoublyLinkedListNode<T> | null = null;
  tail: DoublyLinkedListNode<T> | null = null;

  addBegining(val: T) {
    if (this.head === null) {
      const node = new DoublyLinkedListNode(val, null, null);
      this.head = node;
      this.tail = node;
    } else {
      const node = new DoublyLinkedListNode(val, this.head, null);
      this.head.prev = node;
      this.head = node;
    }
  }

  addEnd(val: T) {
    if (this.tail === null) {
      const node = new DoublyLinkedListNode(val, null, null);
      this.head = node;
      this.tail = node;
    } else {
      const node = new DoublyLinkedListNode(val, null, this.tail);
      this.tail.next = node;
      this.tail = node;
    }
  }

  removeBegin() {
    if (this.head === null) {
      return;
    }
    const value = this.head.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head!.prev = null;
    }

    return value;
  }

  removeEnd() {
    if (this.tail === null) {
      return;
    }

    const value = this.tail.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail!.next = null;
    }

    return value;
  }

  *[Symbol.iterator]() {
    let current = this.head;

    while (current !== null) {
      yield current;
      current = current.next;
    }
  }
}

const linkedList = new DoublyLinkedList<number>();
linkedList.addBegining(1);
linkedList.addEnd(2);
linkedList.addBegining(0);
linkedList.addEnd(3);

console.log(linkedList);

for (let item of linkedList) {
  console.log(item); // 1,2,3,4
}
