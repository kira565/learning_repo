


//?Updating state based on props or state 
//! It should be noted that it is an anti-pattern to copy properties that never change to the state
// There is no point to do it, probably when props changes in parent, all child components will be rerendered 
// and we can just use new value of props
//* just access props directly in that case


//Updating state based on props or state is not need
//! When something can be calculated from the existing props or state, don’t put it in state. 
//! Instead, calculate it during rendering. 
