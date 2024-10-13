import { Types, HydratedDocument, FlattenMaps } from "mongoose";

export interface IMarketingTarget {
  email: string;
  fullName: string;
  phoneNumber: string;
}

export interface IMarketingTargetDocument extends IMarketingTarget {}
export type HydratedMarketingTargetDocument =
  HydratedDocument<IMarketingTargetDocument>;
export type LeanMarketingTargetDocument =
  FlattenMaps<IMarketingTargetDocument> & {
    _id: Types.ObjectId;
  };
