import { Navigate, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "*",
    element: <Navigate to="/" />, // Redirect to login if route doesn't match
  },
];

export default routes;
