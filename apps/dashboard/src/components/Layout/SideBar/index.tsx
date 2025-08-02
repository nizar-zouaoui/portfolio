import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LinkProp } from "../NavBarLinks";

const SideBar: React.FC<{ links: LinkProp[] }> = React.memo(({ links }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-gray-800 w-64 h-full flex flex-col">
      <div className="flex items-center justify-start h-16 border-b border-gray-700">
        <h1 className="text-white text-2xl ml-4">Dashboard</h1>
      </div>
      <div className="pl-4 mt-4 flex-grow">
        <ul className="flex flex-col space-y-2">
          {links.map(({ pageName, path, icon }) => (
            <li key={path} className="text-white text-lg py-2 pl-2">
              <Link
                className={`${currentPath === path ? "underline" : ""} flex items-center space-x-2`}
                to={path}
                title={pageName}
              >
                {icon}
                <span>
                  {pageName.length > 17
                    ? `${pageName.slice(0, 15)}...`
                    : pageName}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
