import {
  ActModel,
  ActsTypeStaticMethods,
  LeanActDocument,
} from "@nizar-repo/medical-histories-types";
import {
  PaginatedResult,
  PaginationQuery,
} from "@nizar-repo/shared-types/PaginationTypes";
import getPaginationPipeline from "helpers/findPaginatedActs";
import { model, Schema } from "mongoose";

const actsSchema = new Schema<LeanActDocument, ActModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

const findPaginatedActs: ActsTypeStaticMethods["findPaginated"] =
  async function (this: ActModel, query: PaginationQuery) {
    const page = query.page || 1;

    const [paginatedResult] = await this.aggregate<
      PaginatedResult<LeanActDocument>
    >(getPaginationPipeline(query));

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
actsSchema.static("findPaginated", findPaginatedActs);

const Acts = model<LeanActDocument, ActModel>("Acts", actsSchema);

export default Acts;
