import { FaUsers } from "react-icons/fa";
import { RouteObject } from "react-router-dom";
import Api from "sdks";
import AddMarketingTarget from "./AddMarketingTarget";
import EditMarketingTarget from "./EditMarketingTarget";
import MarketingTargetsList from "./MarketingTargetsList";

const fetchMarketingTarget = async (id: string) =>
  Api.marketingTargetsSDK.getMarketingTargetDataById({
    params: { id },
  });

const routes: RouteObject[] = [
  {
    index: true,
    element: <MarketingTargetsList />,
  },
  {
    path: "add",
    element: <AddMarketingTarget />,
  },
  {
    path: "edit/:id",
    element: <EditMarketingTarget />,
    loader: async ({ params }) => {
      const { id } = params;
      if (!id) throw new Error("Id is required for this route");
      const marketingTarget = await fetchMarketingTarget(id);
      return { marketingTarget };
    },
    errorElement: <div>Failed to load data</div>,
  },
];
export default routes;

export const marketingLinks = [
  {
    main: true,
    pageName: "Marketing Targets",
    path: "/marketing-targets",
    icon: <FaUsers />,
  },
  {
    main: false,
    pageName: "Create New Marketing Target",
    path: "/marketing-targets/add",
    icon: <FaUsers />,
  },

  {
    main: false,
    pageName: "Edit Marketing Target",
    path: "/marketing-targets/edit/:id",
    icon: <FaUsers />,
  },
] as const;
