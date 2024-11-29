import { NextFunction, Request, Response } from "express";
import {
  body,
  check,
  Result,
  ValidationError,
  validationResult,
} from "express-validator";
import createHttpError from "http-errors";
import { TestType } from "models";

const formatErrors = (errors: Result<ValidationError>) => ({
  fields: errors.array(),
});
export const addTestDataValidation = (
  req: Request<any, any, TestType, any>,
  _: Response<unknown, Record<string, any>>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const addTestDataValidator = [
  body("playerName", "Invalid Player Name").optional().isAlpha(),
];

export const getTestDataByIdValidation = (
  req: Request<{ id: string }, any, any, any>,
  _: Response<unknown, Record<string, any>>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const getTestDataByIdValidator = [check("id").isMongoId()];

export const updateTestDataValidation = (
  req: Request<{ id: string }, any, TestType, any>,
  _: Response<unknown, Record<string, any>>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const updateTestDataValidator = [
  check("id").isMongoId(),
  body("playerName", "Invalid Player Name").optional().isAlpha(),
];

export const deleteTestDataValidation = (
  req: Request<{ id: string }, any, any, any>,
  _: Response<unknown, Record<string, any>>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const deleteTestDataValidator = [check("id").isMongoId()];
