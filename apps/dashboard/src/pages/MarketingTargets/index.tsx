import { RouteObject } from "react-router-dom";
import MarketingTargetsList from "./MarketingTargetsList";

const routes: RouteObject[] = [
  {
    index: true,
    element: <MarketingTargetsList />,
  },
];
export default routes;
