import { Request, Response } from "express";
import fs from "fs";
import * as csvParserServices from "services/csv-parser";

export const parseCsv = async (req: Request, res: Response) => {
  const filePath = req.file?.path;

  const { validRows, invalidRows } = await csvParserServices.parseCsv(filePath);

  fs.unlinkSync(filePath);

  res.status(200).send({ validRows, invalidRows });
};
