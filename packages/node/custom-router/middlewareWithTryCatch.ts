import { IMiddleware } from "./IMiddleware";
import {
  createSecureErrorResponse,
  ErrorWithDetails,
  sanitizeErrorMessage,
} from "./secureErrorHandling";

const middlewareWithTryCatch = <T extends IMiddleware>(middleware: T): T =>
  (async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (error) {
      const errorWithDetails = error as ErrorWithDetails;

      // Sanitize error message
      if (errorWithDetails.message) {
        errorWithDetails.message = sanitizeErrorMessage(
          errorWithDetails.message
        );
      }

      // Create secure error response
      const secureErrorResponse = createSecureErrorResponse(errorWithDetails);

      // Determine status code safely
      const statusCode =
        errorWithDetails.status || errorWithDetails.statusCode || 500;

      return res.status(statusCode).json(secureErrorResponse);
    }
  }) as T;

export default middlewareWithTryCatch;
