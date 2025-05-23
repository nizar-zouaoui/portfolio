import { ACCESS_PRIVILEGE, RESOURCE } from "@nizar-repo/auth-types";
import {
  DEFAULT_ROLES_NAMES,
  godRole,
} from "@nizar-repo/auth-types/enums/defaultRoles";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { sign, verify } from "jsonwebtoken";
import { IAccessResource, IRole, TokenPayloadType } from "./tokenPayloadType";

export const protectRoute =
  (accessPrivilege: ACCESS_PRIVILEGE, resource: RESOURCE) =>
  (
    req: Request<any, any, any, any>,
    res: Response<any>,
    next: NextFunction
  ) => {
    const authHeader = req.get("Authorization");
    const decodedToken = validateToken(authHeader);

    res.locals.token = decodedToken;

    validateRole(decodedToken.role, {
      accessPrivilege,
      resource,
    });
    return next();
  };

export const validateToken = (authHeader: string | undefined) => {
  if (!process.env.JWT_SECRET_KEY)
    throw createError(500, "JWT_SECRET_KEY env is not provided!");
  if (authHeader === undefined) {
    throw createError(403, "No header provided!");
  }
  const token = authHeader.split(" ")[1];
  debugger;
  const decodedToken = verify(
    token,
    process.env.JWT_SECRET_KEY
  ) as TokenPayloadType;
  if (!decodedToken) throw createError(403, "Malformed or expired token!");
  return decodedToken;
};

const validateRole = (role: IRole, requiredAccessResource: IAccessResource) => {
  const hasAccess =
    role.name === DEFAULT_ROLES_NAMES.GOD ||
    role.accessResources.some(
      (accessResource) =>
        (accessResource.accessPrivilege === "*" ||
          accessResource.accessPrivilege ===
            requiredAccessResource.accessPrivilege) &&
        (accessResource.resource === "*" ||
          accessResource.resource === requiredAccessResource.resource)
    );

  if (!hasAccess) {
    throw createError(
      403,
      `Unauthorized Access to resource ${requiredAccessResource.resource}`
    );
  }
  return hasAccess;
};

export const createFakeToken = () => {
  if (!process.env.JWT_SECRET_KEY)
    throw createError(500, "JWT_SECRET_KEY env is not provided!");
  const payload = {
    role: godRole,
  };
  return sign(payload, process.env.JWT_SECRET_KEY);
};
