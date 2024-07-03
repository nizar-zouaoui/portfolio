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

@Controller("users")
export class UsersController {
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
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch("me")
  @Role(ACCESS_PRIVILIGE.WRITE, RESOURCE.USERS)
  @UseGuards(AuthGuard, RbacGuard)
  updateMe(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    const userId = request["userId"];
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Patch(":id")
  @Role(ACCESS_PRIVILIGE.WRITE_ALL, RESOURCE.USERS)
  @UseGuards(AuthGuard, RbacGuard)
  updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }
  @Delete(":id")
  @Role(ACCESS_PRIVILIGE.DELETE, RESOURCE.USERS)
  @UseGuards(AuthGuard, RbacGuard)
  deleteUser(@Param("id") id: string) {
    return this.usersService.deleteUser(id);
  }
}
