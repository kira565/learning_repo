//* UseCallback
// is React hook that lets cache a function definition between rerenders
import { useCallback } from 'react';

export default function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
}

// todo USAGE
// * 1 Skipping re-rendering of components

// When we optimieze rendering performance we sometimes need to cache the functions that we pass
// to a child components. 

// On initial render we get function we pased
// On following renders React will compare the dependencies with the dependencies we passed
// during the previous render. If nonbe changed (Object.is) useCallback return the same func as before

//* Let’s walk through an example to see when this is useful.
// Say we passing handleSubmit function down from the Product page to the ShippingForm
function ProductPage({ productId, referrer, theme }) {
  // ...
  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}


  // Weve noticed that toggling theme prop freezes app for a moment but if we remove <ShippingForm />
  // its ok. This tell us to optimize ShippingForm

  //! By default when component re-renders React re-renders all of its children recursively
  //! This is why when Products page rerender with different theme, the Shipping form
  //! component also rerenders

  // This is fine for components that dont require much calculation to rerender. But if we verified
  // a re-render is slow, we can tell shipping form to skip re-rendering when its props are the same
  // as on last reder by wrapping it in memo:
  import { memo } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  // ...
});
//! With this change ShippingForm will skip re-rendering if all of its props are the same
//! as on the last render.
//! This is when caching a function becomes important

// Lets say we defined handleSubmit without useCallback:
function ProductPage({ productId, referrer, theme }) {
  //! Every time the theme changes, this will be a different function...
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }
  
  return (
    <div className={theme}>
      {/*//! ... so ShippingForm's props will never be the same, and it will re-render every time */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

//!In JavaScript function (){} or () => {} always creates a different function.
// similar to how the {} object literal always create a new object. Normally this wouldnt
// be a problem, but it means that ShippingForm props will never be the same and
// our memo optimization wont work. This is where useCallback comes in handy:

function ProductPage({ productId, referrer, theme }) {
  // Tell React to cache your function between re-renders...
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // ...so as long as these dependencies don't change...

  return (
    <div className={theme}>
      {/* ...ShippingForm will receive the same props and can skip re-rendering */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

//! By wrapping handleSubmit in useCallback we ensure that its the same function between re-renders
//until dependencies change. We dont have to wrap a function in sueCallback unless we do it for some
// specific reason. In this example the reason is that we pass it to a component wrapped in memo
// and this lets it skip re-rendering.//* There are other reasons we might need useCallback also


//? DEEP DIVE useCallback related to useMemo
// the difference here in what they letting us cache
// actually we can think about useCallback implementation as follwos:

// Simplified implementation (inside React)
function useCallback(fn, dependencies) {
  return useMemo(() => fn, dependencies);
}

// todo Updating state from a memoized callback

//Sometmes we might need to update state based on previous state from a memoized callback

//This handleAddTodo function specifies todos as a dependency because it computes the next todos from it
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos([...todos, newTodo]);
  }, [todos]);
  // ...
}

// We usualy want memoized functions to have as few dependencis as possible
// When we read something from state only to calculate the next state, we can remove
// that dependency by passing an updater function
  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos(todos => [...todos, newTodo]);
  }, []); // ✅ No need for the todos dependency

  //todo Preventing an Effect from firing too often
  // Sometimes we might want to call a function from inside Effect:
  function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  function createOptions() {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection();
    connection.connect();
  })
}
//! THis creates a problem, Every reactive value must be declared as dependency of Effect
// However, if we declare createOptions as a dependency it will cause Effect to constantly 
// reconnect to the chatRoom
//To solve this we can wrap a function in useCallback
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const createOptions = useCallback(() => {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }, [roomId]); // ✅ Only changes when roomId changes

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // ✅ Only changes when createOptions changes
  // ...
}

//!However, it’s even better to remove the need for a function dependency.
//! Move your function inside the Effect:
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function createOptions() { // ✅ No need for useCallback or function dependencies!
      return {
        serverUrl: 'https://localhost:1234',
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ Only changes when roomId changes
  // ..
}

//todo Optimizing a custom hook

// We are writing a custom hook
//! It is recommended to wrap any function that it returns into useCallback
function useRouter() {
  const { dispatch } = useContext(RouterStateContext);

  const navigate = useCallback((url) => {
    dispatch({ type: 'navigate', url });
  }, [dispatch]);

  const goBack = useCallback(() => {
    dispatch({ type: 'back' });
  }, [dispatch]);

  return {
    navigate,
    goBack,
  };
}
//This ensures that the consumers of your Hook can optimize their own code when needed.

