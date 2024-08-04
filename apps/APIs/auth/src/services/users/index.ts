import {
  FullUserType,
  LeanAuthDocument,
  LeanRoleDocument,
  LeanUserDocument,
  UserRouteTypes,
} from "@nizar-repo/auth-types";
import { DEFAULT_ROLES_NAMES } from "@nizar-repo/auth-types/enums/defaultRoles";
import getFullUserAggregation from "helpers/getFullUserAggregation";
import getUserWithRoleAggregation from "helpers/getUserWithRoleAggregation";
import createHttpError from "http-errors";
import User from "models/users";
import { FilterQuery, mongo } from "mongoose";
import * as rolesServices from "services/roles";
import { getDuplicateFieldsError } from "@nizar-repo/custom-router/errors";

export const getUsers = async () => {
  const godRole = await rolesServices.getRoleByName(DEFAULT_ROLES_NAMES.GOD);
  const users = await User.find({ roleId: { $ne: godRole._id } }).lean();
  return users;
};

export const getFullUserById = async (
  userId: string,
  roleName?: string
): Promise<
  Omit<LeanUserDocument, "roleId" | "auths"> & {
    auths: LeanAuthDocument[];
    role: LeanRoleDocument;
  }
> => {
  const godRole = await rolesServices.getRoleByName(DEFAULT_ROLES_NAMES.GOD);
  const user = await User.aggregate<
    Omit<LeanUserDocument, "roleId" | "auths"> & {
      auths: LeanAuthDocument[];
      role: LeanRoleDocument;
    }
  >(
    getFullUserAggregation(
      userId,
      roleName === DEFAULT_ROLES_NAMES.GOD ? undefined : godRole._id.toString()
    )
  );
  if (!user || !user.length) throw createHttpError(404, "User not found!");
  return user[0];
};

export const getUserById = async (userId: string) => {
  const godRole = await rolesServices.getRoleByName(DEFAULT_ROLES_NAMES.GOD);
  const user = await User.findOne({
    _id: userId,
    roleId: { $ne: godRole._id },
  });
  if (!user) throw createHttpError(404, "User not found!");
  return user;
};
export const getUserByUserName = async (username: string) => {
  const godRole = await rolesServices.getRoleByName(DEFAULT_ROLES_NAMES.GOD);
  const user = await User.findOne({
    username,
    roleId: { $ne: godRole._id },
  });
  if (!user) throw createHttpError(404, "User not found!");
  return user;
};

export const getUserWithRole = async (userId: string) => {
  const user: Omit<FullUserType, "auths"> | undefined = (
    await User.aggregate(getUserWithRoleAggregation(userId))
  )[0];

  if (!user) throw createHttpError(404, "User Not Found!");
  return user;
};

export const verifyUser = async (
  email: string
): Promise<LeanUserDocument | undefined> => {
  const user = await User.findOne({
    where: { email },
  }).lean();
  if (!user) return;
  return { ...user, _id: user._id.toString() };
};

export const createUser = async (
  userData: UserRouteTypes["/users/"]["POST"]["body"]
) => {
  try {
    await User.create(userData);
  } catch (error) {
    if (!(error instanceof mongo.MongoServerError && error.code === 11000))
      throw error;
    console.log(error);
    const duplicateFields = Object.keys(error.keyPattern);
    throw getDuplicateFieldsError(duplicateFields, error);
  }
};

export const updateUser = async (
  id: string,
  userData: UserRouteTypes["/users/:id"]["PATCH"]["body"],
  roleName: string
) => {
  let user;
  try {
    const godRole = await rolesServices.getRoleByName(DEFAULT_ROLES_NAMES.GOD);
    const match: FilterQuery<LeanUserDocument> = {
      _id: id,
    };
    if (roleName !== DEFAULT_ROLES_NAMES.GOD) {
      match.roleId = { $ne: godRole._id };
    }
    user = await User.updateOne(match, { ...userData });
    console.log(user);
  } catch (error) {
    if (!(error instanceof mongo.MongoServerError && error.code === 11000))
      throw error;
    const duplicateFields = Object.keys(error.keyPattern);
    throw getDuplicateFieldsError(duplicateFields, error);
  }
  if (!user.acknowledged) throw createHttpError(404, "User Not Found!");
};

export const deleteUser = async (id: string) => {
  const godRole = await rolesServices.getRoleByName(DEFAULT_ROLES_NAMES.GOD);
  const user = await User.deleteOne({ _id: id, roleId: { $ne: godRole._id } });

  if (!user.acknowledged) throw createHttpError(404, "User Not Found!");
};
