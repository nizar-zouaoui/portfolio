import React from "react";
import { FaHome } from "react-icons/fa";

const HomeIcon = () => {
  return (
    <div className="flex items-center space-x-2">
      <FaHome className="text-2xl" />
      <a href="/" className="text-xl font-bold">
        Home
      </a>
    </div>
  );
};

export default HomeIcon;
