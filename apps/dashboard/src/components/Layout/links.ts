import { authLinks } from "../../Wrappers/AuthRoutes";
import { privateLinks } from "../../Wrappers/PrivateRoutes";
import { homeLinks, publicLinks } from "../../Wrappers/PublicRoutes";

export const sideBarLinks = [...homeLinks, ...privateLinks];
export const links = [...publicLinks, ...privateLinks, ...authLinks] as const;
