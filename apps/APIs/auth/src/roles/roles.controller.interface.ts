import { RoleRouteTypes } from "@nizar-repo/auth-types";

export interface IRolesController {
  create(
    body: RoleRouteTypes["/roles/"]["POST"]["body"],
  ): RoleRouteTypes["/roles/"]["POST"]["response"];

  findAll(): RoleRouteTypes["/roles/"]["GET"]["response"];

  findOne(
    id: RoleRouteTypes["/roles/:id"]["GET"]["params"]["id"],
  ): RoleRouteTypes["/roles/:id"]["GET"]["response"];

  update(
    id: RoleRouteTypes["/roles/:id"]["PATCH"]["params"]["id"],
    body: RoleRouteTypes["/roles/:id"]["PATCH"]["body"],
  ): RoleRouteTypes["/roles/:id"]["PATCH"]["response"];

  remove(
    id: RoleRouteTypes["/roles/:id"]["DELETE"]["params"]["id"],
  ): RoleRouteTypes["/roles/:id"]["DELETE"]["response"];

  assignRole(
    body: RoleRouteTypes["/roles/assign-role"]["POST"]["body"],
  ): RoleRouteTypes["/roles/assign-role"]["POST"]["response"];
}
