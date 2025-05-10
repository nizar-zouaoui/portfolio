import { PatientRouteTypes } from "@nizar-repo/patients-types";
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
import { isValidNumber } from "libphonenumber-js";

const formatErrors = (errors: Result<ValidationError>) => ({
  fields: errors.array(),
});

export const getPatientDataValidation = (
  req: Request<any, any, any, PatientRouteTypes["/patients/"]["GET"]["query"]>,
  _: Response<PatientRouteTypes["/patients/"]["GET"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const getPatientDataValidator = [
  check("limit").optional().isInt(),
  check("page").optional().isInt(),
  check("sort-direction").optional().isIn(Object.keys(SortDirection)),
  check("sort-field").optional().isString(),
  check("keyword").optional().isString(),
];

export const addPatientDataValidation = (
  req: Request<any, any, PatientRouteTypes["/patients/"]["POST"]["body"], any>,
  _: Response<PatientRouteTypes["/patients/"]["POST"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const addPatientDataValidator = [
  body("email", "Invalid Email").optional().isEmail(),
  body("fullName", "Invalid Full Name")
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage(
      "Full Name can only contain letters, spaces, hyphens, and apostrophes."
    ),
  body("phoneNumber")
    .custom((value) => isValidNumber(value))
    .withMessage("Invalid Phone Number"),
  body("birthDate").isDate().withMessage("Invalid Birth Date"),
];

export const getPatientDataByIdValidation = (
  req: Request<
    PatientRouteTypes["/patients/:id"]["GET"]["params"],
    any,
    any,
    any
  >,
  _: Response<PatientRouteTypes["/patients/:id"]["GET"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const getPatientDataByIdValidator = [check("id").isMongoId()];

export const updatePatientDataValidation = (
  req: Request<
    PatientRouteTypes["/patients/:id"]["PATCH"]["params"],
    any,
    PatientRouteTypes["/patients/:id"]["PATCH"]["body"],
    any
  >,
  _: Response<PatientRouteTypes["/patients/:id"]["PATCH"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const updatePatientDataValidator = [
  check("id").isMongoId(),
  body("email", "Invalid Email").optional().isEmail(),
  body("fullName", "Invalid Full Name")
    .optional()
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage(
      "Full Name can only contain letters, spaces, hyphens, and apostrophes."
    ),
  body("phoneNumber")
    .optional()
    .custom((value) => isValidNumber(value))
    .withMessage("Invalid Phone Number"),
  body("birthDate").optional().isDate().withMessage("Invalid Birth Date"),
];

export const deletePatientDataValidation = (
  req: Request<
    PatientRouteTypes["/patients/:id"]["DELETE"]["params"],
    any,
    any,
    any
  >,
  _: Response<PatientRouteTypes["/patients/:id"]["DELETE"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const deletePatientDataValidator = [check("id").isMongoId()];

export const addPatientDataBulkValidation = (
  req: Request<
    any,
    any,
    PatientRouteTypes["/patients/bulk"]["POST"]["body"],
    any
  >,
  _: Response<PatientRouteTypes["/patients/bulk"]["POST"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};
// instead of checking req.body, i want to check res.locals.data
export const addPatientDataBulkValidator = [
  body("data").isArray(),
  body("data.*.email", "Invalid Email").isEmail(),
  body("data.*.fullName", "Invalid Full Name")
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage(
      "Full Name can only contain letters, spaces, hyphens, and apostrophes."
    ),
  body("data.*.phoneNumber")
    .custom((value) => isValidNumber(value))
    .withMessage("Invalid Phone Number"),
  body("data.*.birthDate")
    .optional()
    .isDate()
    .withMessage("Invalid Birth Date"),
];
