import React from "react";
export interface LinkProp {
  path: string;
  pageName: string;
}

const Links: React.FC<{ links: LinkProp[] }> = ({ links }) => {
  return (
    <>
      {links.map(({ pageName, path }) => (
        <a
          key={`${path}-${pageName}`}
          href={path}
          className="text-lg hover:text-gray-400"
        >
          {pageName}
        </a>
      ))}
    </>
  );
};

export default Links;
