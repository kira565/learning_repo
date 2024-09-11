// * What is state in react ?
// State of component is an object that holds some information, that may change over lifeteme of 
// component. The important point is whenever the state changes, component re-renders. It is always
// recommended to make state as simple as possible and minimize the number of stateful components.
// In functional components we use useState hook to create state object.it returns an array of
// 2 elements , 1st is a current state and second is updater fucntion.
const [message, setMessage] = useState("Welcome to React world");
// whenever react calls the component,  or access useState hook it gives us a in time snapshot
// of the state of that particular render
// State i similar to props but its private and fully controled by component, i.e its not acessible,
//to any other components till the owner decided to pass it.
// in class components we use code below to define state 
class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: "Welcome to React world",
    };
  }
}

//? What are props in React ?
// props are inputs to component, this is object that contains a set of values that are passed to
// components on creation. The primary purpose of props is next:
// 1 pass custom data to component, trigger state changes, use in jsx

//* What is difference between state and props
// In react both state andprops are plain js objects and used to manage the data of a component. But
// they use in different ways and have different characteristics

// state - managed by component itself and can be updated using the setter setState, unlike props
// state can be modified by the component and is used to manage the internal state of component,
// state acts as a component memory. Moreover changes in the state trigger a re-render of component and
// its children. The component cannot become reusable with the usage of state alone.

// On the other hand, props are passed to a component by its parent component and are //!read-only.
// meaning that they cannot be modified by the own component itself., i.e props acts as arguments 
// for a function. Also, props can be used to configure the behaviour of component and to pass data
// between components. Component become reusable with the usage of props.

//* What is lifting state up in React? 
// when several components need to share the same changing data(state), its recommended to lift shared state
// up to thier clostst common parent. This means if two child components share some data from their parent,
//then we need to move state to parent instead of managing local state of both components.

//* Stateless vs statefull components
// If the behaviour of a component is independed of its state, then it can be a stateless component.
// We can use either a functuin or a class, but unless we need to use a lifecycle hook its recommended
// to use fucntional components, there are a lot of benefits: easy to write, understand, test, they are little
// faster and we can awoid th this keyword.

// statefull components - if the behaviour of component is dependent on the state of the component,
// such component calls stateful component. These stateful components are either function components with hooks or class components.

//* how to prevent unecessary updates using setState function
// classes:
  this.setState((state) => {
    if (state.address === latestAddress) {
      return null;
    } else {
      return { title: latestAddress };
    }
})
// functional:
const [state, setState] = useState(0)

const handleSetState = () => {
    if (state > 0) {
        setState(p => p - 1)
    }
}
