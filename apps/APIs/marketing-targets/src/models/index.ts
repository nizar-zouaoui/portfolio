import {
  LeanMarketingTargetDocument,
  MarketingTargetModel,
  MarketingTargetsTypeStaticMethods,
} from "@nizar-repo/marketing-targets-types";
import { model, Schema } from "mongoose";
import {
  PaginatedResult,
  PaginationQuery,
} from "@nizar-repo/shared-types/PaginationTypes";
import getPaginationPipeline from "helpers/findPaginated";

const marketingTargetsSchema = new Schema<
  LeanMarketingTargetDocument,
  MarketingTargetModel
>(
  {
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    userId: { type: String, required: true, ref: "Users" },
  },
  { timestamps: true }
);

marketingTargetsSchema.index({ userId: 1, email: 1 }, { unique: true });
marketingTargetsSchema.index({ userId: 1, phoneNumber: 1 }, { unique: true });

const findPaginatedMarketingTargets: MarketingTargetsTypeStaticMethods["findPaginated"] =
  async function (
    this: MarketingTargetModel,
    userId: string,
    query: PaginationQuery
  ) {
    const limit = query.limit || 10;
    const page = query.page || 1;

    const [paginatedResult] = await this.aggregate<
      PaginatedResult<LeanMarketingTargetDocument>
    >(getPaginationPipeline(userId, query));

    return (
      paginatedResult || {
        data: [],
        hasNextPage: false,
        hasPreviousPage: false,
        totalPages: 0,
        currentPage: page,
      }
    );
  };
marketingTargetsSchema.static("findPaginated", findPaginatedMarketingTargets);

const MarketingTargets = model<
  LeanMarketingTargetDocument,
  MarketingTargetModel
>("MarketingTargets", marketingTargetsSchema);

export default MarketingTargets;
