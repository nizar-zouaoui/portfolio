// create a rafce component Loader with a spinner icon using react-icons/fa and tailwindcss classes
// import the required modules
import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <FaSpinner className="animate-spin text-4xl text-gray-600" />
      <h1 className="text-xl text-gray-600 ml-2">Loading</h1>
    </div>
  );
};

export default Loader;
