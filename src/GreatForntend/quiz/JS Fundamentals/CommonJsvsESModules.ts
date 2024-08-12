// * Explain the differences between CommonJS modules and ES modules

// CommonJS is an older system that was innitialy designed
// for server-side JavaScript development woth node.js
// It uses the require function to load modules and the module.exports or exports object
// to define the exports of a module.

// Syntax: Modules are included using require() and exported using module.exports

// Environment: Primarilly used in Node.js

// Exrcution: Modules are loaded synchronously and dynamically at runtime

// my-module.js
const value = 42;
module.exports = { value };

// main.js
const myModule = require("./my-module.js");
console.log(myModule.value); // 42

// * ES Modules
// ECMAScript modules are the standardized module system introduced in ES6. THey use the
// import and export statements to handle module dependencies

// Syntax: modules are imported using import and export
// Environment: Can be used in both borwser env and Node with certain config
// Execution : modules are loaded asynchronously
// Support: Introduced in ES2015, now widely supported in modern browsers and Node.js
// Modules are loaded statically at compile time
// Enables better performance due to static analysis and tree-shaking

// my-module.js
export const valu1e = 42;

// main.js
//@ts-ignore
import { value } from "./my-module.js";
console.log(valu1e); // 42

//Summary
// While CommonJS was the default module system in Node.js initially, ES modules are
// now the recommended approach for new projects, as they provide better tooling,
//performance, and ecosystem compatibility. However, CommonJS modules are still widely
// used in existing code bases and libraries especially for legacy dependencies.
