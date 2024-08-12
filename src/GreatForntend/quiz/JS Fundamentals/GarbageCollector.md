# Garbage collector in JS

Garbage collection in JS is an automatic process managed by JavaScript engine, designed to
reclaim (вернуть) memory occupied by objects that are no longer needed. This helps
prevent memory leaks and optimizes the use of available memory. Here's an overview of how
garbage collection works in JavaScript:

## Memory Management Basics

JavaScript allocates memory for objects, arrays and other variables as they are created.
Over time, some of these objects become unreachable because there are no references to them.
Garbage collection is the process of identifying these unreachable objects and reclaiming their memory.

## Reachability

The primary concept in JavaScript garbage collection is reachability. An object is considered
reachable if it can be assigned or reached in some way:

    1. Global variables - object referenced to by global variables are always reachable

    2. Local variables and function parameters: These objects are reachable as long as function executing

    3. Closure variables: Object referenced by closures are reachable if the closure is
    reachable

    4. DOM and other system roots: Object referenced by the DOM or others host objects

If there is a chain of references from a root to an object, that object considered reachable

## Garbage collection algorithms

1. Mark-and-sweep (Маркировка и развертка)
   Mark phase - the garbage collector starts from root objects
   and marks all reachable objects
   Sweep phase - It then scans memory for objects that were not marked and reclaims their memory

2. Reference counting
   This algorithm keeps a count of references to each object. When an objects reference
   count drops to zero, it is considered unreachable and can be collected

   A drawback(недостаток) of reference counting is that it cannot handle circular
   references well (two objects referencing each other but not referenced by any other object)

3. Generational garbage collection: (Поколенческая сборка мусора)
   Memory is divided into generations: young and old

   Objects are initially allocated in the young generation

   Objects that survive multiple collections are promoted to the old generation

   Young gen collections are more frequent(частые) and faster, while old generation
   collections are less frequent but cover more objects.

## JavaScript Engine Implementations

Different JS Engines use variations of these algorithms:

V8 (Chrome, Node): Uses combination of generational, mark-and-sweep and other optimizations for efficient garbage collection.

SpiderMonkey (Mozila): Uses incremental and generational garbage collection

JavascriptCore (Safari): Uses a mark-and-sweep algorithm with generational collection

## Memory leaks

In JavaScript, memory leaks occur when a program fails to release memory that it no longer needs, causing the program to consume more and more memory over time.

Memory leaks can occur due to various reasons, including:

1. Accidental (случайные) global variables

2. Closures; Improper use of closures, when an inner function retains references to variables from an outer scope, preventing the outer functions s cope from being garbage collected

3. Event Listeners - Failing to remove event listeners or callbacks when they are no longer needed, causing the associated objects o remain in memory

4. Caching: Implementing caches without proper eviction logic, leading to unbounded memory growth over time.

5. Detached DOM node references: Keeping references to detached DOM nodes, preventing them from being garbage collected

6. Forgotten timers and callbacks

To avoid leaking memory:

1. Remove event listeners: Always remove event listeners when they are no longer needed.

2. Clear references in closures: Avoid holding unnecessary references in closures.

3. Manage DOM references: Explicitly remove DOM nodes and their references when they are no longer needed.

4. Avoid global variables: Minimize the use of global variables to reduce the risk of inadvertently keeping references alive.
