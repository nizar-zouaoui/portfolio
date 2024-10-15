import React from "react";

interface ITableFooterProps {
  currentPage: number;
  totalPages: number;
  page: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  handlePageChange: (page: number) => void;
}

const TableFooter: React.FC<ITableFooterProps> = ({
  handlePageChange,
  page,
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
}) => {
  return (
    <div className="flex justify-center items-center space-x-4 p-2">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={!hasPreviousPage}
        className="px-4 py-2 border rounded-md text-gray-500 dark:text-gray-300 border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="text-gray-600 dark:text-gray-400">
        {currentPage || 1} / {totalPages || 1}
      </span>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNextPage}
        className="px-4 py-2 border rounded-md text-gray-500 dark:text-gray-300 border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default TableFooter;
