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
    <div className="flex justify-between p-2">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={!hasPreviousPage}
        className="px-4 py-2 border rounded-md text-gray-500 disabled:opacity-50"
      >
        Previous
      </button>
      <span>
        {currentPage || 1} / {totalPages || 1}
      </span>
      <button
        onClick={() => handlePageChange(page + 1)}
        className="px-4 py-2 border rounded-md text-gray-500"
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default TableFooter;
