import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  console.log(currentPath === "/" && "underline");
  return (
    <div className="bg-gray-800 w-64 h-full flex flex-col">
      <div className="flex items-center justify-start ml-4 h-16 border-b border-gray-700">
        <h1 className="text-white text-2xl">Dashboard</h1>
      </div>
      <div className="pl-4 flex-grow">
        <ul className="flex flex-col space-y-2">
          <li className={`text-white text-lg p-2`}>
            <Link className={currentPath === "/" ? "underline" : ""} to="/">
              Home
            </Link>
          </li>
          <li className={`text-white text-lg p-2`}>
            <Link
              className={
                currentPath === "/marketing-targets" ? "underline" : ""
              }
              to="/marketing-targets"
            >
              Marketing Targets
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
