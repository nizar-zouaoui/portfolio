import { IAuth } from "../models/auth";
export type AuthRouteTypes = {
  "/auth/classic/login/": {
    POST: {
      body: Omit<IAuth, "authMethod">;
      response: {
        accessToken: string;
        email: string;
        username: string;
      };
    };
  };
  "/auth/classic/sign-up/": {
    POST: {
      body: Omit<IAuth, "authMethod">;
      response: {
        accessToken: string;
        email: string;
        username: string;
      };
    };
  };
  "/auth/refresh-access-token/": {
    GET: {
      response: {
        accessToken: string;
        email: string;
        username: string;
      };
    };
  };
};
