import { UserRouteTypes } from "@nizar-repo/auth-types";
import createHttpError from "http-errors";
import User from "models/users";
import { mongo } from "mongoose";
import * as usersServices from "services/users";
import { Request, Response } from "express";
import { TokenPayloadType } from "@nizar-repo/route-protection/tokenPayloadType";
export const getUsers = async (
  _: Request<unknown, unknown, unknown, unknown>,
  res: Response<UserRouteTypes["/users/"]["GET"]["response"]>
) => {
  const users = await usersServices.getUsers();
  res.status(200).send(users);
};
export const createUser = async (
  req: Request<
    unknown,
    unknown,
    UserRouteTypes["/users/"]["POST"]["body"],
    unknown
  >,
  res: Response<UserRouteTypes["/users/"]["POST"]["response"]>
) => {
  await usersServices.createUser(req.body);
  res.status(201).send("OK");
};

export const getMe = async (
  _: Request<unknown, unknown, unknown, unknown>,
  res: Response<
    UserRouteTypes["/users/me"]["GET"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const { userId } = res.locals.token;

  const user = await usersServices.getFullUserById(userId);
  res.status(200).send(user);
};

export const updateMe = async (
  req: Request<
    unknown,
    unknown,
    UserRouteTypes["/users/me"]["PATCH"]["body"],
    unknown
  >,
  res: Response<
    UserRouteTypes["/users/me"]["PATCH"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const { userId, role } = res.locals.token;
  await usersServices.updateUser(userId, req.body, role.name);
  res.status(200).send("OK");
};

export const getUserById = async (
  req: Request<
    UserRouteTypes["/users/:id"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  res: Response<UserRouteTypes["/users/:id"]["GET"]["response"]>
) => {
  const user = await usersServices.getFullUserById(req.params.id);
  res.status(200).send(user);
};

export const updateUser = async (
  req: Request<
    UserRouteTypes["/users/:id"]["PATCH"]["params"],
    unknown,
    UserRouteTypes["/users/:id"]["PATCH"]["body"],
    unknown
  >,
  res: Response<
    UserRouteTypes["/users/:id"]["PATCH"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const { role } = res.locals.token;
  await usersServices.updateUser(req.params.id, req.body, role.name);
  res.status(200).send("OK");
};

export const deleteUser = async (
  req: Request<
    UserRouteTypes["/users/:id"]["DELETE"]["params"],
    unknown,
    unknown,
    unknown
  >,
  res: Response<UserRouteTypes["/users/:id"]["DELETE"]["response"]>
) => {
  await usersServices.deleteUser(req.params.id);
  res.status(200).send("OK");
};
