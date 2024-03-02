import { Request, Response, NextFunction } from "express";
import { ApiError } from "./types";

const globalErrorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("err");
  console.log(err);
  console.log("err");
  return res.status(err.status).json({ message: err.message });
};
export default globalErrorHandler;
