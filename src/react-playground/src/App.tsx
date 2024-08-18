import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <main className="w-screen h-screen p-8">
      <h2>React Playground</h2>
      <div className="flex">
        <Link to="/under-the-hood">React Under the hood</Link>
      </div>
    </main>
  );
}

export default App;
