//* What is COntext
// Context provides a way to pass data through the compoent tree without having to pass props down manually at every level.

// * What is difference between React Context And Redux?
// React Context is designed for avoid props drilling and passing down data to deeply nested components
// Redux is much more powerful and provides a large number of features, it uses context internally but
// it doesnt expose this fact in the public api

//* What is purpose of default value in context?
// The default value argument is only used when a component does not have a matching Provider above in the tree.
// This can be helpful for testing components in isolation without wrapping them
const MyContext = React.createContext(defaultValue);

//* What are the use cases of useContext hook
// Some of the common use cases of useContext hook are listed below
// 1. Theme customization.
// 2. Support localization
// 3. User authentication

//* how to use Context type. 
// in class components:
class MyComponent extends React.Component{}
MyComponent.contextType = MyContext;
// in func component we can write custom typized hook

//* How to solve performance cases while using context?
// The context uses reference identity to determine when to rerender. There are some gotchas that could 
// trigger unintentional rerenders in consumers when a providers parent rerenders eg
//For example, the code below will re-render all consumers every time the Provider re-renders because a new object is always created for value.
class App extends React.Component {
  render() {
    return (
      <Provider value={{ something: "something" }}>
        <Toolbar />
      </Provider>
    );
  }
}
//This can be solved by lifting up the value to parent state,
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: { something: "something" },
    };
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}

//! If you want to update context, use it with state (useState or useReducer) as described above.
//? How can you dynamically change the value of a context in a component tree?
//* By updating the state that's passed to the context provider's value prop
// this approach allows the context value to be dynamic and responsive to state
//changes within the component that renders the context provider. THis pattern is 
// commonly used to ensure that context values remain up-to-date with app state

//? How does the Context API help in avoiding "prop drilling"?

// * By allowing components to subscribe to context changes directly

//?  What is a potential drawback of using the Context API excessively?

//* Difficultly in managing and tracking state changes
// While its powerful for sharing data across components, overusing it can lead
// to challenges in maintaining state, understanding where state changes are initiated,
// and debugging as the context data flow is not as explicit or isolated as local 
// components state managed by state management libraries. Moreover it can cause 
// unecessary re-renders for components thhat are part of context consumers but they 
// dont need this part of the state

//? how we address a performance issue caused by unecessary re-renders in components 
//? consuming a frequently updated context ?

//* Splitting the context into multiple smaller contexts

