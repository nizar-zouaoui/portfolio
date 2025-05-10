import { IAct, LeanActDocument } from "../models/acts";

import {
  PaginatedResult,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";
export type ActRouteTypes = {
  "/acts/": {
    POST: {
      body: IAct;
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
      response: PaginatedResult<LeanActDocument>;
    };
  };
  "/acts/:id": {
    PATCH: {
      body: Partial<IAct>;
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
      response: LeanActDocument;
      params: {
        id: string;
      };
    };
  };
};
