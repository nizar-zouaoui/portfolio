import { PatientRouteTypes } from "@nizar-repo/patients-types";
import { TokenPayloadType } from "@nizar-repo/route-protection/tokenPayloadType";
import { Request, Response } from "express";
import * as patientServices from "services/patients";

export const getPatientData = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    PatientRouteTypes["/patients/"]["GET"]["query"]
  >,
  res: Response<
    PatientRouteTypes["/patients/"]["GET"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const response = await patientServices.getPatientData(req.query);
  res.status(200).send(response);
};

export const getPatientDataById = async (
  req: Request<
    PatientRouteTypes["/patients/:id"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  res: Response<
    PatientRouteTypes["/patients/:id"]["GET"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const response = await patientServices.getPatientDataById(req.params.id);
  res.status(200).send(response);
};

export const addPatientData = async (
  req: Request<
    unknown,
    unknown,
    PatientRouteTypes["/patients/"]["POST"]["body"],
    unknown
  >,
  res: Response<
    PatientRouteTypes["/patients/"]["POST"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await patientServices.addPatientData(req.body);
  res.status(201).send("OK");
};

export const updatePatientData = async (
  req: Request<
    PatientRouteTypes["/patients/:id"]["PATCH"]["params"],
    unknown,
    PatientRouteTypes["/patients/:id"]["PATCH"]["body"],
    unknown
  >,
  res: Response<
    PatientRouteTypes["/patients/:id"]["PATCH"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await patientServices.updatePatientData(req.params.id, req.body);
  res.status(200).send("OK");
};

export const deletePatientData = async (
  req: Request<
    PatientRouteTypes["/patients/:id"]["DELETE"]["params"],
    unknown,
    unknown,
    unknown
  >,
  res: Response<
    PatientRouteTypes["/patients/:id"]["DELETE"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await patientServices.deletePatientData(req.params.id);
  res.status(200).send("OK");
};

export const addPatientDataBulk = async (
  req: Request<
    unknown,
    unknown,
    PatientRouteTypes["/patients/bulk"]["POST"]["body"],
    unknown
  >,
  res: Response<
    PatientRouteTypes["/patients/bulk"]["POST"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await patientServices.addPatientDataBulk(req.body);
  res.status(201).send("OK");
};
