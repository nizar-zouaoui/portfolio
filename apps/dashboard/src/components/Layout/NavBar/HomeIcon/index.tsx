import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeIcon: React.FC = () => {
  return (
    <div className="flex text-white items-center space-x-2">
      <FaHome className="text-2xl" />
      <Link to="/" className="text-xl font-bold">
        Home
      </Link>
    </div>
  );
};

export default HomeIcon;
