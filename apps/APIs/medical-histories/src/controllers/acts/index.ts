import { ActRouteTypes } from "@nizar-repo/medical-histories-types";
import { TokenPayloadType } from "@nizar-repo/route-protection/tokenPayloadType";
import { Request, Response } from "express";
import * as actServices from "services/acts";

export const getActsPaginated = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    ActRouteTypes["/acts/"]["GET"]["query"]
  >,
  res: Response<
    ActRouteTypes["/acts/"]["GET"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const response = await actServices.getActsPaginated(req.query);
  res.status(200).send(response);
};

export const getActById = async (
  req: Request<
    ActRouteTypes["/acts/:id"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  res: Response<
    ActRouteTypes["/acts/:id"]["GET"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const response = await actServices.getActById(req.params.id);
  res.status(200).send(response);
};

export const addAct = async (
  req: Request<
    unknown,
    unknown,
    ActRouteTypes["/acts/"]["POST"]["body"],
    unknown
  >,
  res: Response<
    ActRouteTypes["/acts/"]["POST"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await actServices.addAct(req.body);
  res.status(201).send("OK");
};

export const updateAct = async (
  req: Request<
    ActRouteTypes["/acts/:id"]["PATCH"]["params"],
    unknown,
    ActRouteTypes["/acts/:id"]["PATCH"]["body"],
    unknown
  >,
  res: Response<
    ActRouteTypes["/acts/:id"]["PATCH"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await actServices.updateAct(req.params.id, req.body);
  res.status(200).send("OK");
};

export const deleteActData = async (
  req: Request<
    ActRouteTypes["/acts/:id"]["DELETE"]["params"],
    unknown,
    unknown,
    unknown
  >,
  res: Response<
    ActRouteTypes["/acts/:id"]["DELETE"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await actServices.deleteActData(req.params.id);
  res.status(200).send("OK");
};
