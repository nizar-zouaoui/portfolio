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
            className="p-3 text-center text-gray-500"
          >
            Loading...
          </td>
        </tr>
      ) : items.length > 0 ? (
        items.map((item) => (
          <tr key={keyExtractor(item)} className="even:bg-gray-50">
            {columns.map((column, colIndex) => {
              return (
                <td key={colIndex} className="p-3 border border-gray-200">
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
            className="p-3 text-center text-gray-500"
          >
            No results found.
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
