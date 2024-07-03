import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import {
  ACCESS_PRIVILIGE,
  CreateRoleDto,
  RESOURCE,
} from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { AssignRoleDto } from "./dto/assign-role.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { RbacGuard } from "src/rbac/rbac.guard";
import { Role } from "src/rbac/roles.decorator";

@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Role(ACCESS_PRIVILIGE.WRITE, RESOURCE.ROLES)
  @UseGuards(AuthGuard, RbacGuard)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Role(ACCESS_PRIVILIGE.READ_ALL, RESOURCE.ROLES)
  @UseGuards(AuthGuard, RbacGuard)
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(":id")
  @Role(ACCESS_PRIVILIGE.READ_ALL, RESOURCE.ROLES)
  @UseGuards(AuthGuard, RbacGuard)
  findOne(@Param("id") id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(":id")
  @Role(ACCESS_PRIVILIGE.WRITE, RESOURCE.ROLES)
  @UseGuards(AuthGuard, RbacGuard)
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(":id")
  @Role(ACCESS_PRIVILIGE.DELETE_ALL, RESOURCE.ROLES)
  @UseGuards(AuthGuard, RbacGuard)
  remove(@Param("id") id: string) {
    return this.rolesService.remove(id);
  }

  @Post("assign-role")
  @Role(ACCESS_PRIVILIGE.WRITE, RESOURCE.USERS)
  @UseGuards(AuthGuard, RbacGuard)
  assignRole(@Body() assignRoleDto: AssignRoleDto) {
    return this.rolesService.assignRole(assignRoleDto);
  }
}
