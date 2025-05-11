import { handleDuplicateFieldsError } from "@nizar-repo/custom-router/errors";
import { MedicalHistoriesSDK } from "@nizar-repo/medical-histories-sdk";
import { IPatient } from "@nizar-repo/patients-types";
import { createFakeToken } from "@nizar-repo/route-protection";
import ApiSDK from "@nizar-repo/server-sdk";
import { PaginationQuery } from "@nizar-repo/shared-types/PaginationTypes";
import createHttpError from "http-errors";
import Patients from "models/patients";

const mainApi = new ApiSDK().setBearerToken(createFakeToken());
const medicalHistorySDK = new MedicalHistoriesSDK(mainApi);

export const getPatientData = async (query: PaginationQuery) => {
  const patientData = await Patients.findPaginated(query);
  return patientData;
};

export const getPatientDataById = async (id: string) => {
  const patientData = await Patients.findOne({
    _id: id,
  });
  if (!patientData) {
    throw createHttpError(404, "Patient not found");
  }
  return patientData;
};

export const addPatientData = async (data: IPatient) => {
  try {
    const medicalHistoryId = await medicalHistorySDK.addMedicalHistoryData({
      body: {
        appointments: [],
      },
    });
    await Patients.create({
      ...data,
      medicalHistoryId: medicalHistoryId.toString(),
    });
  } catch (error) {
    throw handleDuplicateFieldsError(error);
  }
};

export const updatePatientData = async (
  id: string,
  data: Partial<IPatient>
) => {
  try {
    const patientData = await Patients.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!patientData) {
      throw createHttpError(404, "Patient not found");
    }
  } catch (error) {
    throw handleDuplicateFieldsError(error);
  }
};

export const deletePatientData = async (id: string) => {
  const patientData = await Patients.findOneAndDelete({
    _id: id,
  });
  if (!patientData) {
    throw createHttpError(404, "Patient not found");
  }
};

export const addPatientDataBulk = async (data: IPatient[]) => {
  try {
    await Patients.insertMany(data.map((d) => ({ ...d })));
  } catch (error) {
    throw handleDuplicateFieldsError(error);
  }
};
