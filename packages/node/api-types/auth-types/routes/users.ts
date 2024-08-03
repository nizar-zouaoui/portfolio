import { LeanAuthDocument } from "../models/auth";
import { LeanRoleDocument } from "../models/roles";
import { IUser, LeanUserDocument } from "../models/users";
export type UserRouteTypes = {
  "/users/": {
    POST: {
      body: IUser;
      response: Promise<string>;
    };
    GET: {
      response: Promise<LeanUserDocument[]>;
    };
  };
  "/users/:id": {
    PATCH: {
      body: Partial<IUser>;
      response: Promise<string>;
      params: {
        id: string;
      };
    };
    DELETE: {
      response: Promise<string>;
      params: {
        id: string;
      };
    };
    GET: {
      response: Promise<
        Omit<LeanUserDocument, "roleId" | "auths"> & {
          auths: LeanAuthDocument[];
          role: LeanRoleDocument;
        }
      >;
      params: {
        id: string;
      };
    };
  };
  "/users/me": {
    GET: {
      response: Promise<
        Omit<LeanUserDocument, "roleId" | "auths"> & {
          auths: LeanAuthDocument[];
          role: LeanRoleDocument;
        }
      >;
    };
    PATCH: {
      body: IUser;
      response: Promise<string>;
    };
  };
};
