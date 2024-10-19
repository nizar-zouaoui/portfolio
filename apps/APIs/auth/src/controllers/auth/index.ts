import { AuthRouteTypes } from "@nizar-repo/auth-types";
import { TokenPayloadType } from "@nizar-repo/route-protection/tokenPayloadType";
import { Request, Response } from "express";
import createHttpError from "http-errors";
import * as authServices from "services/auth";

export const classicSignIn = async (
  req: Request<
    unknown,
    unknown,
    AuthRouteTypes["/auth/classic/login/"]["POST"]["body"],
    unknown
  >,
  res: Response<AuthRouteTypes["/auth/classic/login/"]["POST"]["response"]>
) => {
  const token = await authServices.classicSignIn(req.body);
  res.status(200).send(token);
};

export const classicSignUp = async (
  req: Request<
    unknown,
    unknown,
    AuthRouteTypes["/auth/classic/sign-up/"]["POST"]["body"],
    unknown
  >,
  res: Response<AuthRouteTypes["/auth/classic/sign-up/"]["POST"]["response"]>
) => {
  const token = await authServices.classicSignUp(req.body);
  res.status(201).send(token);
};

export const refreshAccessToken = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<
    AuthRouteTypes["/auth/refresh-access-token/"]["GET"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    throw createHttpError(401, "No token provided");
  }
  await authServices.verifyAccessToken(authHeader);
  const newToken = await authServices.refreshAccessToken(
    res.locals.token.userId
  );
  res.status(200).send(newToken);
};
