import { NextFunction, Request, Response } from "express";
import { body, param, validationResult, check } from "express-validator";
import { TestType } from "../../models";
import createHttpError from "http-errors";

export const addTestDataValidation = (
  req: Request<any, any, TestType, any>,
  res: Response<unknown, Record<string, any>>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw {
    status: 422,
    message: errors
      .array()
      .map((el) => JSON.stringify(el))
      .join("\n"),
  };
};

export const addTestDataValidator = [
  body("playerName", "Invalid Player Name").optional().isAlpha(),
];

export const getTestDataByIdValidation = (
  req: Request<{ id: string }, any, any, any>,
  res: Response<unknown, Record<string, any>>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(
    422,
    errors
      .array()
      .map((el) => JSON.stringify(el))
      .join("\n")
  );
};

export const getTestDataByIdValidator = [check("id").isMongoId()];

export const updateTestDataValidation = (
  req: Request<{ id: string }, any, TestType, any>,
  res: Response<unknown, Record<string, any>>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(
    422,
    errors
      .array()
      .map((el) => JSON.stringify(el))
      .join("\n")
  );
};

export const updateTestDataValidator = [
  check("id").isMongoId(),
  body("playerName", "Invalid Player Name").optional().isAlpha(),
];

export const deleteTestDataValidation = (
  req: Request<{ id: string }, any, any, any>,
  res: Response<unknown, Record<string, any>>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(
    422,
    errors
      .array()
      .map((el) => JSON.stringify(el))
      .join("\n")
  );
};

export const deleteTestDataValidator = [check("id").isMongoId()];
