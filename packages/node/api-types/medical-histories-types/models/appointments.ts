import {
  PaginatedResult,
  PaginationQuery,
} from "@nizar-repo/shared-types/PaginationTypes";
import { FlattenMaps, HydratedDocument, Model, Types } from "mongoose";
import { PAYMENT_STATUS } from "../enums";

export interface IAppointment {
  date: Date;
  notes?: string;
  acts: {
    id: string;
    teeth?: string;
  }[];
  confirmedPrice: number;
  paymentStatus: PAYMENT_STATUS;
}
export interface IAppointmentDocument extends IAppointment {}
export type HydratedAppointmentDocument =
  HydratedDocument<IAppointmentDocument>;
export type LeanAppointmentDocument = FlattenMaps<IAppointmentDocument> & {
  _id: Types.ObjectId;
};

export type AppointmentModel = Model<LeanAppointmentDocument> &
  AppointmentsTypeStaticMethods;

export type AppointmentsTypeStaticMethods = {
  findPaginated: (
    this: AppointmentModel,
    patientId: string,
    args: PaginationQuery
  ) => Promise<PaginatedResult<LeanAppointmentDocument>>;
};
