import {
  PaginationQuery,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";

const getInitalQueryParams = (
  searchParams: URLSearchParams
): PaginationQuery => ({
  page: Number(searchParams.get("page")) || 1,
  limit: Number(searchParams.get("limit")) || 10,
  keyword: searchParams.get("keyword") || "",
  ["sort-direction"]:
    (searchParams.get("sort-direction") as SortDirection) || SortDirection.desc,
  ["sort-field"]: searchParams.get("sort-field") || "createdAt",
});

export default getInitalQueryParams;
