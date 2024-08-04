import { IRole } from "../models/roles";
import { ACCESS_PRIVILEGE, RESOURCE } from "./access-resource";

export enum DEFAULT_ROLES_NAMES {
  GOD = "GOD",
  USER = "USER",
}

export const godRole: IRole = {
  name: DEFAULT_ROLES_NAMES.GOD,
  accessResources: [
    {
      resource: RESOURCE["*"],
      accessPrivilege: ACCESS_PRIVILEGE["*"],
    },
  ],
};

export const userRole: IRole = {
  name: DEFAULT_ROLES_NAMES.USER,
  accessResources: [
    {
      resource: RESOURCE["*"],
      accessPrivilege: ACCESS_PRIVILEGE.READ,
    },
  ],
};
