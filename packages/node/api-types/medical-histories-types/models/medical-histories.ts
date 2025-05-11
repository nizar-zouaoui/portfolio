import {
  PaginatedResult,
  PaginationQuery,
} from "@nizar-repo/shared-types/PaginationTypes";
import { FlattenMaps, HydratedDocument, Model, Types } from "mongoose";
import { IAppointment } from "./appointments";

export interface IMedicalHistory {
  appointments: IAppointment[];
}
export interface IMedicalHistoryDocument extends IMedicalHistory {}
export type HydratedMedicalHistoryDocument =
  HydratedDocument<IMedicalHistoryDocument>;
export type LeanMedicalHistoryDocument =
  FlattenMaps<IMedicalHistoryDocument> & {
    _id: Types.ObjectId;
  };

export type MedicalHistoryModel = Model<LeanMedicalHistoryDocument> &
  MedicalHistoriesTypeStaticMethods;

export type MedicalHistoriesTypeStaticMethods = {
  findPaginated: (
    this: MedicalHistoryModel,
    args: PaginationQuery
  ) => Promise<PaginatedResult<LeanMedicalHistoryDocument>>;
};
