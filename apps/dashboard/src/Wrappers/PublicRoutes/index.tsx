import AboutUs from "../../pages/AboutUs";
import Home from "../../pages/Home";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
];

export default routes;
