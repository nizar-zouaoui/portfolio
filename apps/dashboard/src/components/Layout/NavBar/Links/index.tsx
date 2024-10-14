import React from "react";
import { Link } from "react-router-dom";
export interface LinkProp {
  path: string;
  pageName: string;
}

const Links: React.FC<{ links: LinkProp[] }> = ({ links }) => {
  return (
    <>
      {links.map(({ pageName, path }) => (
        <Link
          key={`${path}-${pageName}`}
          to={path}
          className="text-lg hover:text-gray-400"
        >
          {pageName}
        </Link>
      ))}
    </>
  );
};

export default Links;
