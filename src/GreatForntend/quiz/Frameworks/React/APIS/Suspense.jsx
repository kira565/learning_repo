 //* Suspense

 // UI pattern to show fallback instad of updating data before is not finished

 // lets display a fallback until its children have finished loading
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>


//! Note:
// Only Suspense-enabled data sources will activate Suspsnse component
// They include:

// Data fetching with Suspense-enabled frameworks like Relay and Next
// Lazy-loading component code with //? lazy
// Reading the value of Promise with //? use

//?use:
const value = use(resource);
//use is a React API that lets you read the value of a resource like a Promise or context.


// ! Suspsense doesnt detect when data is fetched inside an Effect or event handler

//todo Revealing content together at once
// by default whole tree inside Suspense as treaten as single unit.
// eg if at leasst one suspsends waiting for some data , all of them
// will be replaced with fallback

//? Note:
// Both DefferedValue and Transitions let us avoid showing Suspense fallback
// in favor (в пользу) of inline indicators. Transition mark all update as
// non-urgent. Deffere values on the other hand are mostly useful
// in app where we want to mark a part of UI as non-urgent and let it
// "lag behind" the rest of UI(отставать)