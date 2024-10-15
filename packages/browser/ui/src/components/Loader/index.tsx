// Loader.tsx
import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <FaSpinner className="animate-spin text-4xl text-gray-600 dark:text-gray-300" />
      <h1 className="text-xl text-gray-600 dark:text-gray-300 ml-2">Loading</h1>
    </div>
  );
};

export default Loader;
``;
