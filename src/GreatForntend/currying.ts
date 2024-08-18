// * Currying
// is the technique of converting a function that takes multiple args into a sequance
// of functions that each takes a single arg

// Implement curry function which accepts a function as the only argument and returns
// a function that accepts single arguments and can be repeatedly called until
// at least the minimum number of arguments have been provided

// Example
function add(a: number, b: number) {
  return a + b;
}

function curryAbstract(func: Function): Function {
  return () => {};
}

const curried = curryAbstract(add);
curried(3)(4); //7

// also should be valid;
const addedThree = curried(3);
addedThree(4); //7

//* We first need to unserstand
//1 Arity - number of arguments or operators taken by a func
//2 Closure - combination of a function bundled together with references to
// its lexical environment

// Curry will stop accepting arguments after number of args that have been already
// passed equals the arity of the original function

// We can keep a record of the curried function args so far via closures. Each time
// the curried function is called, we compare the number of arguments so far(данный момент)
// with the arity of the original function

// If they are the same we call the original function with this args
//If more args are needed we will return a function that accepts more
// arguments and invokes the curried function with the new argument

//! note, that the inner function should be arrow to preserve the same lexical this
// usecase
// curried = curry(multiply)
// const obj = { base: 5, mul: curried };

function curry(func: Function): Function {
  return function curryied(this: any, ...args: any[]) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    return (arg: any) => {
      if (arg === undefined) {
        return curryied.apply(this, args);
      } else {
        return curryied.apply(this, [...args, arg]); // old args + new arg
      }
    };
  };
}

//todo Advanced curry, can accept multiple args at the same time

function curry2(func: Function): Function {
  return function curried(this: any, ...args: any[]) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    return (...newArgs: any[]) => {
      return curried.apply(this, [...args, ...newArgs]);
    };
  };
}

//todo Super Advanced curry, where function can accept various count of args
//eg
function sum(...numbers: Array<number>) {
  return numbers.reduce((a, b) => a + b, 0);
}

// when function is expression suggest val should be string or number
//eg +curried() will be 25
//eg curried(3) will be function
// when not - return current value

export default function curry3(func: Function): Function {
  return function curried(this: any, ...args: any[]) {
    const returnableFunc: any = curried.bind(this, args);

    returnableFunc[Symbol.toPrimitive] = () => func.apply(this, args);

    return returnableFunc;
  };
}
