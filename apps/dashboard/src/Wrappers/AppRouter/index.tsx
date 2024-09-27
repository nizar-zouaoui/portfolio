import useAuth from "../../contexts/AuthContext/useAuth";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import authRoutes from "../AuthRoutes";
import publicRoutes from "../PublicRoutes";
import privateRoutes from "../PrivateRoutes";

const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  const nonPublicRoutes = isAuthenticated
    ? [
        ...privateRoutes,
        {
          path: "*",
          element: <Navigate to="/" />, // Redirect to login if route doesn't match
        },
      ]
    : [
        ...authRoutes,
        {
          path: "*",
          element: <Navigate to="/login" />, // Redirect to login if route doesn't match
        },
      ];
  const routes = [...publicRoutes, ...nonPublicRoutes];
  console.log("routes");
  console.log(isAuthenticated);
  console.log(routes);
  console.log("routes");
  const router = createBrowserRouter(routes, {
    basename: "/dashboard",
  });
  return <RouterProvider router={router} />;
};

export default AppRouter;
