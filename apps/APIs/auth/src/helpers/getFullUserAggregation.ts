import { PipelineStage, Types } from "mongoose";

const getFullUserAggregation = (
  userId: Types.ObjectId,
  godRoleId?: Types.ObjectId,
) => {
  const match: PipelineStage = { $match: { _id: userId } };
  if (godRoleId) {
    match.$match.roleId = { $ne: godRoleId };
  }
  return [
    match,
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
