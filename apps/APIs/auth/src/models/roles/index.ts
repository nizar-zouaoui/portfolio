import { Schema, Model, model } from "mongoose";
import {
  ACCESS_PRIVILEGE,
  IAccessResource,
  IRole,
  RESOURCE,
} from "@nizar-repo/auth-types";

const AccessResourceSchema = new Schema<
  IAccessResource,
  Model<IAccessResource>
>({
  accessPrivilege: {
    type: String,
    required: true,
    enum: Object.values(ACCESS_PRIVILEGE),
  },
  resource: { type: String, required: true, enum: Object.values(RESOURCE) },
});

const RoleSchema = new Schema<IRole, Model<IRole>>(
  {
    name: { type: String, required: true, unique: true },
    accessResources: { type: [AccessResourceSchema], default: [] },
  },
  { timestamps: true }
);

const Role = model<IRole>("Role", RoleSchema);

export default Role;
