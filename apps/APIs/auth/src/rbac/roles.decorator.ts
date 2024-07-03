import { SetMetadata } from "@nestjs/common";
import { ACCESS_PRIVILIGE, RESOURCE } from "src/roles/dto/create-role.dto";

export const ROLE_KEY = "role";
export const Role = (accessPrivilege: ACCESS_PRIVILIGE, resource: RESOURCE) =>
  SetMetadata(ROLE_KEY, { accessPrivilege, resource });
