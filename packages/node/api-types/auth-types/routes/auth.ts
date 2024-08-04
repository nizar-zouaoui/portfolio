import { IAuth } from "../models/auth";
export type AuthRouteTypes = {
  "/auth/classic/login/": {
    POST: {
      body: Omit<IAuth, "authMethod">;
      response: {
        accessToken: string;
      };
    };
  };
  "/auth/classic/sign-up/": {
    POST: {
      body: Omit<IAuth, "authMethod">;
      response: {
        accessToken: string;
      };
    };
  };
};
