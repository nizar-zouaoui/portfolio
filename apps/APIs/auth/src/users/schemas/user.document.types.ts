import { Types, HydratedDocument, FlattenMaps } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  auths: Types.ObjectId[];
  roleId: Types.ObjectId;
}

export type HydratedUserDocument = HydratedDocument<IUser>;
export type LeanUserDocument = FlattenMaps<IUser> & {
  _id: Types.ObjectId;
};
