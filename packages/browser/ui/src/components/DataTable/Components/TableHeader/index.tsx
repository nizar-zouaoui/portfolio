import { SortDirection } from "@nizar-repo/shared-types/PaginationTypes";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { DataTableColumn } from "../../DataTableColumnInterface";

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
  const width = `1/${columns.length}`;

  return (
    <thead>
      <tr className="bg-gray-100 dark:bg-gray-800">
        {columns.map((column, index) => {
          console.log(column);
          return (
            <th
              key={index}
              className={`p-3 border border-gray-200 dark:border-gray-700 text-left text-gray-600 dark:text-gray-300 cursor-pointer w-${width}`}
              onClick={() =>
                column.sortable && handleSortChange(column.selector as string)
              }
            >
              <div className="flex items-center justify-between">
                {column.title}
                {column.sortable &&
                  (sortField === column.selector ? (
                    sortDirection === SortDirection.asc ? (
                      <FaArrowUp />
                    ) : (
                      <FaArrowDown />
                    )
                  ) : (
                    ""
                  ))}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
