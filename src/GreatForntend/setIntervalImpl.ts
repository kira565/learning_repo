// setInterval() Global function
// repeatedly calls a function or executes a code snippet
// with fixed timedelay between each call

//Return intervalId which identifyies interval
// it can be removed

//todo WITH RETURN FUNCTION

// ! This approach uses closures and setInterval

function customSetInterval(callback: Function, interval: number) {
  let ids: number[] = []; // closure memorized

  (function recursiveSetTimeout() {
    const id = setTimeout(() => {
      callback();
      recursiveSetTimeout();
    }, interval);
    ids.push(id);
  })();

  // how we exit recursion. If we clear all intervals, all calbacks will gone
  // so it will stops
  return () => ids.forEach((id) => clearTimeout(id));
}

const clear = customSetInterval(() => {
  console.log("BM");
}, 1000);

setTimeout(() => clear(), 5000);

//! THIS IS MY UPDATED APPROACH
//* my approach to not use array because its not need, timeout is calnceled after its completed
function customSetIntervalBetter(callback: Function, interval: number) {
  let idClosure: number | null = null;

  (function recursiveSetTimeout() {
    const id = setTimeout(() => {
      callback();
      recursiveSetTimeout();
    }, interval);
    idClosure = id;
  })();

  return () => idClosure && clearTimeout(idClosure);
}

const clear2 = customSetIntervalBetter(() => {
  console.log("TICK");
}, 1000);

const clear3 = customSetIntervalBetter(() => {
  console.log("TICK2");
}, 2000);

setTimeout(() => clear2(), 5000);
setTimeout(() => clear3(), 10000);

//! Close to Native approach (two functions)

interface Window {
  customSetInterval: Function;
  customClearInterval: Function;
}

function customSetIntervalWindow(window: Window) {
  const intervalIds = new Map<number, number>();

  window.customSetInterval = function (
    handler: Function,
    delay?: number
  ): number {
    const intervalId: number = Math.floor(Math.random() * 1000);

    (function recursiveSetTimeout() {
      const id = setTimeout(() => {
        handler();
        recursiveSetTimeout();
      }, delay);
      intervalIds.set(intervalId, id);
    })();

    return intervalId;
  };

  window.customClearInterval = function (intervalId: number) {
    if (intervalIds.has(intervalId)) {
      clearTimeout(intervalIds.get(intervalId));
      intervalIds.delete(intervalId);
    }
  };
}
