import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import ComingSoon from "./routes/ComingSoon";

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
        element: <ComingSoon />,
      },
      {
        path: "now-playing",
        element: <Home />,
      },
    ],
  },
]);
