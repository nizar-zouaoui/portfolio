import Layout from "components/Layout";
import useAuth from "contexts/AuthContext/useAuth";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { useMemo } from "react";
import authRoutes from "../AuthRoutes";
import privateRoutes from "../PrivateRoutes";
import publicRoutes from "../PublicRoutes";

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  const routes = useMemo<RouteObject[]>(
    () => [
      {
        path: "/",
        element: <Layout />,
        children: isAuthenticated
          ? [...publicRoutes, ...privateRoutes]
          : [...publicRoutes, ...authRoutes],
      },
    ],
    [isAuthenticated]
  );

  const router = useMemo(
    () =>
      createBrowserRouter(routes, {
        basename: "/dashboard",
      }),
    [routes]
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
