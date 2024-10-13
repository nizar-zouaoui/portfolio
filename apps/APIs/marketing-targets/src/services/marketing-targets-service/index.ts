import { IMarketingTarget } from "@nizar-repo/marketing-targets-types";
import MarketingTargets from "models";
import createHttpError from "http-errors";
import { handleDuplicateFieldsError } from "@nizar-repo/custom-router/errors";
import { PaginationQuery } from "@nizar-repo/shared-types/PaginationTypes";

export const getMarketingTargetData = async (
  userId: string,
  query: PaginationQuery
) => {
  const marketingTargetData = await MarketingTargets.findPaginated(
    userId,
    query
  );
  return marketingTargetData;
};

export const getMarketingTargetDataById = async (
  id: string,
  userId: string
) => {
  const marketingTargetData = await MarketingTargets.findOne({
    _id: id,
    userId,
  });
  if (!marketingTargetData) {
    throw createHttpError(404, "Marketing target not found");
  }
  return marketingTargetData;
};

export const addMarketingTargetData = async (
  data: IMarketingTarget,
  userId: string
) => {
  try {
    await MarketingTargets.create({ ...data, userId });
  } catch (error) {
    throw handleDuplicateFieldsError(error);
  }
};

export const updateMarketingTargetData = async (
  id: string,
  data: Partial<IMarketingTarget>,
  userId: string
) => {
  try {
    const marketingTargetData = await MarketingTargets.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true }
    );
    if (!marketingTargetData) {
      throw createHttpError(404, "Marketing target not found");
    }
  } catch (error) {
    throw handleDuplicateFieldsError(error);
  }
};

export const deleteMarketingTargetData = async (id: string, userId: string) => {
  const marketingTargetData = await MarketingTargets.findOneAndDelete({
    _id: id,
    userId,
  });
  if (!marketingTargetData) {
    throw createHttpError(404, "Marketing target not found");
  }
};

export const addMarketingTargetDataBulk = async (
  data: IMarketingTarget[],
  userId: string
) => {
  try {
    await MarketingTargets.insertMany(data.map((d) => ({ ...d, userId })));
  } catch (error) {
    throw handleDuplicateFieldsError(error);
  }
};
