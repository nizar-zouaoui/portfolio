import actsRoutes, { actsLinks } from "pages/Acts";
import categoryRoutes, { categoriesLinks } from "pages/Categories";
import marketingTargetRoutes, { marketingLinks } from "pages/MarketingTargets";
import patientRoutes, { patientsLinks } from "pages/Patients";
import { Navigate, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/marketing-targets",
    children: marketingTargetRoutes,
  },

  {
    path: "/patients",
    children: patientRoutes,
  },
  {
    path: "/categories",
    children: categoryRoutes,
  },
  {
    path: "/acts",
    children: actsRoutes,
  },
  {
    path: "*",
    element: <Navigate to="/" />, // Redirect to login if route doesn't match
  },
];

export default routes;

export const privateLinks = [
  ...marketingLinks,
  ...categoriesLinks,
  ...patientsLinks,
  ...actsLinks,
] as const;
