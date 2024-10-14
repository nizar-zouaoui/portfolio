import { Navigate, RouteObject } from "react-router-dom";
import marketingTargetRoutes, {
  marketingLinks,
} from "../../pages/MarketingTargets";

const routes: RouteObject[] = [
  {
    path: "/marketing-targets",
    children: marketingTargetRoutes,
  },
  {
    path: "*",
    element: <Navigate to="/" />, // Redirect to login if route doesn't match
  },
];

export default routes;

export const privateLinks = [...marketingLinks] as const;
