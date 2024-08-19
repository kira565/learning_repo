import { useRef, useState } from "react";

export const RefList: React.FC = () => {
  const itemsRef = useRef<null | Map<string, HTMLElement>>(null);
  const [catList, setCatList] = useState(setupCatList);

  function scrollToCat(cat: string) {
    const map = getMap();
    const catNode = map.get(cat);
    catNode?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <div>
      <h1>Cat Refs List</h1>
      <nav>
        <button onClick={() => scrollToCat(catList[0])}>Tom</button>
        <button onClick={() => scrollToCat(catList[5])}>Maru</button>
        <button onClick={() => scrollToCat(catList[9])}>Jellylorun</button>
      </nav>
      <div>
        <div className="overflow-hidden whitespace-nowrap">
          {catList.map((cat) => (
            <div
              className="inline-block"
              key={cat}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(cat, node);
                }

                return () => {
                  // cleanup function
                  map.delete(cat);
                };
              }}
            >
              <img className="" src={cat}></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push("https://loremflickr.com/320/240/cat?lock=" + i);
  }

  return catList;
}
