import { ACCESS_PRIVILEGE, RESOURCE } from "@nizar-repo/auth-types";
import {
  DEFAULT_ROLES_NAMES,
  godRole,
} from "@nizar-repo/auth-types/enums/defaultRoles";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { createSecureToken, validateTokenSecure } from "./secureJWT";
import { IAccessResource, IRole, TokenPayloadType } from "./tokenPayloadType";

export const protectRoute =
  (accessPrivilege: ACCESS_PRIVILEGE, resource: RESOURCE) =>
  (
    req: Request<any, any, any, any>,
    res: Response<any>,
    next: NextFunction
  ) => {
    try {
      const authHeader = req.get("Authorization");
      const decodedToken = validateTokenSecure(authHeader);

      res.locals.token = decodedToken;

      validateRole(decodedToken.role, {
        accessPrivilege,
        resource,
      });

      return next();
    } catch (error) {
      return next(error);
    }
  };

// Legacy function - marked as deprecated
/** @deprecated Use validateTokenSecure instead */
export const validateToken = (authHeader: string | undefined) => {
  console.warn("validateToken is deprecated. Use validateTokenSecure instead.");
  return validateTokenSecure(authHeader);
};

const validateRole = (role: IRole, requiredAccessResource: IAccessResource) => {
  // Enhanced security: prevent wildcard abuse
  if (role.name === DEFAULT_ROLES_NAMES.GOD) {
    // Log god role usage for security monitoring
    console.warn(
      `God role accessed for resource: ${requiredAccessResource.resource}`
    );
    return true;
  }

  const hasAccess = role.accessResources.some((accessResource) => {
    // More restrictive wildcard handling
    const privilegeMatch =
      accessResource.accessPrivilege ===
        requiredAccessResource.accessPrivilege ||
      (accessResource.accessPrivilege === "*" &&
        role.name === DEFAULT_ROLES_NAMES.GOD);

    const resourceMatch =
      accessResource.resource === requiredAccessResource.resource ||
      (accessResource.resource === "*" &&
        role.name === DEFAULT_ROLES_NAMES.GOD);

    return privilegeMatch && resourceMatch;
  });

  if (!hasAccess) {
    // Enhanced error logging for security monitoring
    console.warn(
      `Unauthorized access attempt: ${role.name} tried to access ${requiredAccessResource.resource} with ${requiredAccessResource.accessPrivilege}`
    );
    throw createError(403, `Insufficient permissions for this resource`);
  }

  return hasAccess;
};

/**
 * @deprecated This function should only be used in development/testing
 * Creates a token with god role - USE WITH EXTREME CAUTION
 */
export const createFakeToken = () => {
  if (process.env.NODE_ENV === "production") {
    throw createError(403, "Fake token creation is not allowed in production");
  }

  console.warn(
    "WARNING: Creating fake god token - this should only be used in development!"
  );

  const payload: Omit<TokenPayloadType, "iat" | "exp"> = {
    userId: "dev-user",
    email: "dev@example.com",
    role: godRole,
  };

  return createSecureToken(payload);
};
