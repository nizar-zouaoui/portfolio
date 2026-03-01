import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LinkProp } from "../NavBarLinks";

const SideBar: React.FC<{ links: LinkProp[] }> = React.memo(({ links }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="unified-sidebar w-64 min-h-screen">
      <div className="flex items-center justify-start h-16 px-6 border-b border-neutral-200 dark:border-neutral-600">
        <h1 className="text-neutral-900 dark:text-white text-xl font-bold">
          Dashboard
        </h1>
      </div>
      <div className="p-4 flex-grow">
        <nav className="space-y-2">
          {links.map(({ pageName, path, icon }) => {
            const isActive = currentPath === path;
            return (
              <Link
                key={path}
                to={path}
                title={pageName}
                className={`
                  group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-primary-500 text-white shadow-md"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white"
                  }
                `}
              >
                <span
                  className={`flex-shrink-0 ${isActive ? "text-white" : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300"}`}
                >
                  {icon}
                </span>
                <span className="truncate">
                  {pageName.length > 17
                    ? `${pageName.slice(0, 15)}...`
                    : pageName}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
