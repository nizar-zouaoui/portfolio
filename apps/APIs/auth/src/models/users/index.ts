import { LeanUserDocument } from "@nizar-repo/auth-types";
import { Model, model, Schema, Types } from "mongoose";

const userSchema = new Schema<LeanUserDocument, Model<LeanUserDocument>>(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    roleId: { type: String, ref: "Role", required: true },
    auths: [{ type: String, ref: "Auth", required: true }],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
