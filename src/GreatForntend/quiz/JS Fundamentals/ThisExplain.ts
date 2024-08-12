// * Explanation of how this works in JS
// this is a reference to some object , but this object can be different
// due to some factors.

// There is no simple explaination for this. It is one of the most confusing conecpts
// in Javascript. A hand-wavey(неясное) explaination is that the value of this depends
// on hwo the function is called.

// When we speak about this, the following rules are applied;

// 1. If the new keyword is used when calling the function, this inside the function
// is a brand new object.

// 2. If apply, call or bind , are used to call/ create a function, this inside the
// function is the object that is passed in as the argument.

//3. If a function is called as method. such as obj.method() - this is the object that
// the function is a property of (except arrow)

//4. If a function is invoked as a free function invocation, meaning it was invoked
// without any of the conditions present above, this is the global object. In browser-
// window object. If strict mode - undefined

//5. If multiple rules apply, the rule that is higher(in this list) wins and will
//set the this value

//6. If the function is arrow function, it ignores all the rules above and receives the
// this value of its surrounding scope at the time it is created.
