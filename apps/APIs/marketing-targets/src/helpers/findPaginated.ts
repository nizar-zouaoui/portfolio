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
    keyword = "",
    "sort-direction": sortDirection,
    "sort-field": sortField = "createdAt",
  } = query;
  const page = isNaN(Number(query.page)) ? 1 : Number(query.page);
  const limit = isNaN(Number(query.limit)) ? 10 : Number(query.limit);
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
        items: [{ $skip: (page - 1) * limit }, { $limit: limit }],
        totalCount: [{ $count: "count" }],
      },
    },
    {
      $project: {
        items: 1,
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
