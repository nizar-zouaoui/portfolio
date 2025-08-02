import React, { useCallback } from "react";
import { FiSearch } from "react-icons/fi";

interface ISearchInputProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  className?: string;
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
}

const SearchInput: React.FC<ISearchInputProps> = ({
  searchTerm,
  setSearchTerm,
  className = "",
  maxLength = 255,
  placeholder = "Search...",
  disabled = false,
}) => {
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // Basic sanitization - remove potentially dangerous characters
      const sanitizedValue = value.replace(/[<>\"'&]/g, "");
      setSearchTerm(sanitizedValue);
    },
    [setSearchTerm]
  );

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        maxLength={maxLength}
        disabled={disabled}
        className="w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Search input"
        role="searchbox"
      />
      <FiSearch
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
};

export default SearchInput;
