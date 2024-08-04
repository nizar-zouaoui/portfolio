import { RoleRouteTypes } from "@nizar-repo/auth-types";
import Role from "models/roles";
import createHttpError from "http-errors";
import * as usersServices from "services/users";

export const createRole = async (
  roleData: RoleRouteTypes["/roles/"]["POST"]["body"]
) => {
  await Role.create(roleData);
};

export const getRoles = async () => {
  const roles = await Role.find().lean();
  return roles;
};

export const getRoleById = async (
  roleId: RoleRouteTypes["/roles/:id"]["GET"]["params"]["id"]
) => {
  const role = await Role.findById(roleId).lean();
  if (!role) throw createHttpError(404, "Role Not Found!");
  return role;
};

export const updateRole = async (
  roleId: RoleRouteTypes["/roles/:id"]["PATCH"]["params"]["id"],
  roleData: RoleRouteTypes["/roles/:id"]["PATCH"]["body"]
) => {
  const role = await Role.findByIdAndUpdate(roleId, roleData);
  if (!role) throw createHttpError(404, "Role Not Found!");
};

export const deleteRole = async (
  roleId: RoleRouteTypes["/roles/:id"]["DELETE"]["params"]["id"]
) => {
  const role = await Role.findByIdAndDelete(roleId);
  if (!role) throw createHttpError(404, "Role Not Found!");
};

export const assignRole = async ({
  roleId,
  userId,
}: RoleRouteTypes["/roles/assign-role"]["POST"]["body"]) => {
  const user = await usersServices.getUserById(userId);
  if (!user) {
    throw createHttpError(404, "User Not Found!");
  }
  user.roleId = roleId;
  await user.save();
};

export const getRoleByName = async (name: string) => {
  const godRole = await Role.findOne({ name });
  if (!godRole) throw createHttpError(404, "No god role?");
  return godRole;
};
