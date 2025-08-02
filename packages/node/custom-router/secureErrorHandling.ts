/**
 * Secure error handling utilities
 */

import { ValidationError } from "express-validator";

export interface SecureErrorResponse {
  message: string;
  fields?: ValidationError[];
  code?: string;
  timestamp: string;
  requestId?: string;
}

export interface ErrorWithDetails extends Error {
  status?: number;
  statusCode?: number;
  fields?: ValidationError[];
  code?: string;
}

/**
 * Creates a secure error response without exposing sensitive information
 */
export const createSecureErrorResponse = (
  error: ErrorWithDetails,
  isDevelopment: boolean = process.env.NODE_ENV === "development"
): SecureErrorResponse => {
  const baseResponse: SecureErrorResponse = {
    message: error.message || "An error occurred",
    timestamp: new Date().toISOString(),
  };

  // Only include stack traces in development
  if (isDevelopment && error.stack) {
    (baseResponse as any).stack = error.stack;
  }

  // Include validation fields if present
  if (error.fields) {
    baseResponse.fields = error.fields;
  }

  // Include error code if present
  if (error.code) {
    baseResponse.code = error.code;
  }

  return baseResponse;
};

/**
 * Sanitizes error messages to prevent information disclosure
 */
export const sanitizeErrorMessage = (message: string): string => {
  // Remove file paths
  const withoutPaths = message.replace(/\/[^\s]*/g, "[PATH_REMOVED]");

  // Remove potential sensitive information patterns
  const withoutSensitive = withoutPaths
    .replace(/password[=:]\s*\S+/gi, "password=[REDACTED]")
    .replace(/token[=:]\s*\S+/gi, "token=[REDACTED]")
    .replace(/key[=:]\s*\S+/gi, "key=[REDACTED]");

  return withoutSensitive;
};
