import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import {
  ACCESS_PRIVILEGE,
  IAccessResource,
  RESOURCE,
  UserRouteTypes,
} from "@nizar-repo/auth-types";
import createHttpError from "http-errors";
import { formatValidationErrors } from "helpers/formatValidationErrors";

export const createUserValidation = (
  req: Request<any, any, UserRouteTypes["/users/"]["POST"]["body"], any>,
  _: Response<UserRouteTypes["/users/"]["POST"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatValidationErrors(errors));
};

export const createUserValidator = [
  body("username", "Invalid username").isString(),
  body("email", "Invalid email").isString().isEmail(),
];

export const updateUserValidation = (
  req: Request<
    UserRouteTypes["/users/:id"]["PATCH"]["params"],
    any,
    UserRouteTypes["/users/:id"]["PATCH"]["body"],
    any
  >,
  _: Response<UserRouteTypes["/users/:id"]["PATCH"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatValidationErrors(errors));
};

export const updateUserValidator = [
  param("id", "Invalid Object ID").isMongoId(),
  body("username", "Invalid username").optional().isString(),
  body("email", "Invalid email").optional().isString().isEmail(),
];

export const updateMeValidation = (
  req: Request<any, any, UserRouteTypes["/users/me"]["PATCH"]["body"], any>,
  _: Response<UserRouteTypes["/users/me"]["PATCH"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatValidationErrors(errors));
};

export const updateMeValidator = [
  body("username", "Invalid username").optional().isString(),
  body("email", "Invalid email").optional().isString().isEmail(),
];

export const getUserByIdValidation = (
  req: Request<UserRouteTypes["/users/:id"]["GET"]["params"], any, any, any>,
  _: Response<UserRouteTypes["/users/:id"]["GET"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatValidationErrors(errors));
};

export const getUserByIdValidator = [
  param("id", "Invalid Object ID").isMongoId(),
];

export const deleteUserValidation = (
  req: Request<UserRouteTypes["/users/:id"]["DELETE"]["params"], any, any, any>,
  _: Response<UserRouteTypes["/users/:id"]["DELETE"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatValidationErrors(errors));
};

export const deleteUserValidator = [
  param("id", "Invalid Object ID").isMongoId(),
];
