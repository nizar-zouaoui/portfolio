import { IRole, LeanRoleDocument } from "../models/roles";
export type RoleRouteTypes = {
  "/roles/": {
    POST: {
      body: IRole;
      response: Promise<string>;
    };
    GET: {
      response: Promise<LeanRoleDocument[]>;
    };
  };
  "/roles/:id": {
    PATCH: {
      body: Partial<IRole>;
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
      response: Promise<LeanRoleDocument>;
      params: {
        id: string;
      };
    };
  };
  "/roles/assign-role": {
    POST: {
      body: {
        userId: string;
        roleId: string;
      };
      response: Promise<string>;
    };
  };
};
