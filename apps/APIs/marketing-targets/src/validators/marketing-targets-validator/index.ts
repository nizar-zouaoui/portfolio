import { MarketingTargetRouteTypes } from "@nizar-repo/marketing-targets-types";
import { SortDirection } from "@nizar-repo/shared-types/PaginationTypes";
import { NextFunction, Request, Response } from "express";
import {
  body,
  validationResult,
  check,
  Result,
  ValidationError,
} from "express-validator";
import createHttpError from "http-errors";
import { isValidNumber } from "libphonenumber-js";

const formatErrors = (errors: Result<ValidationError>) => ({
  fields: errors.array(),
});

export const getMarketingTargetDataValidation = (
  req: Request<
    any,
    any,
    any,
    MarketingTargetRouteTypes["/marketing-targets/"]["GET"]["query"]
  >,
  _: Response<
    MarketingTargetRouteTypes["/marketing-targets/"]["GET"]["response"]
  >,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const getMarketingTargetDataValidator = [
  check("limit").optional().isInt(),
  check("page").optional().isInt(),
  check("sort-direction").optional().isIn(Object.keys(SortDirection)),
  check("sort-field").optional().isString(),
  check("keyword").optional().isString(),
];

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
  body("fullName", "Invalid Full Name")
    .matches(/^[a-zA-Z\s'-]+$/) // Regex to allow letters, spaces, apostrophes, and hyphens
    .withMessage(
      "Full Name can only contain letters, spaces, hyphens, and apostrophes."
    ),
  body("phoneNumber")
    .custom((value) => isValidNumber(value))
    .withMessage("Invalid Phone Number"),
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
  body("fullName", "Invalid Full Name")
    .optional()
    .matches(/^[a-zA-Z\s'-]+$/) // Regex to allow letters, spaces, apostrophes, and hyphens
    .withMessage(
      "Full Name can only contain letters, spaces, hyphens, and apostrophes."
    ),
  body("phoneNumber")
    .optional()
    .custom((value) => isValidNumber(value))
    .withMessage("Invalid Phone Number"),
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

export const addMarketingTargetDataBulkValidation = (
  req: Request<
    any,
    any,
    MarketingTargetRouteTypes["/marketing-targets/bulk"]["POST"]["body"],
    any
  >,
  _: Response<
    MarketingTargetRouteTypes["/marketing-targets/bulk"]["POST"]["response"]
  >,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const addMarketingTargetDataBulkValidator = [
  body().isArray(),
  body("*.email", "Invalid Email").isEmail(),
  body("*.fullName", "Invalid Full Name").isAlpha(),
  body("*.phoneNumber", "Invalid Phone Number").isMobilePhone("any"),
];
