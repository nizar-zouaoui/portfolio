/**
 * Secure JWT utilities
 */

import createError from "http-errors";
import {
  JsonWebTokenError,
  sign,
  TokenExpiredError,
  verify,
} from "jsonwebtoken";
import { TokenPayloadType } from "./tokenPayloadType";

export interface JWTConfig {
  secret: string;
  expiresIn?: string;
  issuer?: string;
  audience?: string;
}

export interface TokenValidationResult {
  isValid: boolean;
  payload?: TokenPayloadType;
  error?: string;
}

/**
 * Securely validates JWT configuration
 */
export const validateJWTConfig = (): JWTConfig => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    throw createError(500, "JWT configuration is missing");
  }

  // Validate secret strength
  if (secret.length < 32) {
    throw createError(500, "JWT secret must be at least 32 characters long");
  }

  return {
    secret,
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    issuer: process.env.JWT_ISSUER || "medical-app",
    audience: process.env.JWT_AUDIENCE || "medical-app-users",
  };
};

/**
 * Securely validates authorization header format
 */
export const validateAuthHeader = (authHeader: string | undefined): string => {
  if (!authHeader) {
    throw createError(401, "Authorization header is required");
  }

  // Check Bearer token format
  const bearerMatch = authHeader.match(
    /^Bearer\s+([A-Za-z0-9\-_=]+\.[A-Za-z0-9\-_=]+\.[A-Za-z0-9\-_=]+)$/
  );

  if (!bearerMatch) {
    throw createError(
      401,
      "Invalid authorization header format. Expected: Bearer <token>"
    );
  }

  return bearerMatch[1];
};

/**
 * Securely validates and decodes JWT token
 */
export const validateTokenSecure = (
  authHeader: string | undefined
): TokenPayloadType => {
  const config = validateJWTConfig();
  const token = validateAuthHeader(authHeader);

  try {
    const decoded = verify(token, config.secret, {
      issuer: config.issuer,
      audience: config.audience,
      algorithms: ["HS256"], // Explicitly specify allowed algorithms
    }) as TokenPayloadType;

    if (!decoded || !decoded.userId || !decoded.email || !decoded.role) {
      throw createError(401, "Invalid token payload");
    }

    return decoded;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw createError(401, "Token has expired");
    } else if (error instanceof JsonWebTokenError) {
      throw createError(401, "Invalid token");
    } else {
      throw error;
    }
  }
};

/**
 * Creates a secure JWT token with proper configuration
 */
export const createSecureToken = (
  payload: Omit<TokenPayloadType, "iat" | "exp">
): string => {
  const config = validateJWTConfig();

  return sign(payload, config.secret, {
    expiresIn: config.expiresIn,
    issuer: config.issuer,
    audience: config.audience,
    algorithm: "HS256",
  });
};
