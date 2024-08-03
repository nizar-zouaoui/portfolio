import { IAuth } from "../models/auth";
export type AuthRouteTypes = {
  "/auth/classic/login/": {
    POST: {
      body: Omit<IAuth, "authMethod">;
      response: Promise<{
        accessToken: string;
      }>;
    };
  };
  "/auth/classic/sign-up/": {
    POST: {
      body: Omit<IAuth, "authMethod">;
      response: Promise<{
        accessToken: string;
      }>;
    };
  };
};
