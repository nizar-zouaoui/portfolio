import { PipelineStage, Types } from "mongoose";

const getFullUserAggregation = (userId: string, godRoleId?: string) => {
  const match: PipelineStage = { $match: { _id: new Types.ObjectId(userId) } };
  if (godRoleId) {
    match.$match.roleId = { $ne: new Types.ObjectId(godRoleId) };
  }
  return [
    match,
    {
      $addFields: {
        roleId: { $toObjectId: "$roleId" },
        auths: {
          $map: {
            input: "$auths",
            as: "authId",
            in: { $toObjectId: "$$authId" },
          },
        },
      },
    },
    {
      $lookup: {
        from: "roles",
        localField: "roleId",
        foreignField: "_id",
        as: "role",
      },
    },
    {
      $unwind: "$role",
    },
    {
      $lookup: {
        from: "auths",
        localField: "auths",
        foreignField: "_id",
        as: "auths",
      },
    },
    {
      $project: {
        _id: 1,
        username: 1,
        email: 1,
        createdAt: 1,
        auths: 1,
        role: {
          _id: 1,
          name: 1,
          accessResources: 1,
        },
      },
    },
  ];
};
export default getFullUserAggregation;
