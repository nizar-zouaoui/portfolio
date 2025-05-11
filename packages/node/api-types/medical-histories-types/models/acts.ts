import {
  PaginatedResult,
  PaginationQuery,
} from "@nizar-repo/shared-types/PaginationTypes";
import { FlattenMaps, HydratedDocument, Model, Types } from "mongoose";
export interface IAct {
  name: string;
  price: number;
  description: string;
}

export interface IActDocument extends IAct {}
export type HydratedActDocument = HydratedDocument<IActDocument>;
export type LeanActDocument = FlattenMaps<IActDocument> & {
  _id: Types.ObjectId;
};

export type ActModel = Model<LeanActDocument> & ActsTypeStaticMethods;

export type ActsTypeStaticMethods = {
  findPaginated: (
    this: ActModel,
    args: PaginationQuery
  ) => Promise<PaginatedResult<LeanActDocument>>;
};
