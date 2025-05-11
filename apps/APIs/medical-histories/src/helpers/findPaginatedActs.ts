import {
  PaginationQuery,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";
import { PipelineStage } from "mongoose";

const getActsPaginationPipeline = (query: PaginationQuery): PipelineStage[] => {
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
        ...(keyword && {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { price: { $regex: keyword, $options: "i" } },
          ],
        }),
      },
    },
    {
      $sort: {
        [sortField]: sortDirection === SortDirection.asc ? 1 : -1,
      },
    },
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
          $gt: [{ $arrayElemAt: ["$totalCount.count", 0] }, page * limit],
        },
        hasPreviousPage: { $gt: [page, 1] },
      },
    },
  ];

  return pipeline;
};

export default getActsPaginationPipeline;
