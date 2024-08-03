import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { IUser } from "./user.document.types";
// eslint-disable-next-line @typescript-eslint/ban-types

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Auth" }] })
  auths: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: "Role" })
  roleId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
