import { Type } from "class-transformer";
import { IsArray, IsEnum, IsString, ValidateNested } from "class-validator";

export enum ACCESS_PRIVILIGE {
  READ = "READ",
  READ_ALL = "READ_ALL",
  WRITE = "WRITE",
  WRITE_ALL = "WRITE_ALL",
  DELETE = "DELETE",
  DELETE_ALL = "DELETE_ALL",
  "*" = "*",
}
export enum RESOURCE {
  AUTH = "AUTH",
  USERS = "USERS",
  ROLES = "ROLES",
  "*" = "*",
}

export class AccessResourceDto {
  @IsEnum(ACCESS_PRIVILIGE, {
    message: "accessPrivilege must be a valid enum value",
  })
  accessPrivilege: ACCESS_PRIVILIGE;

  @IsEnum(RESOURCE, {
    message: "resource must be a valid enum value",
  })
  resource: RESOURCE;
}

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccessResourceDto)
  accessResources: AccessResourceDto[];
}
