import { CategoryRouteTypes } from "@nizar-repo/categories-types";
import { SortDirection } from "@nizar-repo/shared-types/PaginationTypes";
import { NextFunction, Request, Response } from "express";
import {
  body,
  check,
  Result,
  ValidationError,
  validationResult,
} from "express-validator";
import createHttpError from "http-errors";

const formatErrors = (errors: Result<ValidationError>) => ({
  fields: errors.array(),
});

export const getCategoriesValidation = (
  req: Request<
    any,
    any,
    any,
    CategoryRouteTypes["/categories/"]["GET"]["query"]
  >,
  _: Response<CategoryRouteTypes["/categories/"]["GET"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const getCategoriesValidator = [
  check("limit").optional().isInt(),
  check("page").optional().isInt(),
  check("sort-direction").optional().isIn(Object.keys(SortDirection)),
  check("sort-field").optional().isString(),
  check("keyword").optional().isString(),
];

export const addCategoryValidation = (
  req: Request<
    any,
    any,
    CategoryRouteTypes["/categories/"]["POST"]["body"],
    any
  >,
  _: Response<CategoryRouteTypes["/categories/"]["POST"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const addCategoryValidator = [
  body("title", "Invalid Title").isString(),
  body("description", "Invalid Description").isString(),
  body("imgUrl", "Invalid Image Url").optional().isString(),
];

export const getCategoryByIdValidation = (
  req: Request<
    CategoryRouteTypes["/categories/:id"]["GET"]["params"],
    any,
    any,
    any
  >,
  _: Response<CategoryRouteTypes["/categories/:id"]["GET"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const getCategoryByIdValidator = [check("id").isMongoId()];

export const updateCategoryValidation = (
  req: Request<
    CategoryRouteTypes["/categories/:id"]["PATCH"]["params"],
    any,
    CategoryRouteTypes["/categories/:id"]["PATCH"]["body"],
    any
  >,
  _: Response<CategoryRouteTypes["/categories/:id"]["PATCH"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const updateCategoryValidator = [
  check("id").isMongoId(),
  body("title", "Invalid Title").optional().isString(),
  body("description", "Invalid Description").optional().isString(),
  body("imgUrl", "Invalid Image Url").optional().isString(),
];

export const deleteCategoryValidation = (
  req: Request<
    CategoryRouteTypes["/categories/:id"]["DELETE"]["params"],
    any,
    any,
    any
  >,
  _: Response<CategoryRouteTypes["/categories/:id"]["DELETE"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const deleteCategoryValidator = [check("id").isMongoId()];

export const addCategoryBulkValidation = (
  req: Request<
    any,
    any,
    CategoryRouteTypes["/categories/bulk"]["POST"]["body"],
    any
  >,
  _: Response<CategoryRouteTypes["/categories/bulk"]["POST"]["response"]>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw createHttpError(422, formatErrors(errors));
};

export const addCategoryBulkValidator = [
  body().isArray(),
  body("*.title", "Invalid Title").isString(),
  body("*.description", "Invalid Description").isString(),
  body("*.imgUrl", "Invalid Image Url").optional().isString(),
];
