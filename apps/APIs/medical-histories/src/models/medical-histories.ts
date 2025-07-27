import {
  LeanMedicalHistoryDocument,
  MedicalHistoryModel,
} from "@nizar-repo/medical-histories-types";
import { model, Schema } from "mongoose";
const medicalHistoriesSchema = new Schema<
  LeanMedicalHistoryDocument,
  MedicalHistoryModel
>(
  {
    appointmentIds: {
      type: [String],
      ref: "Appointments",
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
