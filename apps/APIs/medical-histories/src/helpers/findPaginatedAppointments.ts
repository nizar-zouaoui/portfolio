import {
  PaginationQuery,
  SortDirection,
} from "@nizar-repo/shared-types/PaginationTypes";
import { PipelineStage, Types } from "mongoose";

const getAppointmentsPaginationPipeline = (
  medicalHistoryId: string,
  query: PaginationQuery
): PipelineStage[] => {
  const {
    "sort-direction": sortDirection = SortDirection.desc,
    "sort-field": sortField = "date",
  } = query;

  const page = isNaN(Number(query.page)) ? 1 : Number(query.page);
  const limit = isNaN(Number(query.limit)) ? 10 : Number(query.limit);

  const pipeline: PipelineStage[] = [
    {
      $match: {
        _id: new Types.ObjectId(medicalHistoryId),
      },
    },
    {
      $addFields: {
        appointmentObjectIds: {
          $map: {
            input: "$appointmentIds",
            as: "id",
            in: { $toObjectId: "$$id" },
          },
        },
      },
    },
    {
      $lookup: {
        from: "appointments",
        localField: "appointmentObjectIds",
        foreignField: "_id",
        as: "appointments",
      },
    },
    {
      $unwind: "$appointments",
    },
    {
      $addFields: {
        "appointments.actObjectIds": {
          $map: {
            input: "$appointments.actIds",
            as: "id",
            in: { $toObjectId: "$$id" },
          },
        },
      },
    },
    {
      $lookup: {
        from: "acts",
        localField: "appointments.actObjectIds",
        foreignField: "_id",
        as: "appointments.acts",
      },
    },
    {
      // Replace the root with the appointment only
      $replaceRoot: {
        newRoot: "$appointments",
      },
    },
    {
      $project: {
        actIds: 0,
        actObjectIds: 0,
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

export default getAppointmentsPaginationPipeline;
