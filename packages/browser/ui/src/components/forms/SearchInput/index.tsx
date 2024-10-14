import React from "react";
import { FiSearch } from "react-icons/fi";
interface ISearchInputProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  className: string;
}

const SearchInput: React.FC<ISearchInputProps> = ({
  searchTerm,
  setSearchTerm,
  className,
}) => {
  return (
    <div className={className}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 pr-10 border rounded-md"
      />
      <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchInput;
