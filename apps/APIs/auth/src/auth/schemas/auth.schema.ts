import { Types } from "mongoose";
import { AuthMethods } from "../auth-methods.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type AuthDocument = Auth & Document;
@Schema()
export class Auth {
  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ default: AuthMethods.CLASSIC })
  authMethod: AuthMethods;

  @Prop({ type: Types.ObjectId, ref: "User" })
  userId: Types.ObjectId;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
