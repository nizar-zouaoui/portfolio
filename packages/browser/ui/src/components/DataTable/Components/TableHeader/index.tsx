import { SortDirection } from "@nizar-repo/shared-types/PaginationTypes";
import Icons from "../../../Icons";
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
                      <Icons.ArrowUp className="w-3 h-3" />
                    ) : (
                      <Icons.ArrowDown className="w-3 h-3" />
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
