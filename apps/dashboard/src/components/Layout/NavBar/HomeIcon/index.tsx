import Icons from "@nizar-repo/ui/src/components/Icons";
import React from "react";
import { Link } from "react-router-dom";

const HomeIcon: React.FC = () => {
  return (
    <div className="flex text-gray-800 dark:text-gray-100 items-center space-x-2">
      <Icons.Home className="text-2xl" />
      <Link
        to="/"
        className="text-xl font-bold hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        Home
      </Link>
    </div>
  );
};

export default HomeIcon;
