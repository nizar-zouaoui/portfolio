import {
  PaginationQuery,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";
import { useState, useEffect } from "react";
import { DataTableColumn } from "../DataTableColumnInterface";

const useControlledDataTable = <T>(
  setQuery: React.Dispatch<React.SetStateAction<PaginationQuery>>
) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setQuery((prev) => ({ ...prev, keyword: searchTerm }));
  }, [searchTerm]);

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
    const value = column.selector ? item[column.selector] : "";
    return typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
      ? String(value)
      : null;
  };

  return {
    handlePageChange,
    handleSortChange,
    renderCell,
    searchTerm,
    setSearchTerm,
  };
};

export default useControlledDataTable;
