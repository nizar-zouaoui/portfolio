import { ActRouteTypes } from "@nizar-repo/acts-types";
import { SortDirection } from "@nizar-repo/shared-types/PaginationTypes";
import { NextFunction, Request, Response } from "express";
import {
  body,
  check,
  Result,
  ValidationError,
  validationResult,
} from "express-validator";
import createHttpError from "http-errors";

const formatErrors = (errors: Result<ValidationError>) => ({
  fields: errors.array(),
});

export const getActDataValidation = (
  req: Request<any, any, any, ActRouteTypes["/acts/"]["GET"]["query"]>,
  _: Response<ActRouteTypes["/acts/"]["GET"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const getActDataValidator = [
  check("limit").optional().isInt(),
  check("page").optional().isInt(),
  check("sort-direction").optional().isIn(Object.keys(SortDirection)),
  check("sort-field").optional().isString(),
  check("keyword").optional().isString(),
];

export const addActDataValidation = (
  req: Request<any, any, ActRouteTypes["/acts/"]["POST"]["body"], any>,
  _: Response<ActRouteTypes["/acts/"]["POST"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const addActDataValidator = [
  body("name", "Invalid Name").isString().notEmpty(),
  body("price", "Invalid Price").isNumeric().notEmpty(),
  body("description", "Invalid Description").isString().notEmpty(),
];

export const getActDataByIdValidation = (
  req: Request<ActRouteTypes["/acts/:id"]["GET"]["params"], any, any, any>,
  _: Response<ActRouteTypes["/acts/:id"]["GET"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const getActDataByIdValidator = [check("id").isMongoId()];

export const updateActDataValidation = (
  req: Request<
    ActRouteTypes["/acts/:id"]["PATCH"]["params"],
    any,
    ActRouteTypes["/acts/:id"]["PATCH"]["body"],
    any
  >,
  _: Response<ActRouteTypes["/acts/:id"]["PATCH"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const updateActDataValidator = [
  check("id").isMongoId(),
  body("name", "Invalid Name").optional().isString().notEmpty(),
  body("price", "Invalid Price").optional().isNumeric().notEmpty(),
  body("description", "Invalid Description").optional().isString().notEmpty(),
];

export const deleteActDataValidation = (
  req: Request<ActRouteTypes["/acts/:id"]["DELETE"]["params"], any, any, any>,
  _: Response<ActRouteTypes["/acts/:id"]["DELETE"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const deleteActDataValidator = [check("id").isMongoId()];
