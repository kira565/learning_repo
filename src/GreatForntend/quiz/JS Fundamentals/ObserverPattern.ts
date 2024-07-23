// With the observer pattern, we can subscribe certain objects,
// the observers, to another object, called the observable. Whenever an event occurs, the observable notifies all its observers!
// An observable object usually contains 3 important parts:

// observers: an array of observers that will get notified whenever a specific event occurs
// subscribe(): a method in order to add observers to the observers list
// unsubscribe(): a method in order to remove observers from the observers list
// notify(): a method to notify all observers whenever a specific event occurs

class Observable {
  observers: Function[];

  constructor() {
    this.observers = [];
  }

  subscribe(func: Function) {
    this.observers.push(func);
  }

  unsubscribe(func: Function) {
    this.observers.filter((obs) => func !== obs);
  }

  notify(data: any) {
    this.observers.forEach((observer) => observer(data));
  }
}
const observable = new Observable();

function logger(data: any) {
  console.log(Date.now(), data);
}
function logger2(data: any) {
  console.log(Date.now(), data);
}

//we will notify all loggers about the event
observable.subscribe(logger);
observable.subscribe(logger2);

export function operation() {
  //blabla functionality;
  observable.notify("Shit happens!");
}
// Loggers notified
console.log({ foo: "bar" });
