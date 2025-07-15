import { MedicalHistoryRouteTypes } from "@nizar-repo/medical-histories-types";
import { LeanPatientDocument } from "@nizar-repo/patients-types";
import {
  PaginationQuery,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import generateApiMessage from "helpers/generateApiMessage";
import getInitalQueryParams from "helpers/getInitialQueryParams";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import Api from "sdks";

const useAppointmentsList = () => {
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

  const { medicalHistory, patient } = useLoaderData() as {
    medicalHistory: MedicalHistoryRouteTypes["/medical-histories/:id"]["GET"]["response"];
    patient: LeanPatientDocument;
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToastContext();

  const { mutate: deleteAppointment, isLoading: isDeleteLoading } = useMutation(
    async (id: string) => {
      await Api.medicalHistoriesSDK.deleteAppointmentData({
        params: {
          id,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("appointments");
        navigate(-1);
        toast({
          type: "success",
          message: "Successfully deleted the appointment",
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
    medicalHistory,
    patient,
    query,
    setQuery,
    deleteAppointment,
    isDeleteLoading,
  };
};

export default useAppointmentsList;
