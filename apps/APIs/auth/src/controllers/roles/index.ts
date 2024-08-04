import { RoleRouteTypes } from "@nizar-repo/auth-types";
import Role from "models/roles";
import createHttpError from "http-errors";
import * as rolesServices from "services/roles";
import { Request, Response } from "express";

export const createRole = async (
  req: Request<
    unknown,
    unknown,
    RoleRouteTypes["/roles/"]["POST"]["body"],
    unknown
  >,
  res: Response<RoleRouteTypes["/roles/"]["POST"]["response"]>
) => {
  await rolesServices.createRole(req.body);
  res.status(201).send("OK");
};

export const getRoles = async (
  _: Request<unknown, unknown, unknown, unknown>,
  res: Response<RoleRouteTypes["/roles/"]["GET"]["response"]>
) => {
  const roles = await rolesServices.getRoles();
  res.status(200).send(roles);
};

export const getRoleById = async (
  req: Request<
    RoleRouteTypes["/roles/:id"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  res: Response<RoleRouteTypes["/roles/:id"]["GET"]["response"]>
) => {
  const role = await rolesServices.getRoleById(req.params.id);
  res.status(200).send(role);
};

export const updateRole = async (
  req: Request<
    RoleRouteTypes["/roles/:id"]["PATCH"]["params"],
    unknown,
    RoleRouteTypes["/roles/:id"]["PATCH"]["body"],
    unknown
  >,
  res: Response<RoleRouteTypes["/roles/:id"]["PATCH"]["response"]>
) => {
  await rolesServices.updateRole(req.params.id, req.body);
  res.status(200).send("OK");
};

export const deleteRole = async (
  req: Request<
    RoleRouteTypes["/roles/:id"]["DELETE"]["params"],
    unknown,
    unknown,
    unknown
  >,
  res: Response<RoleRouteTypes["/roles/:id"]["DELETE"]["response"]>
) => {
  await rolesServices.deleteRole(req.params.id);
  res.status(200).send("OK");
};

export const assignRole = async (
  req: Request<
    unknown,
    unknown,
    RoleRouteTypes["/roles/assign-role"]["POST"]["body"],
    unknown
  >,
  res: Response<RoleRouteTypes["/roles/:id"]["DELETE"]["response"]>
) => {
  await rolesServices.assignRole(req.body);
  res.status(200).send("OK");
};
