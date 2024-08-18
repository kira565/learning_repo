// * Explanation of how this works in JS
// this is a reference to some object , but this object can be different
// due to some factors.

// There is no simple explaination for this. It is one of the most confusing conecpts
// in Javascript. A hand-wavey(неясное) explaination is that the value of this depends
// on hwo the function is called.

// When we speak about this, the following rules are applied;

// 1. If the new keyword is used when calling the function, this inside the function
// is a brand new object.

// 2. If apply, call or bind , are used to call/ create a function, this inside the
// function is the object that is passed in as the argument.

//3. If a function is called as method. such as obj.method() - this is the object that
// the function is a property of (except arrow)

//4. If a function is invoked as a free function invocation, meaning it was invoked
// without any of the conditions present above, this is the global object. In browser-
// window object. If strict mode - undefined

//5. If multiple rules apply, the rule that is higher(in this list) wins and will
//set the this value

//6. If the function is arrow function, it ignores all the rules above and receives the
// this value of its surrounding scope at the time it is created.

//todo basic interview Tasks:

// Implement map
interface Array<T> {
  myMap<U>(
    callbackFn: (value: T, index: number, array: Array<T>) => U,
    thisArg?: any
  ): Array<U>;
}

//@ts-ignore
Array.prototype.myMap = function (callbackFn: Function, thisArg: any) {
  const len = this.length;
  const array = new Array(len);

  for (let k = 0; k < len; k++) {
    // Ignore index if value is not defined for index (e.g. in sparse arrays).
    if (Object.hasOwn(this, k)) {
      array[k] = callbackFn.call(thisArg, this[k], k, this);
    }
  }

  return array;
};
// thisArg is the native array method, it binds this to callback
[1, 2, 3, 4].map(
  function (this: any, el) {
    this.a;
    return 1;
  },
  { a: 5, b: 6 } // thisArg
);
// but in case of arrow function it useless:
[1, 2, 3, 4].map(
  (el) => {
    console.log(this); // undefined global this
  },
  { a: 20 }
);

// todo implement Filter
interface Array<T> {
  myFilter(
    callbackFn: (value: T, index: number, array: Array<T>) => boolean,
    thisArg?: any
  ): Array<T>;
}
//@ts-ignore
Array.prototype.myFilter = function (callbackFn: Function, thisArg: any) {
  const len = this.length;
  const results = [];

  for (let k = 0; k < len; k++) {
    const kValue = this[k];
    if (
      // Ignore index if value is not defined for index (e.g. in sparse arrays).
      Object.hasOwn(this, k) &&
      callbackFn.call(thisArg, kValue, k, this)
    ) {
      results.push(kValue);
    }
  }

  return results;
};

interface Array<T> {
  myReduce<U>(
    callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue?: U
  ): U;
}
//@ts-ignore
Array.prototype.myReduce = function (callbackFn: Function, initialValue: any) {
  const noInitialValue = initialValue === undefined;
  const len = this.length;

  if (noInitialValue && len === 0) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let acc = noInitialValue ? this[0] : initialValue;
  let startingIndex = noInitialValue ? 1 : 0;

  for (let k = startingIndex; k < len; k++) {
    if (Object.hasOwn(this, k)) {
      acc = callbackFn(acc, this[k], k, this);
    }
  }

  return acc;
};
