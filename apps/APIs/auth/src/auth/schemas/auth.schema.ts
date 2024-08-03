import { Document, Types } from "mongoose";
import { AuthMethods } from "../auth-methods.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

// eslint-disable-next-line @typescript-eslint/ban-types
export type AuthDocument = Document<unknown, {}, Auth> &
  Auth & {
    _id: Types.ObjectId;
  };
@Schema({ timestamps: true })
export class Auth {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: AuthMethods.CLASSIC })
  authMethod: AuthMethods;

  @Prop({ type: Types.ObjectId, ref: "User" })
  userId: Types.ObjectId;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
