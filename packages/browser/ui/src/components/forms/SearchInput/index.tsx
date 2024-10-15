import React from "react";
import { FiSearch } from "react-icons/fi";

interface ISearchInputProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  className?: string;
}

const SearchInput: React.FC<ISearchInputProps> = ({
  searchTerm,
  setSearchTerm,
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
      />
      <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
    </div>
  );
};

export default SearchInput;
