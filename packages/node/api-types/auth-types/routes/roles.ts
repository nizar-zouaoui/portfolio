import { IRole, LeanRoleDocument } from "../models/roles";
export type RoleRouteTypes = {
  "/roles/": {
    POST: {
      body: IRole;
      response: string;
    };
    GET: {
      response: LeanRoleDocument[];
    };
  };
  "/roles/:id": {
    PATCH: {
      body: Partial<IRole>;
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
      response: LeanRoleDocument;
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
      response: string;
    };
  };
};
