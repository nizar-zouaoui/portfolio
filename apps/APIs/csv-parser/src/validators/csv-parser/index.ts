import { NextFunction, Request, Response } from "express";
import fs from "fs";
import createHttpError from "http-errors";

export const validateParseCsv = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { file } = req;
  if (!file) {
    throw createHttpError(400, {
      message: "File is required",
    });
  }
  const { mimetype, path, size } = file;
  if (!mimetype.includes("csv")) {
    fs.unlinkSync(path);
    throw createHttpError(400, {
      message: "Invalid file type",
    });
  }
  if (size > 500 * 1024 * 1024) {
    fs.unlinkSync(path);
    throw createHttpError(400, {
      message: "File size should be less than 500MB",
    });
  }
  next();
};
