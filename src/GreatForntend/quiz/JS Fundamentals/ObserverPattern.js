"use strict";
// With the observer pattern, we can subscribe certain objects,
// the observers, to another object, called the observable. Whenever an event occurs, the observable notifies all its observers!
// An observable object usually contains 3 important parts:
Object.defineProperty(exports, "__esModule", { value: true });
exports.operation = void 0;
// observers: an array of observers that will get notified whenever a specific event occurs
// subscribe(): a method in order to add observers to the observers list
// unsubscribe(): a method in order to remove observers from the observers list
// notify(): a method to notify all observers whenever a specific event occurs
class Observable {
    observers;
    constructor() {
        this.observers = [];
    }
    subscribe(func) {
        this.observers.push(func);
    }
    unsubscribe(func) {
        this.observers.filter((obs) => func !== obs);
    }
    notify(data) {
        this.observers.forEach((observer) => observer(data));
    }
}
const observable = new Observable();
function logger(data) {
    console.log(Date.now(), data);
}
function logger2(data) {
    console.log(Date.now(), data);
}
//we will notify all loggers about the event
observable.subscribe(logger);
observable.subscribe(logger2);
function operation() {
    //blabla functionality;
    observable.notify("Shit happens!");
}
exports.operation = operation;
// Loggers notified
console.log({ foo: "bar" });
