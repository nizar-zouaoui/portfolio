import {
  PaginatedResult,
  PaginationQuery,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { DataTableColumn } from "../DataTableColumnInterface";

const useDataTable = <T>(
  fetchFunction: (query: PaginationQuery) => Promise<PaginatedResult<T>>,
  initialQuery: PaginationQuery = {
    page: 1,
    limit: 10,
    "sort-direction": SortDirection.asc,
    "sort-field": "createdAt",
    keyword: "",
  }
) => {
  const [query, setQuery] = useState(initialQuery);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["dataTableData", query],
    () => fetchFunction(query),
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    setQuery((prev) => ({ ...prev, keyword: searchTerm }));
    refetch();
  }, [searchTerm, refetch]);

  const handlePageChange = (newPage: number) =>
    setQuery((prev) => ({ ...prev, page: newPage }));
  const handleSortChange = (field: string) =>
    setQuery((prev) => ({
      ...prev,
      "sort-field": field,
      "sort-direction":
        prev["sort-direction"] === SortDirection.asc
          ? SortDirection.desc
          : SortDirection.asc,
    }));

  const renderCell = (item: T, column: DataTableColumn<T>) => {
    if (column.cell) return column.cell(item);
    const value = column.selector ? (item as any)[column.selector] : "";
    return typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
      ? String(value)
      : null;
  };

  return {
    data,
    isLoading,
    handlePageChange,
    handleSortChange,
    renderCell,
    searchTerm,
    setSearchTerm,
    query,
  };
};

export default useDataTable;
