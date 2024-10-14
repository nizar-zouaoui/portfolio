import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { LinkProp } from "../NavBarLinks";
import generateLinksTree from "../../../helpers/generateLinksTree";
import renderTree from "./SideBarLinkTrees";

const SideBar: React.FC<{ links: LinkProp[] }> = ({ links }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const treeLinks = useMemo(() => generateLinksTree(links), [links]);
  console.log(treeLinks);
  const RenderedTree = useMemo(
    () => renderTree(treeLinks, currentPath),
    [treeLinks, currentPath]
  );
  return (
    <div className="bg-gray-800 w-64 h-full flex flex-col">
      <div className="flex items-center justify-start h-16 border-b border-gray-700">
        <h1 className="text-white text-2xl ml-4">Dashboard</h1>
      </div>
      <div className="pl-4 mt-4 flex-grow">
        <ul className="flex flex-col space-y-2">{RenderedTree}</ul>
      </div>
    </div>
  );
};

export default SideBar;
