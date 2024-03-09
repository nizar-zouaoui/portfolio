/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AxiosError } from "axios";
import { IMiddleware } from "./IMiddleware";
import { ValidationError } from "express-validator";
type ErrorType = {
  stack?: string;
  message: string;
  fields?: ValidationError[];
};
const middlewareWithTryCatch = <T extends IMiddleware>(middleware: T): T =>
  (async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (error) {
      // @ts-ignore
      console.log(error);
      // @ts-ignore
      const errorResponse: ErrorType = {
        stack: error instanceof Error ? error.stack : "unknown",
        message: error instanceof Error ? error.message : "unknown",
      };
      // @ts-ignore
      if (error.fields) errorResponse.fields = error.fields;
      return (
        res
          // @ts-ignore
          .status(error.status || error.statusCode || 500)
          .send(errorResponse)
      );
    }
  }) as T;

export default middlewareWithTryCatch;
