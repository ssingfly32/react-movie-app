import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import routeConfig from "./routesConfig";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeConfig,
  },
]);
