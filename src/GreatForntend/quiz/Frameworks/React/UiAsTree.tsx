// * Understanding UI as a TREE

// Your React app is taking shape with many components being nested within each other.
// How does React keep track of a app component structure?

// React and many other UI libraries, model UI as a tree. Thinking of app as a tree
// Thinking of app as a tree is useful for understanding the relationship between
// components. This understanding will help devug future concepts like performance and
// state management.

// todo UI as a TREE

// Trees are relationship model between items and UI is often represented using tree
// structures . For example, browsers sue tree structures to model HTML(DOM) and
// CSS (CSSOM)

// (ComponentA, ComponentB, ComponentC) --React--> (A, B, C) --React DOM --> Tree
// React creates a UI tree from components. In this example UI tree is then
// used to render to the DOM

// React uses tree structures to manage and model the relationships between components
// in React app. These trees are useful tools to understand how data flows through a React
// app and how to optimize rendering and app size.

// todo The Render Tree
// A major feature of components is the ability to compose components of other ccomponents
// As we have nested components, we hav the concept of parent and child components
// where each parent component may itself be a child of another component

// When we render a React app, we can model this relationship in a tree known as
//the render tree.

// The root node in the React render tree is the root component.

//? Where are the HTML tags in the render tree ?
// You will notice in the above render tree, there is no mention of the HTML tags
// that each component renders. This is because the render tree is only composed
// of React components

// A render tree represents a single render pass of React application. With conditional
// rendering a parent component may render different children depending on the
// data passed

//* The module dependency tree
// Another relationsips in React app that can be modeled with a tree are an apps
// module dependencies. As we break up our components and logic into separate files
// we can create JS Modules where we may export components, functions or constants

// Each node in a module dependency tree is a module and each branch represents an import
//statement in that module

// Module dependency tree looks like ;
// App.js --imports--> InspirationGenerator.js , FancyText.js, Copyright.js --imports-->...

// The root node of the tree is the root module, also known as entrypoint file

// Comparing to render tree of the same app there are similat structures but some
//notable differences:
// 1. Nodes represents modules, not components
// 2 Non-component modules are also represented in the tree

// Dependency trees are useful to deternine what modules are necessary to run app
// When running React for a prod there is typically a build step that will bundle
// all necessary JS to ship to the client. The tool repsonsible for this is called
// a bundeler.

// As app growns often the bundle size does too. Large bundle size are expensive for
// a client to download and run. Large bundle sizes can delay the time for your UI to
//get drawn. Getting a sense of app dependency tree may help with debugging thes issues

// todo Recap

// 1 Trees are common way to represent the relationship between entities.
// They are often used to model UI

// 2 Render trees represent the nested relationships between React components across
// the single render

// 3 With conditional rendering, render tree may change across different renders.
// With different prop values components may render different children component

// 4 Render trees help identify what the top level and leaf level components are
// Top level components affect the rendering performance of all nested components

// 5 Dependency trees represent the module dependencies in React App

// 6 Dependency trees are used by build tools to bundele the necessary code

// 7 Dependency trees are useful for debugging large bundle sizes
