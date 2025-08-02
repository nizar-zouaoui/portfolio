import React from "react";
import { Link } from "react-router-dom";
export interface LinkProp {
  path: string;
  pageName: string;
  icon?: React.ReactNode;
}

const NavBarLinks: React.FC<{ links: LinkProp[] }> = React.memo(({ links }) => {
  return (
    <>
      {links.map(({ pageName, path }) => (
        <Link
          key={`${path}-${pageName}`}
          to={path}
          className="text-lg text-white hover:text-gray-400"
        >
          {pageName}
        </Link>
      ))}
    </>
  );
});

NavBarLinks.displayName = "NavBarLinks";

export default NavBarLinks;
