import {
  PaginatedResult,
  PaginationQuery,
} from "@nizar-repo/shared-types/PaginationTypes";
import { FlattenMaps, HydratedDocument, Model, Types } from "mongoose";
export interface IPatient {
  fullName: string;
  birthDate: Date;
  phoneNumber: string;
  email?: string;
  medicalHistoryId: string;
}

export interface IPatientDocument extends IPatient {}
export type HydratedPatientDocument = HydratedDocument<IPatientDocument>;
export type LeanPatientDocument = FlattenMaps<IPatientDocument> & {
  _id: Types.ObjectId;
};

export type PatientModel = Model<LeanPatientDocument> &
  PatientsTypeStaticMethods;

export type PatientsTypeStaticMethods = {
  findPaginated: (
    this: PatientModel,
    args: PaginationQuery
  ) => Promise<PaginatedResult<LeanPatientDocument>>;
};
