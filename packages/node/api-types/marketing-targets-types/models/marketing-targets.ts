import { Types, HydratedDocument, FlattenMaps, Model } from "mongoose";
import {
  PaginationQuery,
  PaginatedResult,
} from "@nizar-repo/shared-types/PaginationTypes";
export interface IMarketingTarget {
  email: string;
  fullName: string;
  phoneNumber: string;
  userId: string;
}

export interface IMarketingTargetDocument extends IMarketingTarget {}
export type HydratedMarketingTargetDocument =
  HydratedDocument<IMarketingTargetDocument>;
export type LeanMarketingTargetDocument =
  FlattenMaps<IMarketingTargetDocument> & {
    _id: Types.ObjectId;
  };

export type MarketingTargetModel = Model<LeanMarketingTargetDocument> &
  MarketingTargetsTypeStaticMethods;

export type MarketingTargetsTypeStaticMethods = {
  findPaginated: (
    this: MarketingTargetModel,
    userId: string,
    args: PaginationQuery
  ) => Promise<PaginatedResult<LeanMarketingTargetDocument>>;
};
