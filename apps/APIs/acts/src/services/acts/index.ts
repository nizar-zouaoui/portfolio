import { IAct } from "@nizar-repo/acts-types";
import { handleDuplicateFieldsError } from "@nizar-repo/custom-router/errors";
import { PaginationQuery } from "@nizar-repo/shared-types/PaginationTypes";
import createHttpError from "http-errors";
import Acts from "models";

export const getActData = async (query: PaginationQuery) => {
  const actData = await Acts.findPaginated(query);
  return actData;
};

export const getActDataById = async (id: string) => {
  const actData = await Acts.findOne({
    _id: id,
  });
  if (!actData) {
    throw createHttpError(404, "Act not found");
  }
  return actData;
};

export const addActData = async (data: IAct) => {
  try {
    await Acts.create({ ...data });
  } catch (error) {
    throw handleDuplicateFieldsError(error);
  }
};

export const updateActData = async (id: string, data: Partial<IAct>) => {
  try {
    const actData = await Acts.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!actData) {
      throw createHttpError(404, "Act not found");
    }
  } catch (error) {
    throw handleDuplicateFieldsError(error);
  }
};

export const deleteActData = async (id: string) => {
  const actData = await Acts.findOneAndDelete({
    _id: id,
  });
  if (!actData) {
    throw createHttpError(404, "Act not found");
  }
};
