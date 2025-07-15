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
  // I want to populate the appointment with acts: actIds => acts
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
    { $push: { appointments: appointmentData } }
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
  await MedicalHistories.updateOne(
    { "appointments._id": id },
    {
      $set: {
        "appointments.$.date": data.date,
        "appointments.$.notes": data.notes,
        "appointments.$.paymentStatus": data.paymentStatus,
        "appointments.$.actIds": data.actIds,
        "appointments.$.confirmedPrice": data.confirmedPrice,
      },
    }
  );
};

export const deleteAppointmentData = async (id: string) => {
  const appointmentData = await Appointments.findOneAndDelete({
    _id: id,
  });
  if (!appointmentData) {
    throw createHttpError(404, "Appointment not found");
  }
  await MedicalHistories.updateOne(
    { "appointments._id": id },
    { $pull: { appointments: { _id: id } } }
  );
};
