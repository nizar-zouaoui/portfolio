import { BiSolidEdit } from "react-icons/bi";
import { RouteObject } from "react-router-dom";
import Api from "sdks";
import ActsList from "./ActsList";
import AddAct from "./AddAct";
import EditAct from "./EditAct";

const fetchAct = async (id: string) =>
  Api.medicalHistoriesSDK.getActById({
    params: { id },
  });

const routes: RouteObject[] = [
  {
    index: true,
    element: <ActsList />,
  },
  {
    path: "add",
    element: <AddAct />,
  },
  {
    path: "edit/:id",
    element: <EditAct />,
    loader: async ({ params }) => {
      const { id } = params;
      if (!id) throw new Error("Id is required for this route");
      const act = await fetchAct(id);
      return { act };
    },
    errorElement: <div>Failed to load data</div>,
  },
];
export default routes;

export const actsLinks = [
  {
    main: true,
    pageName: "Acts",
    path: "/acts",
    icon: <BiSolidEdit />,
  },
  {
    main: false,
    pageName: "Create New Act",
    path: "/acts/add",
    icon: <BiSolidEdit />,
  },

  {
    main: false,
    pageName: "Edit Act",
    path: "/acts/edit/:id",
    icon: <BiSolidEdit />,
  },
] as const;
