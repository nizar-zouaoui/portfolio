import { UserRouteTypes } from "@nizar-repo/auth-types";
import { Request } from "express";

export interface IUsersController {
  createUser(
    body: UserRouteTypes["/users/"]["POST"]["body"],
  ): UserRouteTypes["/users/"]["POST"]["response"];

  getUsers(): UserRouteTypes["/users/"]["GET"]["response"];

  getUserById(
    id: UserRouteTypes["/users/:id"]["GET"]["params"]["id"],
  ): UserRouteTypes["/users/:id"]["GET"]["response"];

  updateUser(
    id: UserRouteTypes["/users/:id"]["PATCH"]["params"]["id"],
    body: UserRouteTypes["/users/:id"]["PATCH"]["body"],
  ): UserRouteTypes["/users/:id"]["PATCH"]["response"];

  deleteUser(
    id: UserRouteTypes["/users/:id"]["DELETE"]["params"]["id"],
  ): UserRouteTypes["/users/:id"]["DELETE"]["response"];

  updateMe(
    request: Request,
    body: UserRouteTypes["/users/me"]["PATCH"]["body"],
  ): UserRouteTypes["/users/me"]["PATCH"]["response"];
  getMyUser(request: Request): UserRouteTypes["/users/me"]["GET"]["response"];
}
