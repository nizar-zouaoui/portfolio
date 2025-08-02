import {
  PaginatedResult,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";
import { LeanActDocument } from "../models/acts";
import { LeanAppointmentDocument } from "../models/appointments";
import { IMedicalHistory } from "../models/medical-histories";

export type MedicalHistoryRouteTypes = {
  "/medical-histories/": {
    POST: {
      body: IMedicalHistory;
      response: string;
    };
  };
  "/medical-histories/:id": {
    DELETE: {
      response: string;
      params: {
        id: string;
      };
    };
    GET: {
      response: PaginatedResult<
        Omit<LeanAppointmentDocument, "acts"> & {
          acts: (LeanActDocument & {
            teeth: string;
          })[];
        }
      >;
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
