import LoginPage from "../../pages/Login";
import { Navigate, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />, // Redirect to login if route doesn't match
  },
];

export default routes;
