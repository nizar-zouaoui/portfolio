export type PaginationQuery = {
  limit: number;
  page: number;
  "sort-direction": SortDirection;
  "sort-field": string;
  keyword: string;
};

export type PaginatedResult<T> = {
  data: T[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  currentPage: number;
};

export enum SortDirection {
  asc = "asc",
  desc = "desc",
}
