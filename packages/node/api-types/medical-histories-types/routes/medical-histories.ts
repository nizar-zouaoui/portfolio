import { SortDirection } from "@nizar-repo/shared-types/PaginationTypes";
import {
  IMedicalHistory,
  LeanMedicalHistoryDocument,
} from "../models/medical-histories";

export type MedicalHistoryRouteTypes = {
  "/medical-histories/": {
    POST: {
      body: IMedicalHistory;
      response: string;
    };
  };
  "/medical-histories/:id": {
    PATCH: {
      body: Partial<IMedicalHistory>;
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
      response: LeanMedicalHistoryDocument["appointments"];
      params: {
        id: string;
      };
      query: {
        page?: number;
        limit?: number;
        ["sort-direction"]?: SortDirection;
        ["sort-field"]?: string;
        keyword?: string;
      };
    };
  };
};
