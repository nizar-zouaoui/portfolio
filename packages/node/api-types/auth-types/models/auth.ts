import { Types, HydratedDocument, FlattenMaps } from "mongoose";
import { AuthMethods } from "../enums/auth-methods";

export interface IAuth {
  email: string;
  password: string;
  authMethod: AuthMethods;
}
export interface IAuthDocument extends IAuth {
  userId: Types.ObjectId;
}
export type HydratedAuthDocument = HydratedDocument<IAuthDocument>;
export type LeanAuthDocument = FlattenMaps<IAuthDocument> & {
  _id: Types.ObjectId;
};
