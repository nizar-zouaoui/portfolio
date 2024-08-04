import { ACCESS_PRIVILEGE, RESOURCE } from "@nizar-repo/auth-types";

export type TokenPayloadType = {
  userId: string;
  email: string;
  role: IRole;
};

export interface IAccessResource {
  accessPrivilege: ACCESS_PRIVILEGE;

  resource: RESOURCE;
}

export interface IRole {
  name: string;
  accessResources: IAccessResource[];
}
