import { Request, Response } from "express";
import * as authServices from "../../services/auth";
import { AuthRouteTypes } from "@nizar-repo/auth-types";
import { TokenPayloadType } from "@nizar-repo/route-protection/tokenPayloadType";

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
  _: Request<unknown, unknown, unknown, unknown>,
  res: Response<
    AuthRouteTypes["/auth/refresh-access-token/"]["GET"]["response"],
    { token: TokenPayloadType }
  >
) => {
  const newToken = await authServices.refreshAccessToken(
    res.locals.token.userId
  );
  res.status(200).send(newToken);
};

export const verifyAccessToken = async (
  req: Request<
    AuthRouteTypes["/auth/verify-access-token/:token"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  res: Response<
    AuthRouteTypes["/auth/verify-access-token/:token"]["GET"]["response"]
  >
) => {
  const verifiedToken = await authServices.verifyAccessToken(req.params.token);
  res.status(200).send(verifiedToken);
};
