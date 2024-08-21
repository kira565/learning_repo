// * Passing data deeply with Context

// Usuallt we will pass information from a parent component to child component via props
// But passing props can become verbose and inconvinient if we have to pass them through 
//many components in the middle, or if many components in our app need the same information,
//* Context lets the parent component make some information available to any component
//* in the tree below it no matter how deep - without passing it explicity through props

// ! The problem with passing props calls props drilling,
// props is a great way to explicity pipe data through UI tree to the component 
// that use it. But passing props can become verbose(многословный) and inconvinient
// when we need to pass some props deeply through the tree, or if many components need the same prop
// The nearest common ancestor could be far removed from the components that need data.

//todo Context: alternative to passing props
//Context lets parent component provide data to the entire tree below it. There are many uses for context.

// todo Usage:
// 1. create a context (we can call it LevelContext, since for the heading level)
// 2. use that context from the component that needs the data
// 3. Provide that context from the component that specifies the data

// Context lets a parent - even a distant one! - provide some data to the entire tree inside of it.

import { createContext } from 'react';
//!create a context
export const LevelContext = createContext(1);

//!Import the useContext Hook from React and your context:
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

const level = useContext(LevelContext);

// useContext is a Hook, Just like useState and useReducer, we can only call a Hook immidiately inside a React component
// * useContext tells react that the Heading component wants to read the LevelContext

// now we dont need a level props for our component, so we dont need to pass it.

//!provide the context
//! wrap the section of components that need the data with a context provider
<LevelContext.Provider value={level}>
    {children}
</LevelContext.Provider>

// This tells React, if any component inside the <Provider asks for LevelContext, give them level.
//! The component will use the value of the nearest <LevelContext.Provider> in the UI tree above it.

//todo Using and providing context from the same component.

// Since context let us read information from a component above, each section could read the level
// from the section above, and pass level+1 down automatically.
export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}

//! So there are many nested context, each takes value from above increment it and pass to the next section

// Now both Hading and Section read the LevelContext to figure out how deep they are. And the Section wraps its
// children into the LevelContext to specify that anything inside of its is at "deeper" level.

//! NOTE: This example uses heading levels because they show visually how nested components can
//! override context. But context is useful for many other use casee too. We can pass down any information needed
//! by the entire subtree: the current color theme, currently logged in user and so on.

//todo Context passes though intermidiate components
// We can insert as many components as we like between provider and consumer. This includes both built-in
// components like <div> and components we might build ourselves.

// In this example the same Post component (with dashed border) is rendered at two different nesting levels.
// Notice, that the <Heading> inside of it gets its level automatically from the closest <Section>
import Heading from './Heading.js';
import Section from './Section.js';

export default function ProfilePage() {
  return (
    <Section>
      <Heading>My Profile</Heading>
      <Post
        title="Hello traveller!"
        body="Read about my adventures."
      />
      <AllPosts />
    </Section>
  );
}

function AllPosts() {
  return (
    <Section>
      <Heading>Posts</Heading>
      <RecentPosts />
    </Section>
  );
}

function RecentPosts() {
  return (
    <Section>
      <Heading>Recent Posts</Heading>
      <Post
        title="Flavors of Lisbon"
        body="...those pastéis de nata!"
      />
      <Post
        title="Buenos Aires in the rhythm of tango"
        body="I loved it!"
      />
    </Section>
  );
}

function Post({ title, body }) {
  return (
    <Section isFancy={true}>
      <Heading>
        {title}
      </Heading>
      <p><i>{body}</i></p>
    </Section>
  );
}

// We didnt do any special for this to work. A section specifies the context for the tree inside it,
// so we can insert a <Heading/> anywhere and it will have the correct size.

//! Context lets us write components that "adapt to their surroundings" and display
//! themselves differently depending on where (or in other words, in which context) they are being renderd

// How context works might remind about CSS property inheritance. Similarly at React, the only way to
// override some context coming from above is to wrap children into a content provider with a different value

//! React context done override each other, Each context that we make with createContext() is completely
//! separate from other ones
// and ties(связывает) together components using and providing the particular context. One component may use
// or provide many different contexts without a problem.

//! Before to use the context

// Context is very tempting(заманчив) to use! However, this also means its too easy to overuse it
//! Just because we need  to pass some props several levels deep doesnt mean we should put that information
//! into context.

// There are a few alternatives we should consider before using context:
//* 1 Start by passing props
// If components are not trivial its not usual to pass a dozen of props down though a dozen components.
// It may feel like a slog(может показаться изнуряющим) but it makes it very clean which components use which data
// The person maintaining our code will be glad we made the data flow explicit with props.
//* 2 Extract components and pass JSX as children to them
// If we pass some data though many layers of intermediate components that dont use that data
// and only pass it further down), this often means that we forgot to extract some components along the way.
// (часто значит что мы забыли по пути извлечь некоторые компоненты). For example, maybe we pass data props
// like posts to visual components that dont use them directly. Like <Layout posts={posts}. Instead make
// Layout take children as prop and render <Layout><Posts posts={posts} /> </layout>

// todo Use cases for Context
// * 1. Theming
// change apperance of components eg dark mode
// * 2 Current account:
// Many components might need to know the currently logged in user. Putting it in context makes it convinient to read
// it anyways in the tree. Som apps also let us operate multiple accounts at the same time (eg to leave comment as 
// different user). In those cases it can be convinient to wrap a part of the UI into nested provider with a
// different current account value
// * 3  Routing 
// Most routing solutions use context internally(внутри) to hold the current route. This is how every link
// "knows" wherther its active or not. If we build our own router, we might want to do it too.
// * 4 Managing state
// As our  app grows we might end up with a lot of state closer to the top of our app. Many distant
// components below may want to change it It is common to use //? a reducer together with context
// to manage complex state and pass it down to distant components without too much hassle(хлопоты)

//! Context is not limited to static values. If we pass a different value on the next render, React will update
//! all the components reading it below! This is why context is often used in a combination with state.

//* In general if some information is needed by distant components in different parts of tree, its a good indication
//* that context will help us

//todo RECAP 

// Context lets component provide some information to the entire tree velow it
// To pass context:
// 1.Create and export it with export const myContext = createContext(defaultValue)
// 2.Pass it to the useContext(MyContext) Hook to read it in any child component, no matter how deep.
// 3. Wrap children into <MyContext.Provider value={...}> to provide it from a parent.
// Context passes through any components in the middle.
// Context lets you write components that “adapt to their surroundings”.
// Before you use context, try passing props or passing JSX as children.
