//? Which of the following activities do we perform while declaring useState in React?
// * Array destructuring

//? Which type of variable can we define in the useState hook?
//* All of the above (number, str,list etc)

//? Can we use the useState hook inside conditional statements such as if or while?
//* no, its generally doesnt align with the hook rules

//? How does React remember which state variable belongs to which useState call?
//* It remembers the calling order
//exp: React relies on the order in which the useState (and other hooks) are called. It keeps track of the hooks based 
//on the order they are called within the component during each render.

//? How many calls can we make to useState or useEffect in a single component?
//* Unlimited

//?? Can we use useState and useEffect hooks simultaneously in a component?
//* YEs

//? What does useState() return in React?
// * array with value and setter

//? What is passed as an argument in useState() in React?
//* Initial value

//? Which datatype can be passed as an argument in useState() in React?
//* All of these (json, string, number etc)

//? How many possible arguments can useState() take?
//* only 1

//? Identify the issue in this useState usage:
const [count, setCount] = useState(0);
setCount(count + 1);

//* The state update should be inside a component or effect

