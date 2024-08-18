//@ts-nocheck
//* Passing props to a comp
// React components use props to communicate with each other. Every parent
// can pass some info to its child by giving them props.

// props are an information we pass to jsx tag, eg className,src,alt...
// props serve the same role as arguments serve for function
// in fact props is a object that can contain many properties.

// we can specify a default value for a prop:
function Avatar({ person = "jhon", size = 100 }) {
  // ...
}
//we can use spread syntax
function Profile(props: any) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}

//* Passing JSX as children:
// sometimes we need to nest our own component to another custom component
// when we nest component like this:
<Card>
  <Avatar />
</Card>;

// the card component will recieve children prop in this case

function Card({ children }) {
  return <div className="card">{children}</div>;
}

//* How props change over time
// The clock component below recieves two props from its parent color and time.
export default function Clock({ color, time }) {
  return <h1 style={{ color: color }}>{time}</h1>;
}

// This example ilustrate that component may receive different props over time.
// Props are not always static! Here, the time prop changes every second, and color
// changes when user select color. Props reflect a component data at any point in time,
// rather than only in begining (пропс отражают данные компонента в лбюой момент
// времени а не только в начале)

//However props are immutable. When a component needs to change it props (for example
// inin response to a user interaction or new data) it will have to ask its parent
// component to pass it different props - a new object! Its old props will then
// be cast aside, and eventually the JS engine will reclaim the memory taken by them

//! Dont try to change props,
// When we need to respond to the user input (like changeing the selected color),
// we will need to set state.

//TODO RECAP

// To pass props add them to the JSX
// To read props use function Avatar({person, size})
// WE can specify a default value like size = 100 which is for missing props
// We can forward all props with {...props} JSX spread
// Nested JSX like <Card><Avatar /></Card> will appear as Card component’s children prop.
// Props are read-only snapshots in time: every render receives a new version of props
// We can change props, when we need interactivity we can set state
