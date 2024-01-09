import { Request, Response } from "express";
import * as projectServices from "../../services/projects";

export const getControllerTest = (req: Request, res: Response) => {
  const response = projectServices.getServiceTest();
  res.status(200).send(response);
};
