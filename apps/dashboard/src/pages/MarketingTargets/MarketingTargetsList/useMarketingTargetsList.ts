import {
  PaginationQuery,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import Api from "../../../sdks";
import getInitalQueryParams from "../../../helpers/getInitialQueryParams";

const fetchFunction = (query: PaginationQuery) =>
  Api.marketingTargetsSDK.getMarketingTargetData({ query });
const useMarketingTargetsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState<PaginationQuery>(
    getInitalQueryParams(searchParams)
  );

  useEffect(() => {
    setSearchParams({
      page: (query.page || 1).toString(),
      limit: (query.limit || 10).toString(),
      keyword: query.keyword || "",
      ["sort-direction"]: query["sort-direction"] || SortDirection.asc,
      ["sort-field"]: query["sort-field"] || "createdAt",
    });
  }, [query, setSearchParams]);

  const { data, isLoading } = useQuery(
    ["marketing-targets", query],
    () => fetchFunction(query),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  return {
    data,
    isLoading,
    query,
    setQuery,
  };
};

export default useMarketingTargetsList;
