import {  HydratedDocument, FlattenMaps } from "mongoose";
import {  LeanRoleDocument } from "./roles";
import { LeanAuthDocument } from "./auth";

export interface IUser {
  username: string;
  email: string;
}
export interface IUserDocument extends IUser {
  auths: string[];
  roleId: string;
}
export type HydratedUserDocument = HydratedDocument<IUserDocument>;
export type LeanUserDocument = FlattenMaps<IUserDocument> & {
  _id: string;
};

export type FullUserType = Omit<LeanUserDocument, "auths"|"roleId"> & {
  role: LeanRoleDocument;
  auths: LeanAuthDocument[]
}