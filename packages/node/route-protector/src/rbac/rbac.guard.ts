import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLE_KEY } from "./roles.decorator";
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
@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredAccessResource = this.reflector.getAllAndOverride<{
      accessPrivilege: ACCESS_PRIVILIGE;
      resource: RESOURCE;
    }>(ROLE_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredAccessResource) {
      return true;
    }
    const {
      role,
    }: {
      role: {
        name: string;
        accessResources: {
          accessPrivilege: ACCESS_PRIVILIGE;
          resource: RESOURCE;
        }[];
      };
    } = context.switchToHttp().getRequest();
    const hasAccess =
      role.name === "GOD" ||
      role.accessResources.some(
        (accessResource) =>
          (accessResource.accessPrivilege === "*" ||
            accessResource.accessPrivilege ===
              requiredAccessResource.accessPrivilege) &&
          (accessResource.resource === "*" ||
            accessResource.resource === requiredAccessResource.resource),
      );
    return hasAccess;
  }
}
