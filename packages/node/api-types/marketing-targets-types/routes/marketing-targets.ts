import {
  IMarketingTarget,
  LeanMarketingTargetDocument,
} from "../models/marketing-targets";
export type MarketingTargetRouteTypes = {
  "/marketing-targets/": {
    POST: {
      body: IMarketingTarget;
      response: string;
    };
    GET: {
      response: LeanMarketingTargetDocument[];
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
};
