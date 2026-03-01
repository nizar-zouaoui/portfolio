import Icons from "@nizar-repo/ui/src/components/Icons";
import AboutUs from "pages/AboutUs";
import Home from "pages/Home";
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
    main: true,
    pageName: "Simple Deliver",
    path: "/",
    icon: <Icons.Home />,
  },
] as const;

export const aboutUsLinks = [
  {
    main: true,
    pageName: "About Us",
    path: "/about-us",
    icon: <Icons.InformationCircle />,
  },
] as const;
export const publicLinks = [...homeLinks, ...aboutUsLinks] as const;
