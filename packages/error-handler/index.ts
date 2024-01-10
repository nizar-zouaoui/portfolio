import { Request, Response, NextFunction } from "express";
import { ApiError } from "./types";
import add from "@nizar-repo/calcs";
import multiply from "@nizar-repo/calcs/mult/multiply";

const globalErrorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(add(1, 2), multiply(1, 2));
  return res.status(err.status).json({ message: err.message });
};
export default globalErrorHandler;
