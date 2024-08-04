import { Types } from "mongoose";

const getUserWithRoleAggregation = (userId: string) => [
  {
    $match: { _id: new Types.ObjectId(userId) },
  },
  {
    $addFields: {
      roleId: { $toObjectId: "$roleId" },
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
    $project: {
      _id: 1,
      username: 1,
      email: 1,
      role: {
        _id: 1,
        name: 1,
        accessResources: 1,
      },
    },
  },
];
export default getUserWithRoleAggregation;
