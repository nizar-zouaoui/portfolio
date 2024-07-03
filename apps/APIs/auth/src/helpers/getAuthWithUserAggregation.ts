const getAuthWithUserAggregation = ({
  email,
  username,
}: {
  email?: string;
  username?: string;
}) => [
  {
    $match: {
      $or: [{ username }, { email }],
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
      isAdmin: 1,
      createdAt: 1,
      authMethod: 1,
      user: {
        _id: 1,
        username: 1,
        email: 1,
        isAdmin: 1,
      },
    },
  },
];
export default getAuthWithUserAggregation;
