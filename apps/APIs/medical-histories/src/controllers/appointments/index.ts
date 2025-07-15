import { AppointmentRouteTypes } from "@nizar-repo/medical-histories-types";
import { TokenPayloadType } from "@nizar-repo/route-protection/tokenPayloadType";
import { Request, Response } from "express";
import * as appointmentServices from "services/appointments";

export const getAppointmentDataById = async (
  req: Request<
    AppointmentRouteTypes["/appointments/:id"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  res: Response<
    AppointmentRouteTypes["/appointments/:id"]["GET"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const appointment = await appointmentServices.getAppointmentDataById(
    req.params.id
  );
  res.status(200).send(appointment);
};

export const addAppointmentData = async (
  req: Request<
    AppointmentRouteTypes["/appointments/:medicalHistoryId"]["POST"]["params"],
    unknown,
    AppointmentRouteTypes["/appointments/:medicalHistoryId"]["POST"]["body"],
    unknown
  >,
  res: Response<
    AppointmentRouteTypes["/appointments/:medicalHistoryId"]["POST"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await appointmentServices.addAppointmentData(
    req.params.medicalHistoryId,
    req.body
  );
  res.status(201).send("OK");
};

export const deleteAppointmentData = async (
  req: Request<
    AppointmentRouteTypes["/appointments/:id"]["DELETE"]["params"],
    unknown,
    unknown,
    unknown
  >,
  res: Response<
    AppointmentRouteTypes["/appointments/:id"]["DELETE"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await appointmentServices.deleteAppointmentData(req.params.id);
  res.status(200).send("OK");
};

export const updateAppointmentData = async (
  req: Request<
    AppointmentRouteTypes["/appointments/:id"]["PATCH"]["params"],
    unknown,
    AppointmentRouteTypes["/appointments/:id"]["PATCH"]["body"],
    unknown
  >,
  res: Response<
    AppointmentRouteTypes["/appointments/:id"]["PATCH"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await appointmentServices.updateAppointmentData(req.params.id, req.body);
  res.status(200).send("OK");
};
