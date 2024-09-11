//* When to use a Class component over a Functional component
// After hooks have been added in React 16.8 it is always recommended to use Functional components over Class
// components in react, especially when component is purely presentational, they add simplicity, readability and modern code practices.
// Almost all features like state and lifecycle methods are presented in functional components too
// however there are two reasons to use class components over functional:
// 1 if react class components functionality equivalent is not presented in functional components, like Error Boundaries
// 2 in older versions if components needs state or lifecycle methods then we need to use Class components

//* Recomended ordering of methods in component class (from mounting to render stage:)
// static methods, constructor, getChildContext, componentWillMound, componentDidMount(), componentWillReceiveProps,
// shouldComponentUpdate, componentWillUpdate, componentDidUpdate, componentWillUnmounr, event handlers, render getters,
// optional render methods, render()

//* Difference between super() and super(props) in React ES6 classes
// when need to access this.props in costructor function, we should pass props to super(props) method, outside constructor
// props are available despite the fact we passed it to super() or not.

//* does the static object work with ES6 classes in React ?
// No. only works with 
React.createClass({ static: { someMethod: function() {}} })
// But we can write as below:
class Component extends React.Component {
    static propTypes = {}
    static someMethod(){}
}

//* How to use class field declarations syntax in React classes?
// React components can be made much more concise using class field declarations,
// we can initialize local state without using constructor and declare class methods ny using arrow functions
// without extra need to bind them
class Counter extends Component {
// previously: 
constructor(props) {
    super(props);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.state = { amount: '', goal: ''};
  }
  handleAmountChange(amount) {
    this.setState({ amount });
  }

  // with field declaration: 
  state = { value: 0 };
  
  handleAmountChange = (amount) => {
    this.setState({ amount });
  }
}

// * What is the required method for React class component?
// the render() method is the only required method in a class component, others are optional.

// * How to create react class component without ES6 ?
const Greeting = createReactClass({
  getDefaultProps: function () {
    return {
      name: "Jhohn",
    };
  },
  getInitialState: function () {
    return { message: this.props.message };
  },
  handleClick: function () {
    console.log(this.state.message);
  },
  render: function () {
    return <h1>Hello, {this.props.name}</h1>;
  },
});// 