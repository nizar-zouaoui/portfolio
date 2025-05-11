import { handleDuplicateFieldsError } from "@nizar-repo/custom-router/errors";
import { IMedicalHistory } from "@nizar-repo/medical-histories-types";
import { PaginationQuery } from "@nizar-repo/shared-types/PaginationTypes";
import getAppointmentsPaginationPipeline from "helpers/findPaginatedAppointments";
import createHttpError from "http-errors";
import MedicalHistories from "models/medical-histories";

export const getMedicalHistoryDataById = async (
  id: string,
  query: PaginationQuery
) => {
  const pipeline = getAppointmentsPaginationPipeline(id, query);
  const medicalHistoryData = await MedicalHistories.aggregate(pipeline);

  if (!medicalHistoryData || !medicalHistoryData.length) {
    throw createHttpError(404, "MedicalHistory not found");
  }
  return medicalHistoryData[0];
};

export const addMedicalHistoryData = async (data: IMedicalHistory) => {
  try {
    await MedicalHistories.create({ ...data });
  } catch (error) {
    throw handleDuplicateFieldsError(error);
  }
};

export const updateMedicalHistoryData = async (
  id: string,
  data: Partial<IMedicalHistory>
) => {
  try {
    const medicalHistoryData = await MedicalHistories.findOneAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      }
    );
    if (!medicalHistoryData) {
      throw createHttpError(404, "MedicalHistory not found");
    }
  } catch (error) {
    throw handleDuplicateFieldsError(error);
  }
};

export const deleteMedicalHistoryData = async (id: string) => {
  const medicalHistoryData = await MedicalHistories.findOneAndDelete({
    _id: id,
  });
  if (!medicalHistoryData) {
    throw createHttpError(404, "MedicalHistory not found");
  }
};
