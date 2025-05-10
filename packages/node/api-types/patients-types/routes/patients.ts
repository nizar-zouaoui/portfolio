import { IPatient, LeanPatientDocument } from "../models/patients";

import {
  PaginatedResult,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";
export type PatientRouteTypes = {
  "/patients/": {
    POST: {
      body: Omit<IPatient, "userId">;
      response: string;
    };
    GET: {
      query: {
        page?: number;
        limit?: number;
        ["sort-direction"]?: SortDirection;
        ["sort-field"]?: string;
        keyword?: string;
      };
      response: PaginatedResult<LeanPatientDocument>;
    };
  };
  "/patients/:id": {
    PATCH: {
      body: Partial<IPatient>;
      response: string;
      params: {
        id: string;
      };
    };
    DELETE: {
      response: string;
      params: {
        id: string;
      };
    };
    GET: {
      response: LeanPatientDocument;
      params: {
        id: string;
      };
    };
  };

  "/patients/bulk": {
    POST: {
      body: IPatient[];
      response: string;
    };
  };
};
