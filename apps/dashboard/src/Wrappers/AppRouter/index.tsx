import Layout from "components/Layout";
import useAuth from "contexts/AuthContext/useAuth";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import authRoutes from "../AuthRoutes";
import privateRoutes from "../PrivateRoutes";
import publicRoutes from "../PublicRoutes";

const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Layout />,
      children: isAuthenticated
        ? [...publicRoutes, ...privateRoutes]
        : [...publicRoutes, ...authRoutes],
    },
  ];
  const router = createBrowserRouter(routes, {
    basename: "/dashboard",
  });
  return <RouterProvider router={router} />;
};

export default AppRouter;
