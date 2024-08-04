import { Request, Response } from "express";
import * as authServices from "../../services/auth";
import { AuthRouteTypes } from "@nizar-repo/auth-types";

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
