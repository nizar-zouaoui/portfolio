import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { AuthRouteTypes } from "@nizar-repo/auth-types";
import createHttpError from "http-errors";
import { formatValidationErrors } from "helpers/formatValidationErrors";

export const classicSignInValidation = (
  req: Request<
    any,
    any,
    AuthRouteTypes["/auth/classic/login/"]["POST"]["body"],
    any
  >,
  _: Response<AuthRouteTypes["/auth/classic/login/"]["POST"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatValidationErrors(errors));
};

export const classicSignInValidator = [
  body("email", "Invalid email").isString().isEmail(),
  body("password", "Invalid password").isString(),
];

export const classicSignUpValidation = (
  req: Request<
    any,
    any,
    AuthRouteTypes["/auth/classic/sign-up/"]["POST"]["body"],
    any
  >,
  _: Response<AuthRouteTypes["/auth/classic/sign-up/"]["POST"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatValidationErrors(errors));
};

export const classicSignUpValidator = [
  body("email", "Invalid email").isString().isEmail(),
  body("password", "Invalid password").isString(),
  body("username", "Invalid username").isString(),
];
