// * Concurrent React 18

// The most important feature of React 18
// This is a mechanism that enables React to prepare multiple versions of UI
// at the same time. Its completely new concept that update React core rendering model.

//! Key property of concurrent react is interrupdtable rendering
// Before adding any concurrent featuwres, updates are rendered the same as previous of React -
// in a single synchronous transaction. With sync rendering when update starts nothing can interript it
// until the user can see the result on screen.
