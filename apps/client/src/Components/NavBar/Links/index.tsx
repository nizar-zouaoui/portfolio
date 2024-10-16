import Link from "next/link";
import React from "react";
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
          href={path}
          className="text-lg text-white hover:text-gray-400"
        >
          {pageName}
        </Link>
      ))}
    </>
  );
};

export default Links;
