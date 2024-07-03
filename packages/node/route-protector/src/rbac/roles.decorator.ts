import { SetMetadata } from "@nestjs/common";
enum ACCESS_PRIVILIGE {
  READ = "READ",
  READ_ALL = "READ_ALL",
  WRITE = "WRITE",
  WRITE_ALL = "WRITE_ALL",
  DELETE = "DELETE",
  DELETE_ALL = "DELETE_ALL",
  "*" = "*",
}
enum RESOURCE {
  AUTH = "AUTH",
  USERS = "USERS",
  ROLES = "ROLES",
  "*" = "*",
}

export const ROLE_KEY = "role";
export const Role = (accessPrivilege: ACCESS_PRIVILIGE, resource: RESOURCE) =>
  SetMetadata(ROLE_KEY, { accessPrivilege, resource });
