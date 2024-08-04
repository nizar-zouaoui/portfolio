import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import {
  ACCESS_PRIVILEGE,
  IAccessResource,
  RESOURCE,
  RoleRouteTypes,
} from "@nizar-repo/auth-types";
import createHttpError from "http-errors";
import { formatValidationErrors } from "helpers/formatValidationErrors";

export const createRoleValidation = (
  req: Request<any, any, RoleRouteTypes["/roles/"]["POST"]["body"], any>,
  _: Response<RoleRouteTypes["/roles/"]["POST"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatValidationErrors(errors));
};

export const createRoleValidator = [
  body("name", "Invalid name").isString(),
  body("accessResources", "Invalid access resources").isArray(),
  body("accessResources.*.accessPrivilege")
    .isIn(Object.values(ACCESS_PRIVILEGE))
    .withMessage("Invalid accessPrivilege"),
  body("accessResources.*.resource")
    .isIn(Object.values(RESOURCE))
    .withMessage("Invalid resource"),
];

export const updateRoleValidation = (
  req: Request<
    RoleRouteTypes["/roles/:id"]["PATCH"]["params"],
    any,
    RoleRouteTypes["/roles/:id"]["PATCH"]["body"],
    any
  >,
  _: Response<RoleRouteTypes["/roles/:id"]["PATCH"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatValidationErrors(errors));
};

export const updateRoleValidator = [
  param("id", "Invalid Object ID").isMongoId(),
  body("name", "Invalid name").optional().isString(),
  body("accessResources", "Invalid access resources")
    .optional()
    .isArray()
    .custom((accessResources: IAccessResource[]) => {
      if (accessResources) {
        accessResources.forEach((accessResource: any) => {
          if (
            !Object.values(ACCESS_PRIVILEGE).includes(
              accessResource.accessPrivilege
            )
          ) {
            throw new Error("Invalid accessPrivilege");
          }
          if (!Object.values(RESOURCE).includes(accessResource.resource)) {
            throw new Error("Invalid resource");
          }
        });
      }
      return true;
    }),
];

export const getRoleByIdValidation = (
  req: Request<RoleRouteTypes["/roles/:id"]["GET"]["params"], any, any, any>,
  _: Response<RoleRouteTypes["/roles/:id"]["GET"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatValidationErrors(errors));
};

export const getRoleByIdValidator = [
  param("id", "Invalid Object ID").isMongoId(),
];

export const deleteRoleValidation = (
  req: Request<RoleRouteTypes["/roles/:id"]["DELETE"]["params"], any, any, any>,
  _: Response<RoleRouteTypes["/roles/:id"]["DELETE"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatValidationErrors(errors));
};

export const deleteRoleValidator = [
  param("id", "Invalid Object ID").isMongoId(),
];

export const assignRoleValidation = (
  req: Request<
    any,
    any,
    RoleRouteTypes["/roles/assign-role"]["POST"]["body"],
    any
  >,
  _: Response<RoleRouteTypes["/roles/assign-role"]["POST"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatValidationErrors(errors));
};

export const assignRoleValidator = [
  body("userId", "Invalid Object user Id").isMongoId(),
  body("roleId", "Invalid Object role Id").isMongoId(),
];
