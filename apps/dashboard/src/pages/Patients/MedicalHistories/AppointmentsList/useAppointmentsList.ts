import { MedicalHistoryRouteTypes } from "@nizar-repo/medical-histories-types";
import { LeanPatientDocument } from "@nizar-repo/patients-types";
import {
  PaginationQuery,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";
import getInitalQueryParams from "helpers/getInitialQueryParams";
import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

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
  const [appointmentFormVisible, setAppointmentFormVisible] = useState(false);

  // const { toast } = useToastContext();

  return {
    medicalHistory,
    patient,
    query,
    setQuery,
    appointmentFormVisible,
    setAppointmentFormVisible,
  };
};

export default useAppointmentsList;
