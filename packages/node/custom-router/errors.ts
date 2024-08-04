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
