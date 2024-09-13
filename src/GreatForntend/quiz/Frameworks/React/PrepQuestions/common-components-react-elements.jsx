// * Common components also known as react elements (eg. <div>)

<div className="wrapper">Some content</div>
// All built-in components such as <div> support some common props and 
// events

//? Props
// 1.  children - a react node (element,string,number,portal,empty node like null,
// undefined, booleans, array of React Nodes) - specify content inside
// component 
//<div><span /></div>. when using jsx

// 2. dangerouslySetInnerHTML - Overrides innerHTML property of the DOM NODE
// it can cause XSS, dont use with use input

// 3. ref - ref object from useRef or createRef or ref callback function
// or string for legacy refs. Our ref wil lbe filled with DOM element ref 
// for this node

// 4. suppressContentEditableWarning - boolean. if true - supress the warning
// that react shows.

//5. style - object with CSS

// ? standart DOM props are also supported
// accesskey - shortcut

// aria-* - aria attributes for accesibility tree information 

// className - string specify css class name

// data-* 

// draggable - specify if element is draggable - part of HTML drag and drop API

// htmlFor - string for <label>

// hidden - boolaen or string

// id 

// is - string if specified conponent will behave like custom element

// inputMode - String 

// item prop - string

// lang - string

// onANimationEnd- AnimationEvent handler functuion - fires when css animation complete
// etc...
//! there are so many

// Caveats 
// You cannot pass both children and dangerouslySetInnerHTML at the same time.
// Some events (like onAbort and onLoad) don’t bubble in the browser, but bubble in React.
