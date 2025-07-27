import { MedicalHistoryRouteTypes } from "@nizar-repo/medical-histories-types";
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

export const addMedicalHistoryDataValidation = (
  req: Request<
    any,
    any,
    MedicalHistoryRouteTypes["/medical-histories/"]["POST"]["body"],
    any
  >,
  _: Response<
    MedicalHistoryRouteTypes["/medical-histories/"]["POST"]["response"]
  >,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const addMedicalHistoryDataValidator = [
  body("appointmentIds").isArray().withMessage("Invalid Appointment IDs"),
];

export const getMedicalHistoryDataByIdValidation = (
  req: Request<
    MedicalHistoryRouteTypes["/medical-histories/:id"]["GET"]["params"],
    any,
    any,
    any
  >,
  _: Response<
    MedicalHistoryRouteTypes["/medical-histories/:id"]["GET"]["response"]
  >,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const getMedicalHistoryDataByIdValidator = [
  check("id").isMongoId(),
  check("limit").optional().isInt(),
  check("page").optional().isInt(),
  check("sort-direction").optional().isIn(Object.keys(SortDirection)),
  check("sort-field").optional().isString(),
  check("keyword").optional().isString(),
];

export const deleteMedicalHistoryDataValidation = (
  req: Request<
    MedicalHistoryRouteTypes["/medical-histories/:id"]["DELETE"]["params"],
    any,
    any,
    any
  >,
  _: Response<
    MedicalHistoryRouteTypes["/medical-histories/:id"]["DELETE"]["response"]
  >,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const deleteMedicalHistoryDataValidator = [check("id").isMongoId()];
