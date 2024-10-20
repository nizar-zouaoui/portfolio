import {
  CategoriesTypeStaticMethods,
  CategoryModel,
  LeanCategoryDocument,
} from "@nizar-repo/categories-types";
import {
  PaginatedResult,
  PaginationQuery,
} from "@nizar-repo/shared-types/PaginationTypes";
import getPaginationPipeline from "helpers/findPaginated";
import { model, Schema } from "mongoose";

const categoriesSchema = new Schema<LeanCategoryDocument, CategoryModel>(
  {
    description: { type: String },
    title: { type: String, required: true },
    imgUrl: { type: String },
    userId: { type: String, required: true, ref: "Users" },
  },
  { timestamps: true }
);

const findPaginatedCategories: CategoriesTypeStaticMethods["findPaginated"] =
  async function (this: CategoryModel, userId: string, query: PaginationQuery) {
    const [paginatedResult] = await this.aggregate<
      PaginatedResult<LeanCategoryDocument>
    >(getPaginationPipeline(userId, query));

    return (
      paginatedResult || {
        data: [],
        hasNextPage: false,
        hasPreviousPage: false,
        totalPages: 0,
        currentPage: 0,
      }
    );
  };
categoriesSchema.static("findPaginated", findPaginatedCategories);

const Category = model<LeanCategoryDocument, CategoryModel>(
  "Category",
  categoriesSchema
);

export default Category;
