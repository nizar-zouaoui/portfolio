import actsRoutes, { actsLinks } from "pages/Acts";
import patientRoutes, { patientsLinks } from "pages/Patients";
import { Navigate, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/patients",
    children: patientRoutes,
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

export const privateLinks = [...patientsLinks, ...actsLinks] as const;
