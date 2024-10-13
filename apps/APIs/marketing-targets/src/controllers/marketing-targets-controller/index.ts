import { Request, Response } from "express";
import * as marketingTargetServices from "../../services/marketing-targets-service";
import { MarketingTargetRouteTypes } from "@nizar-repo/marketing-targets-types";

export const getMarketingTargetData = async (
  _: Request,
  res: Response<
    unknown,
    MarketingTargetRouteTypes["/marketing-targets/"]["GET"]["response"]
  >
) => {
  const response = await marketingTargetServices.getMarketingTargetData();
  res.status(200).send(response);
};

export const getMarketingTargetDataById = async (
  req: Request<
    MarketingTargetRouteTypes["/marketing-targets/:id"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  res: Response<
    unknown,
    MarketingTargetRouteTypes["/marketing-targets/:id"]["GET"]["response"]
  >
) => {
  const response = await marketingTargetServices.getMarketingTargetDataById(
    req.params.id
  );
  res.status(200).send(response);
};

export const addMarketingTargetData = async (
  req: Request<
    unknown,
    unknown,
    MarketingTargetRouteTypes["/marketing-targets/"]["POST"]["body"],
    unknown
  >,
  res: Response<
    MarketingTargetRouteTypes["/marketing-targets/"]["POST"]["response"]
  >
) => {
  await marketingTargetServices.addMarketingTargetData(req.body);
  res.status(201).send("OK");
};

export const updateMarketingTargetData = async (
  req: Request<
    MarketingTargetRouteTypes["/marketing-targets/:id"]["PATCH"]["params"],
    unknown,
    MarketingTargetRouteTypes["/marketing-targets/:id"]["PATCH"]["body"],
    unknown
  >,
  res: Response<
    MarketingTargetRouteTypes["/marketing-targets/:id"]["PATCH"]["response"]
  >
) => {
  await marketingTargetServices.updateMarketingTargetData(
    req.params.id,
    req.body
  );
  res.status(200).send("OK");
};

export const deleteMarketingTargetData = async (
  req: Request<
    MarketingTargetRouteTypes["/marketing-targets/:id"]["DELETE"]["params"],
    unknown,
    unknown,
    unknown
  >,
  res: Response<
    MarketingTargetRouteTypes["/marketing-targets/:id"]["DELETE"]["response"]
  >
) => {
  await marketingTargetServices.deleteMarketingTargetData(req.params.id);
  res.status(200).send("OK");
};
