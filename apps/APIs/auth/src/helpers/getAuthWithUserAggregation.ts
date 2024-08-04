import { AuthMethods } from "@nizar-repo/auth-types";

const getAuthWithUserAggregation = ({
  email,
  authMethod,
}: {
  email?: string;
  authMethod: AuthMethods;
}) => [
  {
    $match: {
      email,
      authMethod,
    },
  },
  {
    $addFields: {
      userId: { $toObjectId: "$userId" },
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user",
    },
  },
  {
    $unwind: "$user",
  },
  {
    $project: {
      _id: 1,
      username: 1,
      email: 1,
      password: 1,
      createdAt: 1,
      authMethod: 1,
      user: {
        _id: 1,
        username: 1,
        email: 1,
      },
    },
  },
];
export default getAuthWithUserAggregation;
