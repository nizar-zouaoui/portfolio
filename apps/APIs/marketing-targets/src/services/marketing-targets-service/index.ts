import { IMarketingTarget } from "@nizar-repo/marketing-targets-types";
import MarketingTargets from "models";

export const getMarketingTargetData = async () => {
  const marketingTargetData = await MarketingTargets.find();
  return marketingTargetData;
};

export const getMarketingTargetDataById = async (id: string) => {
  const marketingTargetData = await MarketingTargets.findById(id);
  return marketingTargetData;
};

export const addMarketingTargetData = async (data: IMarketingTarget) => {
  await MarketingTargets.create(data);
  return "OK";
};

export const updateMarketingTargetData = async (
  id: string,
  data: Partial<IMarketingTarget>
) => {
  const marketingTargetData = await MarketingTargets.findByIdAndUpdate(
    id,
    data
  );
  return marketingTargetData;
};

export const deleteMarketingTargetData = async (id: string) => {
  const marketingTargetData = await MarketingTargets.findByIdAndDelete(id);
  return marketingTargetData;
};
