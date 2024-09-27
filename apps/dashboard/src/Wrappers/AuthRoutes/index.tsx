import LoginPage from "../../pages/Login";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "login",
    element: <LoginPage />,
  },
];

export default routes;
