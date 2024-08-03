import { Types, HydratedDocument, FlattenMaps } from "mongoose";

export interface IUser {
  username: string;
  email: string;
}
export interface IUserDocument extends IUser {
  auths: Types.ObjectId[];
  roleId: Types.ObjectId;
}
export type HydratedUserDocument = HydratedDocument<IUserDocument>;
export type LeanUserDocument = FlattenMaps<IUserDocument> & {
  _id: Types.ObjectId;
};
