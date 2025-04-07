import Home from "../screens/Home";

type Category = "popular" | "coming-soon" | "now-playing";

const createRoute = (category: Category) => [
  {
    path: `${category}`,
    element: <Home />,
  },
  {
    path: `${category}/:movieId`,
    element: <Home />,
  },
];

const routesConfig = [
  {
    path: "/",
    element: <Home />,
  },
  ...createRoute("popular"),
  ...createRoute("coming-soon"),
  ...createRoute("now-playing"),
];

export default routesConfig;
