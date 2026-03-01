// Loader.tsx
import React from "react";
import Icons from "../Icons";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Icons.LoadingSpinner className="animate-spin text-4xl text-gray-600 dark:text-gray-300" />
      <h1 className="text-xl text-gray-600 dark:text-gray-300 ml-2">Loading</h1>
    </div>
  );
};

export default Loader;
``;
