import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UnderTheHood } from "./components/UnderTheHoodPractice/UnderTheHood.tsx";
import { ReactRefs } from "./components/refs/Root.tsx";
import { Interactivity } from "./components/Interactivity/Root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/under-the-hood",
    element: <UnderTheHood />,
  },
  {
    path: "/refs",
    element: <ReactRefs />,
  },
  {
    path: "/interactivity",
    element: <Interactivity />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
