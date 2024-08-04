import {
  ACCESS_PRIVILEGE,
  AuthMethods,
  AuthRouteTypes,
  LeanAuthDocument,
  LeanUserDocument,
  RESOURCE,
} from "@nizar-repo/auth-types";
import getAuthWithUserAggregation from "helpers/getAuthWithUserAggregation";
import Auth from "models/auth";
import createHtpError from "http-errors";
import User from "models/users";
import { sign } from "jsonwebtoken";
import { TokenPayloadType } from "@nizar-repo/route-protection/tokenPayloadType";
import * as usersServices from "services/users";
import * as rolesServices from "services/roles";
import { DEFAULT_ROLES_NAMES } from "@nizar-repo/auth-types/enums/defaultRoles";
import { mongo } from "mongoose";
import createHttpError from "http-errors";
import { getDuplicateFieldsError } from "@nizar-repo/custom-router/errors";

export const classicSignIn = async ({
  email,
  password,
}: AuthRouteTypes["/auth/classic/login/"]["POST"]["body"]) => {
  if (!process.env.JWT_SECRET_KEY)
    throw createHtpError(500, "JWT_SECRET_KEY env is not provided!");
  const authExists = await verifyAuth({
    email,
    authMethod: AuthMethods.CLASSIC,
  });
  if (!authExists)
    throw createHtpError(403, "No account with these credentials!");

  if (authExists.password !== password) {
    throw createHtpError(403, "Wrong credentials!");
  }
  const user = await usersServices.getUserWithRole(authExists.user._id);
  const payload: TokenPayloadType = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return {
    accessToken,
  };
};

export const classicSignUp = async ({
  email,
  password,
}: AuthRouteTypes["/auth/classic/sign-up/"]["POST"]["body"]) => {
  if (!process.env.JWT_SECRET_KEY)
    throw createHtpError(500, "JWT_SECRET_KEY env is not provided!");
  const authExists = await verifyAuth({
    email,
    authMethod: AuthMethods.CLASSIC,
  });
  if (authExists)
    throw createHtpError(
      403,
      "An account with these credentials already exists!"
    );
  const newAuth = await createAuth({
    email,
    password,
    authMethod: AuthMethods.CLASSIC,
  });
  const userRole = await rolesServices.getRoleByName(DEFAULT_ROLES_NAMES.USER);
  const payload: TokenPayloadType = {
    userId: newAuth.user._id,
    email: newAuth.user.email,
    role: userRole,
  };
  const accessToken = sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return {
    accessToken,
  };
};
const createAuth = async (
  authData: AuthRouteTypes["/auth/classic/sign-up/"]["POST"]["body"] & {
    authMethod: AuthMethods;
  }
): Promise<{ auth: LeanAuthDocument; user: LeanUserDocument }> => {
  const userExist = await usersServices.verifyUser(authData.email);

  if (userExist) {
    const savedAuth: LeanAuthDocument = await updateUserWithAuth(
      authData,
      userExist
    );
    return {
      auth: savedAuth,
      user: userExist,
    };
  }

  const savedAuth = await createUserWithAuth(authData);

  return savedAuth;
};
const verifyAuth = async ({
  email,
  authMethod,
}: {
  email: string;
  authMethod: AuthMethods;
}): Promise<
  LeanAuthDocument & {
    user: LeanUserDocument;
  }
> => {
  const auth: (LeanAuthDocument & { user: LeanUserDocument })[] =
    await Auth.aggregate(getAuthWithUserAggregation({ email, authMethod }));

  return auth[0];
};

const createUserWithAuth = async (
  authData: AuthRouteTypes["/auth/classic/sign-up/"]["POST"]["body"]
) => {
  const userRole = await rolesServices.getRoleByName(DEFAULT_ROLES_NAMES.USER);
  let newUser;
  try {
    newUser = await User.create({
      email: authData.email,
      username: `User-${crypto.randomUUID().slice(0, 8)}`,
      roleId: userRole._id,
    });
  } catch (error) {
    if (!(error instanceof mongo.MongoServerError && error.code === 11000))
      throw error;
    const duplicateFields = Object.keys(error.keyPattern);
    throw getDuplicateFieldsError(duplicateFields, error);
  }

  const savedAuth = await createNewAuth(authData, newUser._id.toString());

  newUser.auths.push(savedAuth._id);
  await newUser.save();

  return { auth: savedAuth, user: { ...newUser, _id: newUser._id.toString() } };
};
const updateUserWithAuth = async (
  authData: AuthRouteTypes["/auth/classic/sign-up/"]["POST"]["body"],
  user: LeanUserDocument
) => {
  const savedAuth: LeanAuthDocument = await createNewAuth(authData, user._id);
  user.auths.push(savedAuth._id);
  await User.updateOne(
    {
      _id: user._id,
    },
    { auths: user.auths }
  );
  return savedAuth;
};

const createNewAuth = async (
  authData: AuthRouteTypes["/auth/classic/sign-up/"]["POST"]["body"],
  userId: string
) => {
  try {
    const auth = await Auth.create({
      ...authData,
      userId,
    });
    return { ...auth, _id: auth._id.toString() };
  } catch (error) {
    if (!(error instanceof mongo.MongoServerError && error.code === 11000))
      throw error;
    const duplicateFields = Object.keys(error.keyPattern);
    throw getDuplicateFieldsError(duplicateFields, error);
  }
};
