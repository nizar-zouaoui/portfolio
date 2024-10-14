import { RouteObject } from "react-router-dom";
import MarketingTargetsList from "./MarketingTargetsList";
import { FaUsers } from "react-icons/fa";
import AddMarketingTarget from "./AddMarketingTarget";

const routes: RouteObject[] = [
  {
    index: true,
    element: <MarketingTargetsList />,
  },
  {
    path: "add",
    element: <AddMarketingTarget />,
  },
];
export default routes;

export const marketingLinks = [
  {
    pageName: "Marketing Targets",
    path: "/marketing-targets",
    icon: <FaUsers />,
  },
  {
    pageName: "Create New Marketing Target",
    path: "/marketing-targets/add",
    icon: <FaUsers />,
  },
] as const;
