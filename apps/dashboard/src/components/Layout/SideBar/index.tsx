import React from "react";
import { LinkProp } from "../NavBarLinks";
import useSideBar from "./useSideBar";

const SideBar: React.FC<{ links: LinkProp[] }> = ({ links }) => {
  const { RenderedTree } = useSideBar({ links });
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
