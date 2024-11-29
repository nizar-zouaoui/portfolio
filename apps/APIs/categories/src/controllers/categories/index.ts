import { CategoryRouteTypes } from "@nizar-repo/categories-types";
import { TokenPayloadType } from "@nizar-repo/route-protection/tokenPayloadType";
import { Request, Response } from "express";
import * as categoryServices from "services/categories";

export const getCategories = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    CategoryRouteTypes["/categories/"]["GET"]["query"]
  >,
  res: Response<
    CategoryRouteTypes["/categories/"]["GET"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const response = await categoryServices.getCategories(
    res.locals.token.userId,
    req.query
  );
  res.status(200).send(response);
};

export const getAllCategoriesTitles = async (
  _: Request<unknown, unknown, unknown, unknown>,
  res: Response<
    CategoryRouteTypes["/categories/all-titles"]["GET"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const response = await categoryServices.getAllCategoriesTitles(
    res.locals.token.userId
  );
  res.status(200).send(response);
};

export const getCategoryById = async (
  req: Request<
    CategoryRouteTypes["/categories/:id"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  res: Response<
    CategoryRouteTypes["/categories/:id"]["GET"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const response = await categoryServices.getCategoryById(
    req.params.id,
    res.locals.token.userId
  );
  res.status(200).send(response);
};

export const addCategory = async (
  req: Request<
    unknown,
    unknown,
    CategoryRouteTypes["/categories/"]["POST"]["body"],
    unknown
  >,
  res: Response<
    CategoryRouteTypes["/categories/"]["POST"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await categoryServices.addCategory(req.body, res.locals.token.userId);
  res.status(201).send("OK");
};

export const updateCategory = async (
  req: Request<
    CategoryRouteTypes["/categories/:id"]["PATCH"]["params"],
    unknown,
    CategoryRouteTypes["/categories/:id"]["PATCH"]["body"],
    unknown
  >,
  res: Response<
    CategoryRouteTypes["/categories/:id"]["PATCH"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await categoryServices.updateCategory(
    req.params.id,
    req.body,
    res.locals.token.userId
  );
  res.status(200).send("OK");
};

export const deleteCategory = async (
  req: Request<
    CategoryRouteTypes["/categories/:id"]["DELETE"]["params"],
    unknown,
    unknown,
    unknown
  >,
  res: Response<
    CategoryRouteTypes["/categories/:id"]["DELETE"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await categoryServices.deleteCategory(req.params.id, res.locals.token.userId);
  res.status(200).send("OK");
};

export const addCategoryBulk = async (
  req: Request<
    unknown,
    unknown,
    CategoryRouteTypes["/categories/bulk"]["POST"]["body"],
    unknown
  >,
  res: Response<
    CategoryRouteTypes["/categories/bulk"]["POST"]["response"],
    { token: TokenPayloadType }
  >
) => {
  await categoryServices.addCategoryBulk(req.body, res.locals.token.userId);
  res.status(201).send("OK");
};
