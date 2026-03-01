import Link from "next/link";
import React from "react";
export interface LinkProp {
  path: string;
  pageName: string;
}

const Links: React.FC<{ links: LinkProp[] }> = React.memo(({ links }) => {
  return (
    <>
      {links.map(({ pageName, path }) => (
        <Link
          key={`${path}-${pageName}`}
          href={path}
          className="text-lg text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          {pageName}
        </Link>
      ))}
    </>
  );
});

Links.displayName = "Links";

export default Links;
