// React is the library for web and native user interfaces

// ReactComponents are the JavaScript functions that return markup
function MyButton() {
  return; <button>I'm a button</button>;
}


// Markup syntax is called JSX

//* Designing React app
// 1 STEP Break the UI into a component hierarchy
// React components should follow the //!Single Responsibility Principle,
// so ideally component should only do one thing

// Example:
// FilterableProductTable
    // SearchBar
    // ProductTable
        // ProductCategoryRow
        // ProductRow

// 2 STEP - build a static version in React
  // The most straightforward approach is to build a version that renders the UI from our data model
  // without any interactivity yet!
  // To build a static version we want to build components that reuse other components and pass data
  // using props
  

// STEP 3 Minimal Representation of UI state
// to make UI interactive, we need let users change your underlying data model. We will use state
// for this.
// Think of state as the minimal set of changing data that app needs to remember.
// The most important principle for strcturing state is to keep it //!DRY (Dont Repeat yourself)

// Now think of all the pieces of data i this example
// 1. Original list of products
// 2. The search text the user has entered
// 3. The value of the checkbox.
// 4. The filtered list of products

// Which o this are state?
//? Does it remain unchanged? its not a state
//? Is it passed from parent through props? it isnt
//? Can we compute it based on existing state? definately its not a state!

// ? Props vs State

// There are two typesof "model" data in React props and state. The two are very different

// Props are like arguments you pass to a function they let a parent pass data to a child
// and customize its apperace.

// State is like a component memory - lets component keep track of some information and change it
//response to interactions.

