import { LeanAuthDocument } from "../models/auth";
import { LeanRoleDocument } from "../models/roles";
import { IUser, LeanUserDocument } from "../models/users";
export type UserRouteTypes = {
  "/users/": {
    POST: {
      body: IUser;
      response: string;
    };
    GET: {
      response: LeanUserDocument[];
    };
  };
  "/users/:id": {
    PATCH: {
      body: Partial<IUser>;
      response: string;
      params: {
        id: string;
      };
    };
    DELETE: {
      response: string;
      params: {
        id: string;
      };
    };
    GET: {
      response: Omit<LeanUserDocument, "roleId" | "auths"> & {
        auths: LeanAuthDocument[];
        role: LeanRoleDocument;
      };
      params: {
        id: string;
      };
    };
  };
  "/users/me": {
    GET: {
      response: Omit<LeanUserDocument, "roleId" | "auths"> & {
        auths: LeanAuthDocument[];
        role: LeanRoleDocument;
      };
    };
    PATCH: {
      body: IUser;
      response: string;
    };
  };
};
