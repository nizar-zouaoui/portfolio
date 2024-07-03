import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ default: false })
  isAdmin: string;

  @Prop()
  createdAt: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Auth" }] })
  auths: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: "Role" })
  roleId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
