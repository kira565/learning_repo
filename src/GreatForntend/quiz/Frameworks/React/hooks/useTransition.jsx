
//* useTransition is a React hook that lets update the state without blocking a UI

//Call useTransition at the top level of your component to mark some state updates as Transitions.
import { useTransition } from 'react';

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  // ...
  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
}
//The startTransition function returned by useTransition lets you mark a state update as a Transition.

//todo USAGE

// * Marking a state update as non-blocking Transition
// The isPending flag  tells us whether there is a pending Transition.
// The startTransition function that lets you mark a state update as a Transition.

// transitions let us keep user interface updates responsive even on slow devices

// With a transition UI stays responsive in the middle of re-render For example,
// if user clicks a tab but then change their mind and click another tab, they can do that
// without waiting for the first re-render to finish

// *Example 1 of 2: Updating the current tab in a Transition 
//In this example, the “Posts” tab is artificially slowed down so that 
//it takes at least a second to render.
//Click “Posts” and then immediately click “Contact”. 
//Notice that this interrupts the slow render of “Posts”. The “Contact” tab shows immediately.
//Because this state update is marked as a Transition, a slow re-render did not freeze the user interface.
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }


  // Transition let us keep the user interface responsive even on slow devices
  // With a Transition UI stays responsive in the middle of the render
  
  // todo Updating a parent component in a Transition

  const TabButton = () => {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>{children}</b>
  }
  return (
    <button onClick={() => {
      startTransition(() => {
        onClick(); //* So we are also able to use this logic inside the cild and work with parent without block
      });
    }}>
      {children}
    </button>
  );
  }
  
  // we can use isPending to show mkore responsive UI while loading

  // todo React SUSPENSE
  // As alternative to transition we can use <Suspense fallback={component} /> component 
  import { Suspense, useState } from 'react';
import TabButton from './TabButton.js';
import AboutTab from './AboutTab.js';
import PostsTab from './PostsTab.js';
import ContactTab from './ContactTab.js';

export default function TabContainer() {
  const [tab, setTab] = useState('about');
  return (
    <Suspense fallback={<h1>🌀 Loading...</h1>}>
      <TabButton
        isActive={tab === 'about'}
        onClick={() => setTab('about')}
      >
        About
      </TabButton>
      <TabButton
        isActive={tab === 'posts'}
        onClick={() => setTab('posts')}
      >
        Posts
      </TabButton>
      <TabButton
        isActive={tab === 'contact'}
        onClick={() => setTab('contact')}
      >
        Contact
      </TabButton>
      <hr />
      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />}
    </Suspense>
  );
}
