import React from "react";
import {
  PaginatedResult,
  PaginationQuery,
} from "@nizar-repo/shared-types/PaginationTypes";
import useDataTable from "./useDataTable";
import TableFooter from "../Components/TableFooter";
import TableHeader from "../Components/TableHeader";
import TableBody from "../Components/TableBody";
import SearchInput from "../../forms/SearchInput";
import { DataTableColumn } from "../DataTableColumnInterface";

interface DataTableProps<T> {
  fetchFunction: (query: PaginationQuery) => Promise<PaginatedResult<T>>;
  columns: DataTableColumn<PaginatedResult<T>["items"][number]>[];
  keyExtractor: (item: PaginatedResult<T>["items"][number]) => string;
  showSearch?: boolean;
  initialQuery?: PaginationQuery;
}

const DataTable = <T extends {}>({
  fetchFunction,
  columns,
  keyExtractor,
  showSearch = false,
  initialQuery,
}: DataTableProps<T>) => {
  const {
    data,
    isLoading,
    query,
    searchTerm,
    setSearchTerm,
    handlePageChange,
    handleSortChange,
    renderCell,
  } = useDataTable(fetchFunction, initialQuery);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white shadow-lg rounded-lg">
      {showSearch && (
        <SearchInput
          className="relative w-1/3"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <TableHeader<T>
            columns={columns}
            sortField={query["sort-field"]}
            sortDirection={query["sort-direction"]}
            handleSortChange={handleSortChange}
          />
          <TableBody<T>
            columns={columns}
            items={data?.items || []}
            isLoading={isLoading}
            keyExtractor={keyExtractor}
            renderCell={renderCell}
          />
        </table>
      </div>
      {data && data.items.length > 0 ? (
        <TableFooter
          currentPage={data.currentPage}
          handlePageChange={handlePageChange}
          page={query.page!}
          totalPages={data.totalPages}
          hasNextPage={data.hasNextPage}
          hasPreviousPage={data.hasPreviousPage}
        />
      ) : null}
    </div>
  );
};

export default DataTable;
