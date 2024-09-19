
//REACT Follows Unidirectional or one-way data flow or data binding.

//? React achieve code reuse with components
// primarly by rendering props children. This allows components to pass elements and components 
// to each other.


// todo HIGH ORDER COMPONENTS (HOC)
//* provide:
// 1. Code reusability
// 2 Separation of concerns (разделение интересов)
// 3 Interoperability ;совместимость
// 4 Testing
// 5 Render hijacking
// 6 State abstraction
// 7 props manipulation


//? Why are Higher-Order Components useful in React?
//* They make components more reusable

// HOCS are useful in react because they make components more reusable.
// By abstracting common functionalities into HOCS, different components can be
// enhanced or composed with these functionalities without code duplication
// This results in a cleaner, more maintainable codebase where shared logic is centralized
// inside HOC rather than being splitted and dublicated across multiple components.
// classic example is 

//* HOC EXAMPLE
const withAuthentication = (WrappedComponent) => {
  // Return a new component
  return (props) => {
    // Check if user is authenticated (you can implement your own authentication logic here)
    const isAuthenticated = checkIfUserIsAuthenticated();

    // If user is authenticated, render the wrapped component
    // Otherwise, redirect to the login page
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };
};


//* HOC COMPOSITION


//? What is the key consideration when using HOC?
//* They should not alter the component's signature

// This means an HOC should pass through props to the wrapped component
// without modification (должен передавать пропсы оборачиваемому компоненту без имзменений)
// ensuring that HOC is transparent to the component its enhancing and to the rest of React component
// tree. It maintains a onsistent and predictable structure for components and their interactions.

//? What is the correct way to pass additional arguments to a Higher-Order Component in React?
// todo not sure because yandex guy told example above is correct
//* HOCFunction(additionalArg)(Component)


//? How do you avoid namespace clashes(конфликты имен) in props when using
//?  multiple Higher-Order Components?
//* By using unique prop names across all HOCS

// TO avoid namespace clashes in props when using multiple HOC its important to use unique
// prop names across all HOCs. This prevents one HOC from accidentally overriding 
// or interfering with props intended for another HOC or for the wrapped component.
// Careful naming can help manage HOC complexity and avoid conflicts

//? What are pure components?
// Pure components are the components which render the same output for the same 
// state and props. In function components we can achieve there through memoized
// React.memo() API
const Chart = memo(SomeComponent, arePropsEqual); //props equal is optional if need complex logic
// This API prevents unecessary rerenders by comparing the prev props and new props
// using shallow comparsion so itwill be helpful for performance optimization.

// But in the same time it wont compare the prev tate with the current state, 
// because function component itself prevents the unecessary rendering by default
// when we set the same state again.

//? What are controlled components?
// Components that controls the input elements within the forms on subsequent user 
// input is called Controled Components, ie every state mutation will have an 
// associated handelr function. That means, the displayed data is always in sync with the 
//state of the component.

//For example, the name input field updates the user name using handleChange event handler as below,
function UserProfile() {
  const [username, setUsername] = useState("");

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <form>
      <label>
        Name:
        <input type="text" value={username} onChange={handleChange} /> 
      </label>
    </form>
  );
}

//? What is uncontrolled components
// Are the ones that store their own state internally and we query the DOM using a ref
// to find its current value when we need it. This is a bit more like traditional HTML

//In the below UserProfile component, the username input is accessed using ref.
function UserProfile() {
  const usernameRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("The submitted username is: " + usernameRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" ref={usernameRef} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

//! In most cases its recommended to use controlled components to implement forms.
//! In a controlled component, form data is handled by a React component, 
// the alternative is uncontrolled components where form data is handled by the DOM
// itself