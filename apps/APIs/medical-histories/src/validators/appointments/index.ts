import { AppointmentRouteTypes } from "@nizar-repo/medical-histories-types";
import { PAYMENT_STATUS } from "@nizar-repo/medical-histories-types/enums";
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

const paymentStatuses = Object.values(PAYMENT_STATUS).map((status) => status);

export const addAppointmentDataValidation = (
  req: Request<
    AppointmentRouteTypes["/appointments/:medicalHistoryId"]["POST"]["params"],
    any,
    AppointmentRouteTypes["/appointments/:medicalHistoryId"]["POST"]["body"],
    any
  >,
  _: Response<
    AppointmentRouteTypes["/appointments/:medicalHistoryId"]["POST"]["response"]
  >,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const addAppointmentDataValidator = [
  body("date")
    .custom((value) => {
      if (value) {
        return !isNaN(Date.parse(value));
      }
      return true;
    })
    .withMessage("Invalid Birth Date"),
  body("notes", "Invalid Notes").isString().optional(),
  body("paymentStatus", "Invalid Payment Status")
    .isString()
    .isIn(paymentStatuses)
    .notEmpty(),
  body("actIds", "Invalid Act IDs").isArray().notEmpty(),
  body("actIds.*", "Invalid Act ID").isMongoId(),
  body("confirmedPrice", "Invalid Confirmed Price").isNumeric().notEmpty(),
  check("medicalHistoryId", "Invalid Medical History ID")
    .isMongoId()
    .notEmpty(),
];

export const getAppointmentDataByIdValidation = (
  req: Request<
    AppointmentRouteTypes["/appointments/:id"]["GET"]["params"],
    any,
    any,
    any
  >,
  _: Response<AppointmentRouteTypes["/appointments/:id"]["GET"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const getAppointmentDataByIdValidator = [check("id").isMongoId()];

export const updateAppointmentDataValidation = (
  req: Request<
    AppointmentRouteTypes["/appointments/:id"]["PATCH"]["params"],
    any,
    AppointmentRouteTypes["/appointments/:id"]["PATCH"]["body"],
    any
  >,
  _: Response<AppointmentRouteTypes["/appointments/:id"]["PATCH"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const updateAppointmentDataValidator = [
  check("id").isMongoId(),
  body("date")
    .custom((value) => {
      if (value) {
        return !isNaN(Date.parse(value));
      }
      return true;
    })
    .withMessage("Invalid Birth Date")
    .optional(),
  body("notes", "Invalid Notes").isString().optional(),
  body("paymentStatus", "Invalid Payment Status")
    .isString()
    .isIn(paymentStatuses)
    .optional(),
  body("actIds", "Invalid Act IDs").isArray().optional(),
  body("actIds.*", "Invalid Act ID").isMongoId().optional(),
  body("confirmedPrice", "Invalid Confirmed Price").isNumeric().optional(),
];

export const deleteAppointmentDataValidation = (
  req: Request<
    AppointmentRouteTypes["/appointments/:id"]["DELETE"]["params"],
    any,
    any,
    any
  >,
  _: Response<AppointmentRouteTypes["/appointments/:id"]["DELETE"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const deleteAppointmentDataValidator = [check("id").isMongoId()];
