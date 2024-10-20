import { authLinks } from "Wrappers/AuthRoutes";
import { privateLinks } from "Wrappers/PrivateRoutes";
import { homeLinks, publicLinks } from "Wrappers/PublicRoutes";

const filteredLinks = [...homeLinks, ...privateLinks].filter(
  ({ main }) => main === true
);
export const sideBarLinks = [...filteredLinks];
export const links = [...publicLinks, ...privateLinks, ...authLinks] as const;
