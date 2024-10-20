import {
  PaginatedResult,
  PaginationQuery,
} from "@nizar-repo/shared-types/PaginationTypes";
import { FlattenMaps, HydratedDocument, Model, Types } from "mongoose";
export interface ICategory {
  title: string;
  description: string;
  imgUrl?: string;
  userId: string;
}

export interface ICategoryDocument extends ICategory {}
export type HydratedCategoryDocument = HydratedDocument<ICategoryDocument>;
export type LeanCategoryDocument = FlattenMaps<ICategoryDocument> & {
  _id: Types.ObjectId;
};

export type CategoryModel = Model<LeanCategoryDocument> &
  CategoriesTypeStaticMethods;

export type CategoriesTypeStaticMethods = {
  findPaginated: (
    this: CategoryModel,
    userId: string,
    args: PaginationQuery
  ) => Promise<PaginatedResult<LeanCategoryDocument>>;
};
