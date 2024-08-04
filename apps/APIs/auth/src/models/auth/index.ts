import { AuthMethods, IAuthDocument } from "@nizar-repo/auth-types";
import { Model, model, Schema, Types } from "mongoose";

const authSchema = new Schema<IAuthDocument, Model<IAuthDocument>>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    authMethod: {
      type: String,
      default: AuthMethods.CLASSIC,
      enum: Object.values(AuthMethods),
    },
    userId: { type: String, ref: "User", required: true },
  },
  { timestamps: true }
);

const Auth = model("Auth", authSchema);

export default Auth;
