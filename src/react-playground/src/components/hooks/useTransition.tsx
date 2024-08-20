import {
  ReactElement,
  ReactNode,
  Suspense,
  useState,
  useTransition,
} from "react";

export const UseTransitionExample: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState("about");

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab); //* We see that we are able to choose different tab even while posts is being clicked
    });
  }
  return (
    <>
      <h1>Use Transition Example</h1>
      <TabButton isActive={tab === "about"} onClick={() => selectTab("about")}>
        About
      </TabButton>
      <TabButton isActive={tab === "posts"} onClick={() => selectTab("posts")}>
        Posts (slow)
      </TabButton>
      <TabButton
        isActive={tab === "contact"}
        onClick={() => selectTab("contact")}
      >
        Contacts
      </TabButton>
      <hr />
      {tab === "about" && <AboutTab />}
      {tab === "posts" && <PostTab />}
      {tab === "contact" && <ContactTab />}
    </>
  );
};

export const UseTransitionWithSuspenseExample: React.FC = () => {
  const [tab, setTab] = useState("about");

  function selectTab(nextTab: string) {
    setTab(nextTab);
  }
  return (
    <Suspense fallback={<h1>🌀 Loading...</h1>}>
      <h1>Use Transition Example</h1>
      <TabButton isActive={tab === "about"} onClick={() => selectTab("about")}>
        About
      </TabButton>
      <TabButton isActive={tab === "posts"} onClick={() => selectTab("posts")}>
        Posts (slow)
      </TabButton>
      <TabButton
        isActive={tab === "contact"}
        onClick={() => selectTab("contact")}
      >
        Contacts
      </TabButton>
      <hr />
      {tab === "about" && <AboutTab />}
      {tab === "posts" && <PostsSuspense />}
      {tab === "contact" && <ContactTab />}
    </Suspense>
  );
};

const PostsSuspense = () => {
  const posts = use(fetchData("/posts"));
  return (
    <ul className="items">
      {posts.map((post: any) => (
        <PostSuspense key={post.id} title={post.title} />
      ))}
    </ul>
  );
};
function PostSuspense({ title }: any) {
  return <li className="item">{title}</li>;
}

const PostTab: React.FC = () => {
  let items = [];
  for (let i = 0; i < 500; i++) {
    items.push(<SlowPost key={i} index={i} />);
  }

  return <ul className="items">{items}</ul>;
};

const SlowPost: React.FC<{ index: number }> = ({ index }) => {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li className="item">Post #{index + 1}</li>;
};

function AboutTab() {
  return <p>Welcome to my profile!</p>;
}
function ContactTab() {
  return <p>Welcome to my contacts!</p>;
}

const TabButton: React.FC<{
  children: ReactNode[] | string;
  isActive: boolean;
  onClick: () => void;
}> = ({ children, isActive, onClick }) => {
  if (isActive) {
    return <b>{children}</b>;
  }
  return (
    <button
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
};

//
let cache = new Map();

export function fetchData(url: string) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url: string) {
  if (url.startsWith("/posts")) {
    return await getPosts();
  } else {
    throw Error("Not implemented");
  }
}

async function getPosts() {
  // Add a fake delay to make waiting noticeable.
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  let posts = [];
  for (let i = 0; i < 500; i++) {
    posts.push({
      id: i,
      title: "Post #" + (i + 1),
    });
  }
  return posts;
}

function use(promise: any) {
  if (promise.status === "fulfilled") {
    return promise.value;
  } else if (promise.status === "rejected") {
    throw promise.reason;
  } else if (promise.status === "pending") {
    throw promise;
  } else {
    promise.status = "pending";
    promise.then(
      (result: any) => {
        promise.status = "fulfilled";
        promise.value = result;
      },
      (reason: any) => {
        promise.status = "rejected";
        promise.reason = reason;
      }
    );
    throw promise;
  }
}
