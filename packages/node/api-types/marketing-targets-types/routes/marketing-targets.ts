import {
  IMarketingTarget,
  LeanMarketingTargetDocument,
} from "../models/marketing-targets";

import {
  PaginatedResult,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";
export type MarketingTargetRouteTypes = {
  "/marketing-targets/": {
    POST: {
      body: IMarketingTarget;
      response: string;
    };
    GET: {
      query: {
        page: number;
        limit: number;
        ["sort-direction"]: SortDirection;
        ["sort-field"]: string;
        keyword: string;
      };
      response: PaginatedResult<LeanMarketingTargetDocument>;
    };
  };
  "/marketing-targets/:id": {
    PATCH: {
      body: Partial<IMarketingTarget>;
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
      response: LeanMarketingTargetDocument;
      params: {
        id: string;
      };
    };
  };

  "/marketing-targets/bulk": {
    POST: {
      body: IMarketingTarget[];
      response: string;
    };
  };
};
