// * What is an error boundaries in React

// Error boundaries are components that catch Javascript errors anywhere in their child component tree, log those errors
// and display a fallback UI instead of the component tree that crashed

//! Now available only in class components, coming soon in future updates with functional componens.
// A class component becomes an error boundary if it defines a new lifecycle method called 
componentDidCatch(error, info)
getDerivedStateFromError() 

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>{"Something went wrong."}</h1>;
    }
    return this.props.children;
  }
}

// After that use it as a regular component: (all nested component errors will be handled)
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>

//? In which scenarios do error boundaries not catch errors?
// 1. Inside Event Handlers
// 2. Async code using setTimeout or requestAnimationFrame
// 3. During Server side rendering
// 4. When errors thrown in the error boundary code itself

//? What is the behavior of uncaught errors in react 16?
// In React 16, errors that were not caught by any error boundary will result in unmounting of the whole React component tree.
// Its better to render nothing than corrupted UI because it can cause serious problems eg payment app

//? Proper placement for error boundaries?
// Depends on project needs
// We can wrap top level route components to display generic error message for entire application
// We can also wrap individual components in an error boundary to protect them from crashing the rest of application