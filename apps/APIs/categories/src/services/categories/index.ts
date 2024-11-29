import { ICategory } from "@nizar-repo/categories-types";
import { PaginationQuery } from "@nizar-repo/shared-types/PaginationTypes";
import createHttpError from "http-errors";
import Category from "models";

export const getAllCategoriesTitles = async (userId: string) => {
  const categories = await Category.find(
    { userId },
    {
      title: 1,
    }
  ).lean();
  return categories;
};

export const getCategories = async (userId: string, query: PaginationQuery) => {
  const categories = await Category.findPaginated(userId, query);
  return categories;
};

export const getCategoryById = async (id: string, userId: string) => {
  const category = await Category.findOne({
    _id: id,
    userId,
  }).lean();
  if (!category) {
    throw createHttpError(404, "Marketing target not found");
  }
  return category;
};

export const addCategory = async (
  data: Omit<ICategory, "userId">,
  userId: string
) => Category.create({ ...data, userId });

export const updateCategory = async (
  id: string,
  data: Partial<ICategory>,
  userId: string
) => {
  const category = await Category.findOneAndUpdate({ _id: id, userId }, data, {
    new: true,
  });
  if (!category) {
    throw createHttpError(404, "Marketing target not found");
  }
};

export const deleteCategory = async (id: string, userId: string) => {
  const category = await Category.findOneAndDelete({
    _id: id,
    userId,
  });
  if (!category) {
    throw createHttpError(404, "Marketing target not found");
  }
};

export const addCategoryBulk = async (data: ICategory[], userId: string) =>
  Category.insertMany(data.map((d) => ({ ...d, userId })));
