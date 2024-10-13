import { MarketingTargetRouteTypes } from "@nizar-repo/marketing-targets-types";
import { NextFunction, Request, Response } from "express";
import {
  body,
  validationResult,
  check,
  Result,
  ValidationError,
} from "express-validator";
import createHttpError from "http-errors";

const formatErrors = (errors: Result<ValidationError>) => ({
  fields: errors.array(),
});
export const addMarketingTargetDataValidation = (
  req: Request<
    any,
    any,
    MarketingTargetRouteTypes["/marketing-targets/"]["POST"]["body"],
    any
  >,
  _: Response<
    MarketingTargetRouteTypes["/marketing-targets/"]["POST"]["response"]
  >,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const addMarketingTargetDataValidator = [
  body("email", "Invalid Email").isEmail(),
  body("fullName", "Invalid Full Name").isAlpha(),
  body("phoneNumber", "Invalid Phone Number").isMobilePhone("any"),
];

export const getMarketingTargetDataByIdValidation = (
  req: Request<
    MarketingTargetRouteTypes["/marketing-targets/:id"]["GET"]["params"],
    any,
    any,
    any
  >,
  _: Response<
    MarketingTargetRouteTypes["/marketing-targets/:id"]["GET"]["response"]
  >,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const getMarketingTargetDataByIdValidator = [check("id").isMongoId()];

export const updateMarketingTargetDataValidation = (
  req: Request<
    MarketingTargetRouteTypes["/marketing-targets/:id"]["PATCH"]["params"],
    any,
    MarketingTargetRouteTypes["/marketing-targets/:id"]["PATCH"]["body"],
    any
  >,
  _: Response<
    MarketingTargetRouteTypes["/marketing-targets/:id"]["PATCH"]["response"]
  >,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const updateMarketingTargetDataValidator = [
  check("id").isMongoId(),
  body("email", "Invalid Email").optional().isEmail(),
  body("fullName", "Invalid Full Name").optional().isAlpha(),
  body("phoneNumber", "Invalid Phone Number").optional().isMobilePhone("any"),
];

export const deleteMarketingTargetDataValidation = (
  req: Request<
    MarketingTargetRouteTypes["/marketing-targets/:id"]["DELETE"]["params"],
    any,
    any,
    any
  >,
  _: Response<
    MarketingTargetRouteTypes["/marketing-targets/:id"]["DELETE"]["response"]
  >,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const deleteMarketingTargetDataValidator = [check("id").isMongoId()];
