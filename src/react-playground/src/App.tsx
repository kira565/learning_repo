import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <main className="w-screen h-screen p-8">
      <h2>React Playground</h2>
      <div className="flex flex-col gap-2">
        <div>
          <Link to="/under-the-hood">React Under the hood</Link>
        </div>
        <div>
          <Link to="/refs">React Refs</Link>
        </div>
        <div>
          <Link to="/interactivity">Adding Interactivity</Link>
        </div>
        <div>
          <Link to="/performance">Performance</Link>
        </div>
        <div>
          <Link to="/hooks">Hooks</Link>
        </div>
        <div>
          <Link to="/state-management">State management</Link>
        </div>
      </div>
    </main>
  );
}

export default App;
