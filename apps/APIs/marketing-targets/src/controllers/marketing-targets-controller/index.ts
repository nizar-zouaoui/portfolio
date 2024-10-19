import { MarketingTargetRouteTypes } from "@nizar-repo/marketing-targets-types";
import { TokenPayloadType } from "@nizar-repo/route-protection/tokenPayloadType";
import { Request, Response } from "express";
import * as marketingTargetServices from "services/marketing-targets-service";

export const getMarketingTargetData = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    MarketingTargetRouteTypes["/marketing-targets/"]["GET"]["query"]
  >,
  res: Response<
    MarketingTargetRouteTypes["/marketing-targets/"]["GET"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const response = await marketingTargetServices.getMarketingTargetData(
    res.locals.token.userId,
    req.query
  );
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
    MarketingTargetRouteTypes["/marketing-targets/:id"]["GET"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const response = await marketingTargetServices.getMarketingTargetDataById(
    req.params.id,
    res.locals.token.userId
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
    MarketingTargetRouteTypes["/marketing-targets/"]["POST"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await marketingTargetServices.addMarketingTargetData(
    req.body,
    res.locals.token.userId
  );
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
    MarketingTargetRouteTypes["/marketing-targets/:id"]["PATCH"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await marketingTargetServices.updateMarketingTargetData(
    req.params.id,
    req.body,
    res.locals.token.userId
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
    MarketingTargetRouteTypes["/marketing-targets/:id"]["DELETE"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await marketingTargetServices.deleteMarketingTargetData(
    req.params.id,
    res.locals.token.userId
  );
  res.status(200).send("OK");
};

export const addMarketingTargetDataBulk = async (
  req: Request<
    unknown,
    unknown,
    MarketingTargetRouteTypes["/marketing-targets/bulk"]["POST"]["body"],
    unknown
  >,
  res: Response<
    MarketingTargetRouteTypes["/marketing-targets/bulk"]["POST"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await marketingTargetServices.addMarketingTargetDataBulk(
    req.body,
    res.locals.token.userId
  );
  res.status(201).send("OK");
};
