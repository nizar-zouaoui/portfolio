import { Result, ValidationError } from "express-validator";

export const formatValidationErrors = (errors: Result<ValidationError>) => ({
    fields: errors.array(),
  });