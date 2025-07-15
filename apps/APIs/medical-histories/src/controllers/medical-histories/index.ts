import { MedicalHistoryRouteTypes } from "@nizar-repo/medical-histories-types";
import { TokenPayloadType } from "@nizar-repo/route-protection/tokenPayloadType";
import { Request, Response } from "express";
import * as medicalHistoryServices from "services/medical-histories";

export const getMedicalHistoryDataById = async (
  req: Request<
    MedicalHistoryRouteTypes["/medical-histories/:id"]["GET"]["params"],
    unknown,
    unknown,
    MedicalHistoryRouteTypes["/medical-histories/:id"]["GET"]["query"]
  >,
  res: Response<
    MedicalHistoryRouteTypes["/medical-histories/:id"]["GET"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const appointments = await medicalHistoryServices.getMedicalHistoryDataById(
    req.params.id,
    req.query
  );
  res.status(200).send(appointments);
};

export const addMedicalHistoryData = async (
  req: Request<
    unknown,
    unknown,
    MedicalHistoryRouteTypes["/medical-histories/"]["POST"]["body"],
    unknown
  >,
  res: Response<
    MedicalHistoryRouteTypes["/medical-histories/"]["POST"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const medicalHistoryId = await medicalHistoryServices.addMedicalHistoryData(
    req.body
  );
  res.status(201).send(medicalHistoryId);
};

export const deleteMedicalHistoryData = async (
  req: Request<
    MedicalHistoryRouteTypes["/medical-histories/:id"]["DELETE"]["params"],
    unknown,
    unknown,
    unknown
  >,
  res: Response<
    MedicalHistoryRouteTypes["/medical-histories/:id"]["DELETE"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await medicalHistoryServices.deleteMedicalHistoryData(req.params.id);
  res.status(200).send("OK");
};
