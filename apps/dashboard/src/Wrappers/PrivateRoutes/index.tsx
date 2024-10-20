import categoryRoutes, { categoriesLinks } from "pages/Categories";
import marketingTargetRoutes, { marketingLinks } from "pages/MarketingTargets";
import { Navigate, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/marketing-targets",
    children: marketingTargetRoutes,
  },
  {
    path: "/categories",
    children: categoryRoutes,
  },
  {
    path: "*",
    element: <Navigate to="/" />, // Redirect to login if route doesn't match
  },
];

export default routes;

export const privateLinks = [...marketingLinks, ...categoriesLinks] as const;
