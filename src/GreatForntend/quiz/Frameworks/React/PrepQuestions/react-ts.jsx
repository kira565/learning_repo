//?In TypeScript, how can you define the types of props in a React functional component?
// * Using interfaces or types to define the shape of props, using generic types

//?How do you define state in a TypeScript class component?
//* state: StateType = initialState ; inside the class
//* this.state={...} in the constructor (i believe now we need to typize in top)

//? How do you type a React component with generic props in TypeScript?
//* By using the React.ComponentType with generics
//* By using the React.FC type with a generic parameter
// type ComponentWithStatusLabelProps = React.ComponentType<{
//     status: StatusLabel;
//   }>;
  // OR
// React.FC<PropsType>  

//? What is a common issue when using TypeScript with React and how can it be resolved?
//*Type errors due to incorrect prop types, resolved by ensuring prop types match the expected interface or type

//? How can you troubleshoot TypeScript errors related to the context API in a React application?
//* By ensuring the context value matches the type defined in the Context creation
// EG just ensure that the type defined in context is matching with the context value
// todo idk, i would say we can use custom typized hook with useContext

