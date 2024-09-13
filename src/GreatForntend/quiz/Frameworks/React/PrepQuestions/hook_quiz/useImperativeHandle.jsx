
// hook used to provide a forward ref to parent component with limited functionality
const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
});

// ? What is the primary purpose of the useImperativeHandle hook in React?
// * To expose specific methods to parent components

//? When should you use the useImperativeHandle hook?
//* When you need to expose specific methods to parent components

//? What problem does the useImperativeHandle hook solve?
//* Exposing specific methods to parent components

//? How does the useImperativeHandle hook improve performance?
//* By providing a controlled way to expose methods to parent components

//? What is the syntax for using the useImperativeHandle hook?
//* useImperativeHandle(ref, () => {})

//? When should you avoid using the useImperativeHandle hook?
//* When you need to manage component state

//? Can the useImperativeHandle hook be used to expose multiple methods to parent components?
//* Yes, it can expose multiple methods

//? What is the primary use case for the useImperativeHandle hook?
//* To expose specific methods to parent components

//? How does the useImperativeHandle hook handle the exposed methods?
//* It requires explicit definition and return of methods

//? Can the useImperativeHandle hook be used to expose methods from functional components?
//* Yes, it can expose methods from both functional and class components

//? In what scenarios might the useImperativeHandle hook not provide significant benefits?
//* When only simple components are involved
//The useImperativeHandle hook may not provide significant benefits when only simple components are involved, 
// /as its primary purpose is to customize and expose instance values to parent components through a ref.

//?? How does the useImperativeHandle hook improve the maintainability of React components?
//* By providing a controlled way to expose methods to parent components

//? Can the useImperativeHandle hook be used to expose methods to sibling components?
//* No, it can only expose methods to parent components
// it is designed to facilitate communication between child and parent components, not between sibling components.

//? What is the impact of using the useImperativeHandle hook on component re-renders?
//* It has no impact on component re-renders

//? How does the useImperativeHandle hook handle `the cleanup of exposed methods?
//* It automatically cleans up exposed methods on component unmount

//? What is the main difference between useImperativeHandle and useRef?
//* UseImperativeHandle is for exposing methods to parent components, while useRef is for creating mutable references

//? Can the useImperativeHandle hook be used to expose methods from class components?
// * hooks are designed for functional components.However, class components have their own way to expose methods 
//* via refs, typically using React.forwardRef.

//? What is the primary use case for exposing methods using useImperativeHandle?
//* To enable parent components to control child components

//? How does the useImperativeHandle hook differ from the useMemo hook?
//* useImperativeHandle exposes methods to parent components, while useMemo memoizes the result of a function