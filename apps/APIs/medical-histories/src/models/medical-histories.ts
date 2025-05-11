import {
  LeanMedicalHistoryDocument,
  MedicalHistoryModel,
} from "@nizar-repo/medical-histories-types";
import { model, Schema } from "mongoose";
import { appointmentsSchema } from "./appointments";
const medicalHistoriesSchema = new Schema<
  LeanMedicalHistoryDocument,
  MedicalHistoryModel
>(
  {
    appointments: {
      type: [appointmentsSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const MedicalHistories = model<LeanMedicalHistoryDocument, MedicalHistoryModel>(
  "MedicalHistories",
  medicalHistoriesSchema
);

export default MedicalHistories;
