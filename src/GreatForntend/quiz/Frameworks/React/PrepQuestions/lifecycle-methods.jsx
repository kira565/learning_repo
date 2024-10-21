// In React Class components we have different lifecycle methods:

// * getDerivedStateFromProps - 
// invokes right before calling render(), and is invoked on every render. This exists for rare use cases where we need
// a  //?derived sate
//? derived state - Computed state is also called derived state: it's state that never
//? needs to be changed independently from some other state
class Form extends Component {
  state = {
    email: this.props.defaultEmail,
    prevUserID: this.props.userID
  };

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user
    // In this simple example, that's just the email.
    if (props.userID !== state.prevUserID) {
      return {
        prevUserID: props.userID,
        email: props.defaultEmail
      };
    }
    return null;
  } // ! so we computing a new state from props if something changes
}

//* componentDidMount 
//Execute after first rendering and where all Ajax requests, Dom or state updates and set up event listeners should occur
class ChatRoom extends Component {
  componentDidMount() {
    this.setupConnection();
  }
}

//* shouldComponentUpdate
// Determines if the component will be updated or not. y default, it returns true. If you are sure that the component doesn't 
// need to render after the state or props are updated, you can return a false value.
// It is a great place to improve performance as it allows you to prevent a re-render if component receives a new prop.
class Rectangle extends Component {
  state = {
    isHovered: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    if ( 
        nextProps.position.x === this.props.position.x 
        && nextState.isHovered === this.state.isHovered
    ){
        return false
    } else {
        return true
    }
  }
}

//* getSnapshotBeforeUpdate
//Executed right before rendered output is committed to the DOM. Any value returned by this will be passed into componentDidUpdate()
// This is useful to capture information from the DOM i.e. scroll position.
class ScrollingList extends React.Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }
    componentDidUpdate(prevProps, prevState, snapshot) { //! snapshot comes from getSnaphotBeforeUpdate
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }
}

//* componentDidUpdate
// Mostly used to update the DOM in response to prop or state changes. This will not fire if shouldComponentUpdate() returned false
// ? example above

//* componentWillUnmount 
// It will be used to cancel any outgoing network requests, or remove all event listeners associated with the component.
class ChatRoom extends Component {
  componentDidMount() {
    this.setupConnection();
  }
  componentWillUnmount() {
    this.destroyConnection();
  }
}

//! Additional

//* componentDidCatch 
//The componentDidCatch lifecycle method is invoked after an error has been
// thrown by a descendant component. The method receives two parameters: error, info
// signature: componentDidCatch(error, info);

//? Adding this method makes react component an error boundary

// * Different phases of component lifecycle (OLD Q&A)
// In old versions it has three distinct lifecycle phases:

// 1. Mounting 
// The component is ready to mount in the browser DOM. This phase covers initialization from constructor(), 
// getDerivedStateFromProps(), render(), and componentDidMount() lifecycle methods.

// 2. Updating: 
//In this phase, the component gets updated in two ways, sending the new props and updating the state either from 
//setState() or forceUpdate(). This phase covers getDerivedStateFromProps(), shouldComponentUpdate(), render(), 
//getSnapshotBeforeUpdate() and componentDidUpdate() lifecycle methods.

//3 Unmounting
//In this last phase, the component is not needed and gets unmounted from the browser DOM. 
//This phase includes componentWillUnmount() lifecycle method.

//It's worth mentioning that React internally has a concept of phases when applying changes to the DOM. 
//They are separated as follows: 

// 1. Render 
//Render The component will render without any side effects. This applies to Pure components and in this phase, 
//React can pause, abort, or restart the render.

// 2. Pre-commit
// Before the component actually applies the changes to the DOM, there is a moment that allows
// React to read from the DOM through the getSnapshotBeforeUpdate().


// 3. Commit
// Commit React works with the DOM and executes the final lifecycles respectively componentDidMount() for mounting, 
// componentDidUpdate() for updating, and componentWillUnmount() for unmounting


////* Recomended ordering of methods in component class (from mounting to render stage:)
// static methods, constructor, getChildContext, componentWillMound, componentDidMount(), componentWillReceiveProps,
// shouldComponentUpdate, componentWillUpdate, componentDidUpdate, componentWillUnmounr, event handlers, render getters,
// optional render methods, render()


//! Modern react rendering includes 3 phases

// 1. triggering update
// 2. rendering and reconcilation (includes 2 scenarios: initial render and re-render)
// 3. commit