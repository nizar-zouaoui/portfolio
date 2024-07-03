import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLE_KEY } from "./roles.decorator";
import { ACCESS_PRIVILIGE, RESOURCE } from "src/roles/dto/create-role.dto";

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
    const { role } = context.switchToHttp().getRequest();
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
