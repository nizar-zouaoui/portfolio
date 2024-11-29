import { ICategory, LeanCategoryDocument } from "../models/categories";

import {
  PaginatedResult,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";

export type CategoryRouteTypes = {
  "/categories/": {
    POST: {
      body: Omit<ICategory, "userId">;
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
      response: PaginatedResult<LeanCategoryDocument>;
    };
  };
  "/categories/:id": {
    PATCH: {
      body: Partial<ICategory>;
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
      response: LeanCategoryDocument;
      params: {
        id: string;
      };
    };
  };

  "/categories/bulk": {
    POST: {
      body: ICategory[];
      response: string;
    };
  };

  "/categories/all-titles": {
    GET: {
      response: Pick<LeanCategoryDocument, "_id" | "title">[];
    };
  };
};
