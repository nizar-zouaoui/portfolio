import { BiSolidCategory } from "react-icons/bi";

import { RouteObject } from "react-router-dom";
import Api from "sdks";
import AddCategory from "./AddCategory";
import CategoriesList from "./CategoriesList";
import EditCategory from "./EditCategory";

const fetchCategory = async (id: string) =>
  Api.categoriesSDK.getCategoryById({
    params: { id },
  });

const routes: RouteObject[] = [
  {
    index: true,
    element: <CategoriesList />,
  },
  {
    path: "add",
    element: <AddCategory />,
  },
  {
    path: "edit/:id",
    element: <EditCategory />,
    loader: async ({ params }) => {
      const { id } = params;
      if (!id) throw new Error("Id is required for this route");
      const category = await fetchCategory(id);
      return { category };
    },
    errorElement: <div>Failed to load data</div>,
  },
];
export default routes;

export const categoriesLinks = [
  {
    main: true,
    pageName: "Categroies",
    path: "/categories",
    icon: <BiSolidCategory />,
  },
  {
    main: false,
    pageName: "Create New Category",
    path: "/categories/add",
    icon: <BiSolidCategory />,
  },

  {
    main: false,
    pageName: "Edit Category",
    path: "/categories/edit/:id",
    icon: <BiSolidCategory />,
  },
] as const;
