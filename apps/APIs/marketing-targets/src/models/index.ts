import { LeanMarketingTargetDocument } from "@nizar-repo/marketing-targets-types";
import { Model, model, Schema, Types } from "mongoose";

const marketingTargetsSchema = new Schema<
  LeanMarketingTargetDocument,
  Model<LeanMarketingTargetDocument>
>(
  {
    email: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const MarketingTargets = model("MarketingTargets", marketingTargetsSchema);

export default MarketingTargets;
