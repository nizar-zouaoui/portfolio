import {
  PaginationQuery,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";
import { useCallback, useEffect, useState } from "react";
import {
  safeGetValueByPath,
  safeRenderContent,
} from "../../../utils/safeDataAccess";
import { DataTableColumn } from "../DataTableColumnInterface";

const useControlledDataTable = <T>(
  setQuery: React.Dispatch<React.SetStateAction<PaginationQuery>>
) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setQuery((prev) => ({ ...prev, keyword: searchTerm }));
  }, [searchTerm, setQuery]);

  const handlePageChange = useCallback(
    (newPage: number) => setQuery((prev) => ({ ...prev, page: newPage })),
    [setQuery]
  );

  const handleSortChange = useCallback(
    (field: string) =>
      setQuery((prev) => ({
        ...prev,
        "sort-field": field,
        "sort-direction":
          prev["sort-direction"] === SortDirection.asc
            ? SortDirection.desc
            : SortDirection.asc,
      })),
    [setQuery]
  );

  const renderCell = useCallback((item: T, column: DataTableColumn<T>) => {
    if (column.cell) return column.cell(item);
    const value = column.selector
      ? safeGetValueByPath(item, column.selector)
      : "";
    return safeRenderContent(value);
  }, []);

  return {
    handlePageChange,
    handleSortChange,
    renderCell,
    searchTerm,
    setSearchTerm,
  };
};

export default useControlledDataTable;
