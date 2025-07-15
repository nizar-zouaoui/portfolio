import {
  AppointmentModel,
  LeanAppointmentDocument,
} from "@nizar-repo/medical-histories-types";
import { PAYMENT_STATUS } from "@nizar-repo/medical-histories-types/enums";
import { model, Schema } from "mongoose";
export const appointmentsSchema = new Schema<
  LeanAppointmentDocument,
  AppointmentModel
>(
  {
    actIds: {
      type: [String],
      ref: "Acts",
      required: true,
    },
    confirmedPrice: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },
  },
  { timestamps: true }
);

const Appointments = model<LeanAppointmentDocument, AppointmentModel>(
  "Appointments",
  appointmentsSchema
);

export default Appointments;
