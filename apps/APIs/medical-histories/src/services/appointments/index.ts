import {
  AppointmentRouteTypes,
  IAppointment,
} from "@nizar-repo/medical-histories-types";
import createHttpError from "http-errors";
import Appointments from "models/appointments";
import MedicalHistories from "models/medical-histories";

export const getAppointmentDataById = async (
  id: string
): Promise<AppointmentRouteTypes["/appointments/:id"]["GET"]["response"]> => {
  const appointmentData = await Appointments.findById(id).lean();

  if (!appointmentData) {
    throw createHttpError(404, "Appointment not found");
  }

  return appointmentData;
};

export const addAppointmentData = async (
  medicalHistoryId: string,
  data: IAppointment
) => {
  const appointmentData = await Appointments.create({
    ...data,
    medicalHistoryId,
  });

  await MedicalHistories.updateOne(
    { _id: medicalHistoryId },
    { $push: { appointmentIds: appointmentData._id.toString() } }
  );

  return "OK";
};

export const updateAppointmentData = async (
  id: string,
  data: Partial<IAppointment>
) => {
  const appointmentData = await Appointments.updateOne(
    { _id: id },
    { ...data }
  );
  if (!appointmentData) {
    throw createHttpError(404, "Appointment not found");
  }
};

export const deleteAppointmentData = async (id: string) => {
  const appointmentData = await Appointments.findOneAndDelete({
    _id: id,
  });
  if (!appointmentData) {
    throw createHttpError(404, "Appointment not found");
  }
  await MedicalHistories.updateOne(
    { appointmentIds: id },
    { $pull: { appointmentIds: id } }
  );
};
