import generateLinksTree from "../../../helpers/generateLinksTree";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import renderTree from "./SideBarLinkTrees";
import { LinkProp } from "../NavBarLinks";

const useSideBar = ({ links }: { links: LinkProp[] }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const treeLinks = useMemo(() => generateLinksTree(links), [links]);
  const RenderedTree = useMemo(
    () => renderTree(treeLinks, currentPath),
    [treeLinks, currentPath]
  );

  return { RenderedTree };
};

export default useSideBar;
