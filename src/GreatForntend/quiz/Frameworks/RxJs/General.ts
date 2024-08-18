//@ts-nocheck
//* RxJs

// A Event handling library for mastering asynchronous task by using
// observable sequences

// Its very flexible and allows more efficient(эффективный) task handling
// framework agnostic, Comes with a wide range og operators that make easay
// to handle complex async tasks

//cons; complicated, codebase can become hevaely wrapped in observables,
// complicating the code

// *RxJs vs promise
//1. Observables are lazy and dont execute until subscribe, while promises execute imm

//2. Observables can deliver a strean of multiple values over time, while
/// promise can only deliver one

//3. Observables provide complex operators for transforming and combining data,
// while Promises are more limited

//4. Observables can be interrupted/ canceled by unsubscriving, while promises
// will always finish

//5. Observables are more powerfull and flexible for handling complex async scenarios
// while promises are simpler and more straightforward for basic async tasks

//* Rx combines the observer patter with iterator pattern and functional pro-
// gramming with collections

// Observable - represents the idea of an invokable collection of values
// Observer - collection of vallbacks that knows how to listen to values
// Subscription - execuion of observable
// Operators - pure functions that enable a functional programming style
// Subject - equivalent of event emitter
// Schedulers - centralized dispatchers to control concurrency

// observe browser events
//fromEvent(document, 'click').subscribe(() => console.log('Clicked!'));

// normally need create an impure function to collect some state like:
let count = 0;
document.addEventListener("click", () =>
  console.log(`Clicked ${++count} times`)
);

//But with the scan method(similar reduce) its not needed
import { fromEvent, scan } from "rxjs";

fromEvent(document, "click")
  .pipe(scan((count) => count + 1, 0))
  .subscribe((count) => console.log(`Clicked ${count} times`));

//RxJS has a whole range of operators that helps you control how t
//he events flow through your observables.
import { fromEvent, throttleTime, scan } from "rxjs";

fromEvent(document, "click")
  .pipe(
    throttleTime(1000),
    scan((count) => count + 1, 0)
  )
  .subscribe((count) => console.log(`Clicked ${count} times`));

//* Some main operators

//! pipe -
// can take rxjs operators as arguments and apply them one by one to emitting
// values of the source, when returned from pipe obserable has been subscribed.

//* of
// converts values to a observable sequance

//* map
//- apply function to each emmited value and emits result as observable

//* combineLatest
// combine multiple Observables to careate and observable whos values
// are calculated from the latest values of each of inputs

//* ForkJoin
// accepts array of Observables and returns observable tjat emits
// values in the exact same order as pased array

//* filter
// filters out values emitted by observable based on a predicate func

//* take
// used to take a specific number of values  and then complete

//* tap
// to perform side effects

//* switchMap
// transform each value to a new observable, it then subscribe to a new and emit
// its value

//* mergeMap
// map each value emitted by the source into new observable and merge emission
// of all the resulting observables

//* reduce
// accomulate the values emitted by obs into a single value

//* deboundeTime
// is used to ignore values emitted by observable with specific interval

//* distinctUntilChanged
// ignore values if they are the same as previous

//* catchError
// to catch error0

//* exhaustMap
//- project each val to an observable which is merged  in the output observable
// only if previous projected observable has completed

//* takeUntil
// emits the values until notifier observable emits a value
