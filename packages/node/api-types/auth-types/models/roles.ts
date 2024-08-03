import { Types, HydratedDocument, FlattenMaps } from "mongoose";
import { ACCESS_PRIVILIGE, RESOURCE } from "../enums/access-resource";

export interface IAccessResource {
  accessPrivilege: ACCESS_PRIVILIGE;

  resource: RESOURCE;
}

export interface IRole {
  name: string;
  accessResources: IAccessResource[];
}
export interface IRoleDocument extends IRole {}
export type HydratedRoleDocument = HydratedDocument<IRoleDocument>;
export type LeanRoleDocument = FlattenMaps<IRoleDocument> & {
  _id: Types.ObjectId;
};
