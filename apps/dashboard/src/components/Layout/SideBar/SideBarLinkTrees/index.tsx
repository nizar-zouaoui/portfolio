import { LinksTree } from "helpers/generateLinksTree";
import { Link } from "react-router-dom";

const renderTree = (nodes: LinksTree[], currentPath: string) => {
  return nodes.map(({ path, pageName, icon, children }) => (
    <li key={path} className="text-white text-lg py-2 pl-2">
      <Link
        className={`${currentPath === path ? "underline" : ""} flex items-start space-x-2`}
        to={path}
        title={pageName}
      >
        {icon}
        <span>
          {pageName.length > 17 ? `${pageName.slice(0, 15)}...` : pageName}
        </span>
      </Link>
      {/* Render children if there are any */}
      {children.length > 0 && (
        <ul className="ml-4">
          {renderTree(children, currentPath)}{" "}
          {/* Recursively render child links */}
        </ul>
      )}
    </li>
  ));
};

export default renderTree;
