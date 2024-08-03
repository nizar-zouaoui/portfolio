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
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { AssignRoleDto } from "./dto/assign-role.dto";

import {
  ACCESS_PRIVILIGE,
  Role,
  RbacGuard,
  AuthGuard,
  RESOURCE,
} from "@nizar-repo/route-protector";
import { IRolesController } from "./roles.controller.interface";
@Controller("roles")
export class RolesController implements IRolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Role(ACCESS_PRIVILIGE.WRITE, RESOURCE.ROLES)
  @UseGuards(AuthGuard, RbacGuard)
  async create(@Body() createRoleDto: CreateRoleDto) {
    await this.rolesService.create(createRoleDto);
    return "OK";
  }

  @Get()
  @Role(ACCESS_PRIVILIGE.READ_ALL, RESOURCE.ROLES)
  @UseGuards(AuthGuard, RbacGuard)
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Get(":id")
  @Role(ACCESS_PRIVILIGE.READ_ALL, RESOURCE.ROLES)
  @UseGuards(AuthGuard, RbacGuard)
  async findOne(@Param("id") id: string) {
    return await this.rolesService.findOne(id);
  }

  @Patch(":id")
  @Role(ACCESS_PRIVILIGE.WRITE, RESOURCE.ROLES)
  @UseGuards(AuthGuard, RbacGuard)
  async update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    await this.rolesService.update(id, updateRoleDto);
    return "OK";
  }

  @Delete(":id")
  @Role(ACCESS_PRIVILIGE.DELETE_ALL, RESOURCE.ROLES)
  @UseGuards(AuthGuard, RbacGuard)
  async remove(@Param("id") id: string) {
    await this.rolesService.remove(id);
    return "OK";
  }

  @Post("assign-role")
  @Role(ACCESS_PRIVILIGE.WRITE, RESOURCE.USERS)
  @UseGuards(AuthGuard, RbacGuard)
  async assignRole(@Body() assignRoleDto: AssignRoleDto) {
    await this.rolesService.assignRole(assignRoleDto);
    return "OK";
  }
}
