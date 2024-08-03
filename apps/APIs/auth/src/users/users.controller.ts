import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  Req,
} from "@nestjs/common";
import { Request } from "express";
import {
  ACCESS_PRIVILIGE,
  Role,
  RbacGuard,
  AuthGuard,
  RESOURCE,
} from "@nizar-repo/route-protector";
import { CreateUserDto } from "src/users/dtos/CreateUser.dto";
import { UpdateUserDto } from "src/users/dtos/UpdateUser.dto";
import { UsersService } from "src/users/users.service";
import { IUsersController } from "./users.controller.interface";

@Controller("users")
export class UsersController implements IUsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @Role(ACCESS_PRIVILIGE.READ_ALL, RESOURCE.USERS)
  @UseGuards(AuthGuard, RbacGuard)
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get("me")
  @Role(ACCESS_PRIVILIGE.READ, RESOURCE.USERS)
  @UseGuards(AuthGuard, RbacGuard)
  getMyUser(@Req() request: Request) {
    const userId = request["userId"];
    const role = request["role"];
    return this.usersService.getUserById(userId, role.name);
  }

  @Get(":id")
  @Role(ACCESS_PRIVILIGE.READ_ALL, RESOURCE.USERS)
  @UseGuards(AuthGuard, RbacGuard)
  getUserById(@Param("id") id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  @Role(ACCESS_PRIVILIGE.WRITE, RESOURCE.USERS)
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
    return "OK!";
  }

  @Patch("me")
  @Role(ACCESS_PRIVILIGE.WRITE, RESOURCE.USERS)
  @UseGuards(AuthGuard, RbacGuard)
  async updateMe(
    @Req() request: Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = request["userId"];
    await this.usersService.updateUser(userId, updateUserDto);
    return "OK!";
  }

  @Patch(":id")
  @Role(ACCESS_PRIVILIGE.WRITE_ALL, RESOURCE.USERS)
  @UseGuards(AuthGuard, RbacGuard)
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(id, updateUserDto);
    return "OK!";
  }
  @Delete(":id")
  @Role(ACCESS_PRIVILIGE.DELETE_ALL, RESOURCE.USERS)
  @UseGuards(AuthGuard, RbacGuard)
  async deleteUser(@Param("id") id: string) {
    await this.usersService.deleteUser(id);
    return "OK!";
  }
}
