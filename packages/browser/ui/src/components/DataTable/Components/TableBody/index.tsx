import React from "react";
import { DataTableColumn } from "../../DataTableColumnInterface";

interface ITableBody<T> {
  isLoading: boolean;
  items: T[];
  columns: DataTableColumn<T>[];
  keyExtractor: (item: T) => string;
  renderCell: (item: T, column: DataTableColumn<T>) => React.ReactNode;
}

const TableBody = <T,>({
  isLoading,
  items,
  columns,
  keyExtractor,
  renderCell,
}: ITableBody<T>) => {
  return (
    <tbody>
      {isLoading ? (
        <tr>
          <td
            colSpan={columns.length}
            className="px-4 py-8 text-center text-neutral-500 dark:text-neutral-400"
          >
            Loading...
          </td>
        </tr>
      ) : items.length > 0 ? (
        items.map((item, index) => (
          <tr
            key={keyExtractor(item)}
            className="transition-colors duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 bg-white dark:bg-neutral-800"
          >
            {columns.map((column, colIndex) => {
              return (
                <td
                  key={colIndex}
                  className="px-4 py-3 text-left text-sm text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700"
                >
                  {renderCell(item, column)}
                </td>
              );
            })}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={columns.length}
            className="px-4 py-8 text-center text-neutral-500 dark:text-neutral-400"
          >
            No results found.
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
