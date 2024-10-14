export interface DataTableColumn<T> {
  title: string;
  selector?: keyof T;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}
