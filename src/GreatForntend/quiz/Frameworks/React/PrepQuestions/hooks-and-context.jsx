// * What are hooks
// Hooks is a special JS function, that allows us to use state and other react features
// without writing a class. This pattern helps to isolate stateful logic from the component.

//* Hooks rules
// 1 Hooks must be called only at the top level of react functions. They shouldnt be called in loops, conditions,
// or nested functions. This will ensure that hooks are called in the same order each time component renders
// and it preserve the state of hooks between multiple re-renders due to useState and useEffect calls.
// 2. Call hooks from react functions only (Components and Custom Hooks) we shouldnt call it from calss components
// or regular js functions.

//* Ensure that all hooks followed the rules in project
// eslint plugin "react-hooks"

// * Do hooks replace render props and high order components?
// Both render props and HOC render only a single child, but in most cases Hooks are 
// a simpler way to serve this by reducing nesting in our tree 

//* How to fetch data with hooks?
// The effect hook called use effect is responsible for side effects including fetching data from external resource
 useEffect(() => {
    fetch("url/url")
        .then((r) => r.json())
        .then((data) => setData(data))
 }, [])
 // [] - empty array activates sueEffect hook only once

 //* Is Hooks cover all use cases for classes?
// Hooks dont cover all the cases of class components. There are still two lifecycle methods:
// getSnapshotBeforeUpdate and componentDidCatch. But they are gonna be added soon.

//* useLayoutEffect vs useEffect
// these are two hooks that can be used to synchronize a component with an external system, such as browser API,
// or third party library. However there are some key differences:

// 1. Timing - useEffect runs after browser finished painting, while useLayoutEffect runs synchronously before
// the browser paints. This means useLayoutEffect can be used to measure and update layout.

//2. Browser paint; useEffect allows browser to paint the changes before running the effect, it can
// cause some visual flicker. useLayouteffect synchronously run the effect before browser paints
// and avoid visual flicker.

//3. Execution order. Multiple useEffects are exexutions are determined by React and may not be predictable.
// useLayoutEffect executiions are determined by order in which they are called.

//4. Error handling. useEffect has built-in mechanism for error handling that occurs during the execution of 
// effect, so it doesnt crash entire application. useLayout effect doesnt have such mechanism.

// Generally its recommended to use useEffect because its more perfomant and less prone to errors. 
// useLayoutEffect should b used only if we need to measure or update layout.
 //! React Hook flow:
 // Mount                           Update                  Unmount
 // Run lazy initializers
 // ------------------Render--------------
 // ----------React Update DOM------------
 //                                 -------Cleanup LayoutEffect----
 // -----------Run LayoutEffect-----------

 // -----------Browser paint screen-------
//                                  -------Cleanup Effects----------
// ------------Run Effects----------------

// * Lazy state with useState
const [expensiveState, setExpensiveState] = useState(() => {});
// Lazy state we need in some rare situation when its very expensive calculation
// and it has sense if its used rarely, 
//! I wont start calculation until we turn to the state
//! (НЕ БУДЕТ ВЫЧИСЛЯТСЯ ДО ТЕХ ПОР ПОКА МЫ НЕ ОБРАТИМСЯ К СОСТОЯНИЮ)
//! AND IF WE SET NEW STATE before we turn to the initial state, it also wont run

// * Custom hooks purpose is to make reusable stateful logic from combinations of hooks and some logic


function useCount(initialValue) {
    const [count, setCount] = useState(initialValue)

    // These functions will be new on each render so its recommended to wrap them
    //! Так как хуки используются по всему проекту если мы не замеморайзим функции
    //! они пойдут ререндерить повсеместно все компоненты где мы исп хук
    const decrement = useCallback(() => setCount(prev => prev - 1), [])
    const increment = useCallback(() => setCount(prev => prev + 1), [])

    return {count, increment, decrement}
}

//! как определить зависимости для реакт хуков? если чтото берем извне и это не константа
//! так как выше мы использовали сеттер функцию мы можем не добавлять count в зависимости
//! сеттер функция берет самое актуальное последнее значение из стейта


//?What should you consider when creating a custom hook?
//* When creating custom hook we need to consider its impact on components lifecycle,
//* the types of components it will be used in, and how it manages state and side effects
// Well designed custom hook should be versatile(универсальный) enough to be used in
// different components and should properly handle state and side effects to ensure
// that it doesnt introduce bugs or performance issues into the components where its used

// ? How to optimize performance of components that uses many custom hooks
//* using useCallback and useMemo and by minimizing number of state updates
// (useCallback/memo minimize number of re-renders)
