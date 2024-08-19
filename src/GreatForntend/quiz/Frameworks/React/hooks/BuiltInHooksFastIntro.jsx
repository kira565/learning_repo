// * Built-in React hooks

// Hooks let you use different React features from our components, We can either 
// use the built-in Hooks or combine them to build our own. 
// There are all built-in Hooks in React

//todo State Hooks

// State lets a component "remember information like user input"
// Available hooks:

//? 1. useState - declares a state variable we can update directly
const [index, setIndex] = useState(0);

//? 2. useReducer - declares a state variable with the update logic inside
//? a reducer function
const [state, dispatch] = useReducer(reducer, initialArg, init) // init?
//reducer - function that specofies how state gets updated
//initialArg - initial value 
//init? - initializer function, if not specified prev param used, if specified-
// iniial state set to result of calling init(initialArg)


// todo Context hooks 
// Context lets a component receive information from distant without 
// passing props. Eg App top level component can pass the current UI theme
// to all components below

//? useContext - reads and subscrives to a context
//  const theme = useContext(ThemeContext);
const [currentContext, setCurrentContext] = useState(null)
const CurrentUserContext = createContext(null);

<CurrentUserContext.Provider value={{
    currentContext,
    setCurrentContext
}}>
    /...
</CurrentUserContext.Provider>

//todo Ref Hooks
//? useRef - declares a ref. Can hold any value in in. most often DOM node
//? useImperativeHandle lets customize the ref exposed by component

//todo Effect Hooks

//? useEffect - connnects a component to a external system (outside React).
// network, browser DOM, animations, widgets, UI libraries, other non-react code

//? useLayoutEffect - fires before the browser repaints the screen, we can
//? measure layout here
const ref = useRef(null);
const [tooltipHeight, setTooltipHeight] = useState(0);

useLayoutEffect(() => {
  const { height } = ref.current.getBoundingClientRect();
  setTooltipHeight(height);
}, []);
//* Sometimes to render something properly we need to know its sizes.
//* to do this we need:
//* 1 Render element anywhere or hidden
// * 2 measure its size
// * 3 Render again in correct place

//! All of this needs to happen before browser repaints the screen.
//! thats useLayouteffect needed

//! Note: useLayoutEffect blocks browser from repainting
//! it is synchronous

//?useInsertionEffect fires before React makes changes to the DOM. Libraries
//? can insert dynamic CSS here

//todo Performance Hooks
// Common way to optmize re-rendering performance is to skil unecessary 
// work. Reuse cache calculation or skip re-render if the data has not changed

//TODO
//? useMemo - lets to cache result of an expensive calculation 
//? useCallback - lets to cache a function definition before passing it down
//? to an optimized component
const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

//Sometimes we cant skip re-rendering because the screen actualy needs to
// update. In that case we can improve performance by separating 
// blocking updates that must be synchronous (like typing into an input)
// from non blocking updates which dont need to block the user interface
// like updating chart

//TODO
//? useTransition - lets us mark a state transition as non-blocking and allow
//? other updates to interrupt it.

//? useDefferedValue - lets us defer updating non-critical part of the UI and let
//? others parts update first.

//todo Other Hooks
// These Hooks are mostly useful to library authors and arent commonly used in
// the application code

//? useDebugValue - customize the label React DevTools display for custom hook
//? useId - lets component associate a unique ID with itself. 
//? useSyncExternalStore - lets component subscribe to an external store
//? useActionState - allows to manage state of actions
