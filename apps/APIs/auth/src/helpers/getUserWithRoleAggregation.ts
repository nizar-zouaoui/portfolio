import { Types } from "mongoose";

const getUserWithRoleAggregation = (userId: Types.ObjectId) => [
  {
    $match: { _id: userId },
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
      createdAt: 1,
      role: {
        _id: 1,
        name: 1,
        accessResources: 1,
      },
    },
  },
];
export default getUserWithRoleAggregation;
