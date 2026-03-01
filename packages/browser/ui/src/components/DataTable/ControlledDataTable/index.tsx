import {
  PaginatedResult,
  PaginationQuery,
} from "@nizar-repo/shared-types/PaginationTypes";
import React from "react";
import SearchInput from "../../forms/SearchInput";
import TableBody from "../Components/TableBody";
import TableFooter from "../Components/TableFooter";
import TableHeader from "../Components/TableHeader";
import { DataTableColumn } from "../DataTableColumnInterface";
import useControlledDataTable from "./useControlledDataTable";

interface IControlledDataTableProps<T> {
  data?: PaginatedResult<T>;
  isLoading: boolean;
  columns: DataTableColumn<PaginatedResult<T>["items"][number]>[];
  keyExtractor: (item: PaginatedResult<T>["items"][number]) => string;
  showSearch?: boolean;
  setQuery: React.Dispatch<React.SetStateAction<PaginationQuery>>;
  query: PaginationQuery;
  title?: string;
  description?: string;
  emptyStateMessage?: string;
  variant?: "default" | "bordered" | "striped";
}

const ControlledDataTable = <T,>({
  columns,
  data,
  isLoading,
  keyExtractor,
  setQuery,
  showSearch,
  query,
  title,
  description,
  emptyStateMessage = "No data available",
  variant = "default",
}: IControlledDataTableProps<T>) => {
  const {
    handlePageChange,
    handleSortChange,
    renderCell,
    searchTerm,
    setSearchTerm,
  } = useControlledDataTable<T>(setQuery);

  // Enhanced variant styles
  const containerStyles = {
    default:
      "bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700",
    bordered:
      "bg-white dark:bg-neutral-800 rounded-xl shadow-md border-2 border-neutral-300 dark:border-neutral-600",
    striped:
      "bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden",
  };

  const tableStyles = {
    default: "min-w-full border-collapse bg-white dark:bg-neutral-800",
    bordered:
      "min-w-full border-collapse border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800",
    striped: "min-w-full border-collapse bg-white dark:bg-neutral-800",
  };

  return (
    <div
      className={`flex flex-col transition-all duration-200 ${containerStyles[variant]}`}
    >
      {/* Header Section */}
      {(title || description || showSearch) && (
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              {title && (
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {description}
                </p>
              )}
            </div>

            {showSearch && (
              <div className="w-full sm:w-80">
                <SearchInput
                  className="w-full"
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  placeholder="Search..."
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              <svg
                className="animate-spin h-8 w-8 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Loading data...
              </p>
            </div>
          </div>
        ) : data?.items && data.items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className={tableStyles[variant]}>
              <TableHeader<T>
                columns={columns}
                sortField={query["sort-field"]}
                sortDirection={query["sort-direction"]}
                handleSortChange={handleSortChange}
              />
              <TableBody<T>
                columns={columns}
                items={data.items}
                isLoading={isLoading}
                keyExtractor={keyExtractor}
                renderCell={renderCell}
              />
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <svg
              className="w-16 h-16 text-neutral-300 dark:text-neutral-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              No data found
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center max-w-sm">
              {emptyStateMessage}
            </p>
          </div>
        )}
      </div>

      {/* Footer Section */}
      {data && data.items && data.items.length > 0 && (
        <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
          <TableFooter
            currentPage={data.currentPage}
            handlePageChange={handlePageChange}
            page={query.page!}
            totalPages={data.totalPages}
            hasNextPage={data.hasNextPage}
            hasPreviousPage={data.hasPreviousPage}
          />
        </div>
      )}
    </div>
  );
};

export default ControlledDataTable;
