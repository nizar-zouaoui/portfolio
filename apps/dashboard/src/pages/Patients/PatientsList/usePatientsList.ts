import {
  PaginationQuery,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import generateApiMessage from "helpers/generateApiMessage";
import getInitalQueryParams from "helpers/getInitialQueryParams";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSearchParams } from "react-router-dom";
import Api from "sdks";

const fetchFunction = (query: PaginationQuery) =>
  Api.patientsSDK.getPatientData({ query });

const deletePatientData = (id: string) =>
  Api.patientsSDK.deletePatientData({ params: { id } });

const usePatientsList = () => {
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
    ["patients", query],
    () => fetchFunction(query),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  const { toast } = useToastContext();

  const { mutate: deletePatient, isLoading: isDeleteLoading } = useMutation(
    async (id: string) => deletePatientData(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("patients");
        toast({
          type: "success",
          message: "Successfully deleted the patient",
          timer: 2000,
        });
      },
      onError: (error) => {
        toast({
          type: "error",
          message: generateApiMessage(error),
          timer: 2000,
        });
      },
    }
  );

  return {
    data,
    isLoading,
    query,
    setQuery,
    deletePatient,
    isDeleteLoading,
  };
};

export default usePatientsList;
