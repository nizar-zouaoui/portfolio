import { AuthRouteTypes } from "@nizar-repo/auth-types";

export type UserData = {
  email: string;
  username: string;
};
export type ClassicLoginBodyType =
  AuthRouteTypes["/auth/classic/login/"]["POST"]["body"];

export type ClassicSignUpBodyType =
  AuthRouteTypes["/auth/classic/sign-up/"]["POST"]["body"] & {
    verifyPassword: string;
    username: string;
  };
