// * Updating array in state

// Arrays are mutable in JS but in React we should treat them as immutable, when 
// storing in the state, just like with object we need to create new one
// or make a copy of existing one

//! avoid mutation methods: push, unshifr, pop, shift, splice, arr[i], reverse,sort
//* allowed (new arr) concat, [...arr], filter, slice, map
//? with Immer its possible use all
const [artists, setArtists] = useState([]);

//todo Adding
setArtists( // Replace the state
  [ // with a new array
    ...artists, // that contains all the old items
    { id: nextId++, name: name } // and one new item at the end
  ]
);
//todo Removing
setArtists(
    artists.filter(a => a.id !== artist.id)
  );
// todo Transforming
function handleClick() {
    const nextShapes = shapes.map(shape => {
      if (shape.type === 'square') {
        // No change
        return shape;
      } else {
        // Return a new circle 50px below
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    // Re-render with the new array
    setShapes(nextShapes);
  }
  //todo Replacing
  function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return c + 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setCounters(nextCounters);
  }
  // todo Inserting
  function handleClick() {
    const insertAt = 1; // Could be any index
    const nextArtists = [
      // Items before the insertion point:
      ...artists.slice(0, insertAt),
      // New item:
      { id: nextId++, name: name },
      // Items after the insertion point:
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }

  //todo Updating Objects inside arrays
  const initialList = [
    { id: 0, title: 'Big Bellies', seen: false },
    { id: 1, title: 'Lunar Landscape', seen: false },
    { id: 2, title: 'Terracotta Army', seen: true },
  ];
  const [myList, setMyList] = useState(initialList);

  setMyList(myList.map(artwork => {
    if (artwork.id === artworkId) {
      // Create a *new* object with changes
      return { ...artwork, seen: nextSeen };
    } else {
      // No changes
      return artwork;
    }
  }));
  

  // todo RECAP
  // 1.You can put arrays into state, but you can’t change them.
// 2.Instead of mutating an array, create a new version of it, and update the state to it.
// 3. You can use the [...arr, newItem] array spread syntax to create arrays with new items.
// 4. You can use filter() and map() to create new arrays with filtered or transformed items.
// 5. You can use Immer to keep your code concise.
