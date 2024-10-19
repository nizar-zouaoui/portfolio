import AboutUs from "pages/AboutUs";
import Home from "pages/Home";
import { FaHome, FaQuestionCircle } from "react-icons/fa";
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

export const homeLinks = [
  {
    pageName: "Simple Deliver",
    path: "/",
    icon: <FaHome />,
  },
] as const;

export const aboutUsLinks = [
  {
    pageName: "About Us",
    path: "/about-us",
    icon: <FaQuestionCircle />,
  },
] as const;
export const publicLinks = [...homeLinks, ...aboutUsLinks] as const;
