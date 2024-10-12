import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";

const HomeIcon = () => {
  return (
    <div className="flex items-center space-x-2">
      <FaHome className="text-2xl" />
      <Link href="/" className="text-xl font-bold">
        Home
      </Link>
    </div>
  );
};

export default HomeIcon;
