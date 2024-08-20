// * useDefferedValue 
// is a React hook that lets us defer updating a part of UI

const deferredValue = useDeferredValue(value)
function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  // ...
}

//todo Usage

//todo Showing stale(несвежий) content while fresh is loading

// During initial render, the defferend value will be the same as the value
// we provided. 

// During updates the deffered value will lag behind the latest value.
// In particular React will first re-render without updating the deffered v
// and then try to rerender with newly received value

//! Note
// This Example assumes we use a Suspense-enabled data source

// Data fetching with Suspense-enabled framework
// Lazy loading component 
// Reading value of promise with use

//* this is the common alternative to Suspense

export default function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}

// The query will update immidiately so the input will display the new value
// However The deffered query will keep its previous value until the data
// has loaded so SearchResults will show the stale results for a bit

//todo Indicate that the content is not fresh
<div style={{
  opacity: query !== deferredQuery ? 0.5 : 1, // if not equal set opacity 0.5
}}>
  <SearchResults query={deferredQuery} />
</div>

//? DEEP DIVE: How deffered value works under the hood? ---------------
// We can think of it as happening in two steps

// 1. First, React re-renders with the new query ab, but with the old
// deffered query still("a"), The deffered query value, which we pass to
// the result list is deffered: it lags behind the query value

// 2. In the background, React tries to re-render both query and defferedQuey
// updated to "ab". If the re-render completes, React will show it on the 
// screen, However, if its suspends (results havent loaded yet) React will
// abandon this rendering attempt, and retry this re-render again after data
// has loaded. The user will keep seeing the old value until data is ready

// The deffered "background" rendering is interruptable. Eg if we type the 
// input again, React will abandon it and restart with the new value.
// React will always use the latest provided value

//? -------------------------------------------------------------------


//todo Deffering re-rendering for a part of UI
// We can also apply useDefferedValue as a performance optimization. It is useful 
// when a part of UI is slow to re-render, there is no easy way to optimize it
// and we want to prevent it from blocking the rest of the UI

// Imagine we have a text field and a component that re-renders on every
// keystroke
function App() {
  const [text, setText] = useState('');
    const deferredText = useDeferredValue(text);

  return (
    <>
      <input className="border-2 border-solid border-cyan-500" value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}
//First, optimize SlowList to skip re-rendering 
//when its props are the same. To do this, wrap it in memo:
const SlowList = memo(function SlowList({ text }) {
  // ...
});

//However, this only helps if the SlowList props are 
//the same as during the previous render. 
//The problem you’re facing now is that it’s slow when they’re different,
// and when you actually need to show different visual output.

//! In this case, useDeferredValue lets you prioritize updating the input 
//! (which must be fast) over updating the result list (which is allowed to be slower):
//!This does not make re-rendering of the SlowList faster
//!However, it tells React that re-rendering the list can be deprioritized so that it 
//!doesn’t block the keystrokes. 

//? DEEP DIVE: How its different from debouncing and throttlig:------------------
// THere are two common techniques we might have used before this scenario

// Debouncing means we wait for user stop typing before updating list
// Throttling means we update the list every ince in a while  (at most one sec)

// While thes techniques are helpful in som cases, useDefferedValue is better
// suited to optimizing rendering because it is deeply integrated with React itself
// and adapts to the user device

// Unlike devouncing or throttling, it doesnt require choosing any fixed delay
// If the user s device is fast the deffered re-render would happen almost immidiately
// and wouldnt be noticable. If the users device is slow, the list would lag behind the input

// Also unlike with debouncing or throttling deffered re-renders dont by useDefferedValue
// are interruptible by default. This means that if React is in the middle of Re-rendering
// of the large list, but the user makes another keystroke, React will abandon thar re-render,
// handle the keystrok and then start rendering in the background again. By contrast 
// debouncing and throttling still produce a janky experience because they are blocking:
// they merly posprone the ,oment wen rendering block they keystroke

//If the work you’re optimizing doesn’t happen during rendering, debouncing and throttling are still useful. 
//For example, they can let you fire fewer network requests. We can also use these techniques together.
//?------------------------------------------------------------------------------