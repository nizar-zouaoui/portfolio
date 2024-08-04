import { Request, Response } from "express";
import * as testServices from "../../services/test-service";
import { TestType } from "../../models";

export const getTestData = async (_req: Request, res: Response) => {
  const response = await testServices.getTestData();
  res.status(200).send(response);
};

export const getTestDataById = async (
  req: Request<{ id: string }, unknown, unknown, unknown>,
  res: Response<unknown, TestType>
) => {
  const response = await testServices.getTestDataById(req.params.id);
  res.status(200).send(response);
};

export const addTestData = async (
  req: Request<unknown, unknown, TestType, unknown>,
  res: Response<unknown, Record<string, any>>
) => {
  await testServices.addTestData(req.body);
  res.status(201).send("OK");
};

export const updateTestData = async (
  req: Request<{ id: string }, unknown, TestType, unknown>,
  res: Response<unknown, Record<string, any>>
) => {
  await testServices.updateTestData(req.params.id, req.body);
  res.status(200).send("OK");
};

export const deleteTestData = async (
  req: Request<{ id: string }, unknown, unknown, unknown>,
  res: Response<unknown, Record<string, any>>
) => {
  await testServices.deleteTestData(req.params.id);
  res.status(200).send("OK");
};
