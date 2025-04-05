import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "popular/:movieId",
        element: <Home />,
      },
      {
        path: "coming-soon",
        element: <Home />,
      },
      {
        path: "now-playing",
        element: <Home />,
      },
    ],
  },
]);
