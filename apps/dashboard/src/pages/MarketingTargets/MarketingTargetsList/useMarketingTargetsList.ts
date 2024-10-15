import {
  PaginationQuery,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSearchParams } from "react-router-dom";
import Api from "../../../sdks";
import getInitalQueryParams from "../../../helpers/getInitialQueryParams";
import generateApiMessage from "../../../helpers/generateApiMessage";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";

const fetchFunction = (query: PaginationQuery) =>
  Api.marketingTargetsSDK.getMarketingTargetData({ query });

const deleteMarketingTargetData = (id: string) =>
  Api.marketingTargetsSDK.deleteMarketingTargetData({ params: { id } });

const useMarketingTargetsList = () => {
  const queryClient = useQueryClient();

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
  const { addToast } = useToastContext();

  const { mutate: deleteMarketingTarget, isLoading: isDeleteLoading } =
    useMutation(async (id: string) => deleteMarketingTargetData(id), {
      onSuccess: () => {
        queryClient.invalidateQueries("marketing-targets");
        addToast({
          type: "success",
          message: "Successfully deleted the marketing target",
          timer: 2000,
        });
      },
      onError: (error) => {
        addToast({
          type: "error",
          message: generateApiMessage(error),
          timer: 2000,
        });
      },
    });

  return {
    data,
    isLoading,
    query,
    setQuery,
    deleteMarketingTarget,
    isDeleteLoading,
  };
};

export default useMarketingTargetsList;
