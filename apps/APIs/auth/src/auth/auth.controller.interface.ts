import { AuthRouteTypes } from "@nizar-repo/auth-types";

export interface IAuthController {
  classicSignIn(
    body: AuthRouteTypes["/auth/classic/login/"]["POST"]["body"],
  ): AuthRouteTypes["/auth/classic/login/"]["POST"]["response"];
  classicSignUp(
    body: AuthRouteTypes["/auth/classic/sign-up/"]["POST"]["body"],
  ): AuthRouteTypes["/auth/classic/login/"]["POST"]["response"];
}
