import {
  PaginationQuery,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";
import { PipelineStage } from "mongoose";

const getPaginationPipeline = (
  userId: string,
  query: PaginationQuery
): PipelineStage[] => {
  const {
    limit = 10,
    page = 1,
    keyword = "",
    "sort-direction": sortDirection,
    "sort-field": sortField = "createdAt",
  } = query;
  const pipeline: PipelineStage[] = [
    {
      $match: {
        userId,
        ...(keyword && {
          $or: [
            { fullName: { $regex: query.keyword, $options: "i" } },
            { email: { $regex: query.keyword, $options: "i" } },
            { phoneNumber: { $regex: query.keyword, $options: "i" } },
          ],
        }),
      },
    },
    {
      $sort: {
        [sortField]: sortDirection === SortDirection.asc ? 1 : -1,
      },
    },
    { $skip: (page - 1) * limit },
    { $limit: limit },
    {
      $facet: {
        data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
        totalCount: [{ $count: "count" }],
      },
    },
    {
      $project: {
        data: 1,
        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
        totalPages: {
          $ceil: {
            $divide: [{ $arrayElemAt: ["$totalCount.count", 0] }, limit],
          },
        },
        currentPage: { $literal: page },
        hasNextPage: {
          $gt: [
            {
              $ceil: {
                $divide: [{ $arrayElemAt: ["$totalCount.count", 0] }, limit],
              },
            },
            page,
          ],
        },
        hasPreviousPage: { $gt: [page - 1, 0] },
      },
    },
  ];

  return pipeline;
};
export default getPaginationPipeline;
