import React from "react";
import { DataTableColumn } from "../../DataTableColumnInterface";
import { SortDirection } from "@nizar-repo/shared-types/PaginationTypes";

interface ITableHeader<T> {
  columns: DataTableColumn<T>[];
  sortField?: string;
  sortDirection?: SortDirection;
  handleSortChange: (field: string) => void;
}

const TableHeader = <T,>({
  sortField,
  sortDirection,
  columns,
  handleSortChange,
}: ITableHeader<T>) => {
  return (
    <thead>
      <tr className="bg-gray-100">
        {columns.map((column, index) => (
          <th
            key={index}
            className="p-3 border border-gray-200 text-left text-gray-600 cursor-pointer"
            onClick={() =>
              column.sortable && handleSortChange(column.selector as string)
            }
          >
            {column.title}
            {column.sortable &&
              (sortField === column.selector
                ? sortDirection === SortDirection.asc
                  ? " 🔼"
                  : " 🔽"
                : "")}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
