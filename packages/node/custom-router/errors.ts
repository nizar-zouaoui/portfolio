import createHttpError from "http-errors";
import { mongo } from "mongoose";

export const getDuplicateFieldsError = (
  duplicateFields: string[],
  error: mongo.MongoServerError
) =>
  createHttpError(400, {
    message: "Duplicate keys",
    fields: duplicateFields.map((field) => ({
      type: "field",
      value: error.keyValue[field],
      msg: `Please provide another value for ${field}, because it's already in use and it's a unique prop!`,
      path: field,
      location: "body",
    })),
  });

export const handleDuplicateFieldsError = (error: unknown): unknown => {
  if (error instanceof mongo.MongoBulkWriteError && error.code === 11000) {
    if (Array.isArray(error.writeErrors)) {
      return createHttpError(400, {
        message: "Duplicate keys, one or more elements are duplicated",
      });
    }

    const duplicateFields = Object.keys(error.keyPattern);
    return getDuplicateFieldsError(duplicateFields, error);
  }

  if (error instanceof mongo.MongoServerError && error.code === 11000) {
    const duplicateFields = Object.keys(error.keyPattern);
    return getDuplicateFieldsError(duplicateFields, error);
  }

  return error;
};
