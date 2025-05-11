import {
  LeanPatientDocument,
  PatientModel,
  PatientsTypeStaticMethods,
} from "@nizar-repo/patients-types";
import {
  PaginatedResult,
  PaginationQuery,
} from "@nizar-repo/shared-types/PaginationTypes";
import getPaginationPipeline from "helpers/findPaginated";
import { model, Schema } from "mongoose";

const patientsSchema = new Schema<LeanPatientDocument, PatientModel>(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    birthDate: { type: Date, required: true },
    email: { type: String },
    medicalHistoryId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

patientsSchema.index(
  { fullName: 1, birthDate: 1, phoneNumber: 1 },
  { unique: true }
);

const findPaginatedPatients: PatientsTypeStaticMethods["findPaginated"] =
  async function (this: PatientModel, query: PaginationQuery) {
    const page = query.page || 1;

    const [paginatedResult] = await this.aggregate<
      PaginatedResult<LeanPatientDocument>
    >(getPaginationPipeline(query));

    return (
      paginatedResult || {
        data: [],
        hasNextPage: false,
        hasPreviousPage: false,
        totalPages: 0,
        currentPage: page,
      }
    );
  };
patientsSchema.static("findPaginated", findPaginatedPatients);

const Patients = model<LeanPatientDocument, PatientModel>(
  "Patients",
  patientsSchema
);

export default Patients;
