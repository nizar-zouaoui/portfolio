import { handleDuplicateFieldsError } from "@nizar-repo/custom-router/errors";
import { IPatient } from "@nizar-repo/patients-types";
import { PaginationQuery } from "@nizar-repo/shared-types/PaginationTypes";
import createHttpError from "http-errors";
import Patients from "models/patients";

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
    await Patients.create({ ...data });
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
