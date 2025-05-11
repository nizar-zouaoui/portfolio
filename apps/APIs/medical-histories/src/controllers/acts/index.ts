import { ActRouteTypes } from "@nizar-repo/medical-histories-types";
import { TokenPayloadType } from "@nizar-repo/route-protection/tokenPayloadType";
import { Request, Response } from "express";
import * as actServices from "services/acts";

export const getActData = async (
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
  const response = await actServices.getActData(req.query);
  res.status(200).send(response);
};

export const getActDataById = async (
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
  const response = await actServices.getActDataById(req.params.id);
  res.status(200).send(response);
};

export const addActData = async (
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
  await actServices.addActData(req.body);
  res.status(201).send("OK");
};

export const updateActData = async (
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
  await actServices.updateActData(req.params.id, req.body);
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
