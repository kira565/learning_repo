// * What are the differences between Map/Set WeakMap/WeakSet

// The key difference between Map/Set and WeakMap/WeakSet in JS are:

// 1. Key types:
//Map and Set can have keys of any tipe (objects, primitive values, etc), while
// WeakMap and WeakSet can only have objexts as keys. Primitive values like string or numbers are not
// allowed as keys in WeakMap and WeakSet

// 2. Memory Management:
// The main difference lies in how they handle memory. Map and Set have strong reference to their keys and
// values, which means they will prevent garbage collection of those values. On the other hand,
// WeakMap and WeakSet have week references to their keys (objects) allowing those objects to be
// garbage collected if there are no other strong references to them

// 3. Key enumeration:
//Keys in Map and Set are enumerable (can be iterated over), while keys in WeakMap
// and WeakSet are not enumerable. This means you cannot get a list of keys or values from WeakMap or
// WeakSet.

// 4. Size property:
// Map and Set have size property that returns the number of elements, while WeakMap and WeakSet do not have
// a size property because their size can charge due to garbage collection

// 5. Use cases:
// Map and Set are useful for general-purpose data structures and caching, while WeakMap and WeakSet are
// primarily used for storing metadata or additional data related to objects, without preventing those objects
// from being garbage collected

// * Use cases of WeakMap and WeakSet:

//* Tracking Active users

// In a chat application , you might want to track which user objects are currently active without preventing
// garbage collection when the user logs out or the session expires. We use a WeakSet to track active user
// objects. When user logs out or their session expires, the user object can be garbage-collected if there are
// no other references to it.

const activeUsers = new WeakSet();

function makeUserActive(user: any) {
  activeUsers.add(user);
}

function isUserActive(user: any) {
  return activeUsers.has(user);
}

let user1: object | null = { id: 1, name: "Alice" };
let user2 = { id: 2, name: "Bob" };

console.log(isUserActive(user1)); // true
console.log(isUserActive(user2)); // true

user1 = null;

// user1 is now eligible for garbage collection
console.log(isUserActive(user1)); // false

//todo Wow, it can be used in external call application

// * Detecting circular references
// WeakSet is provides a way of guarding against circular data structures by tracking which objects have already
// been processed

const visited = new WeakSet();

function traverse(obj: any) {
  if (visited.has(obj)) {
    return;
  }

  visited.add(obj);

  for (let prop of obj) {
    if (obj.hasOwnProperty(prop)) {
      let value = obj[prop];
      if (typeof value === "object" && value !== null) {
        return traverse(value);
      }
    }
  }

  console.log(obj);
}

// Usage
const obj = {
  name: "jhon",
  age: 30,
  self: {},
  friends: [{ name: "Alice", age: 23 }],
};

// Create circular reference
obj.self = obj;

// Traverse the object
traverse(obj);
// we will go to return
