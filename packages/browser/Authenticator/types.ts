import { AuthRouteTypes } from "@nizar-repo/auth-types";

export type UserData = {
  email: string;
  username: string;
};
export type ClassicLoginBodyType =
  AuthRouteTypes["/auth/classic/login/"]["POST"]["body"];
