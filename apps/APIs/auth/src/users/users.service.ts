import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import { UpdateUserDto } from "./dtos/UpdateUser.dto";
import { User } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Role, RoleDocument } from "src/roles/schemas/roles.schema";
import getFullUserAggregation from "src/helpers/getFullUserAggregation";
import { AuthDocument } from "src/auth/schemas/auth.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  async getUsers(): Promise<User[]> {
    const godRole = await this.roleModel.findOne({ name: "GOD" });
    if (!godRole) throw new NotFoundException("No god role?");
    const users = await this.userModel.find({ roleId: { $ne: godRole._id } });
    return users;
  }

  async getUserById(
    id: string,
    roleName?: string,
  ): Promise<{
    _id: Types.ObjectId;
    username: string;
    email: string;
    isAdmin: string;
    createdAt: Date;
    auths: AuthDocument[];
    __v: number;
    role: RoleDocument;
  }> {
    const godRole = await this.roleModel.findOne({ name: "GOD" });
    if (!godRole) throw new NotFoundException("No god role?");
    const user = await this.userModel.aggregate<{
      _id: Types.ObjectId;
      username: string;
      email: string;
      isAdmin: string;
      createdAt: Date;
      auths: AuthDocument[];
      __v: number;
      role: RoleDocument;
    }>(
      getFullUserAggregation(
        new Types.ObjectId(id),
        roleName === "GOD" ? undefined : godRole._id,
      ),
    );
    if (!user || !user.length) throw new NotFoundException("User not found!");
    return user[0];
  }

  async findByUserName(username: string) {
    const user = await this.userModel.findOne({
      where: { username },
    });
    if (!user) throw new NotFoundException("User not found!");
    return user;
  }

  async verifyUser(email: string): Promise<
    User & {
      _id: Types.ObjectId;
    }
  > {
    const user = await this.userModel.findOne({
      where: { email },
    });
    return user;
  }

  async createUser(userData: CreateUserDto) {
    const checkUser = await this.userModel.exists({
      $or: [{ username: userData.username }, { email: userData.email }],
    });
    if (checkUser) throw new ConflictException("User already exists");
    const newUser = await new this.userModel({
      ...userData,
      createdAt: new Date(),
    });
    await newUser.save();
    return "OK!";
  }

  async updateUser(id: string, userData: UpdateUserDto) {
    const godRole = await this.roleModel.findOne({ name: "GOD" });
    if (!godRole) throw new NotFoundException("No god role?");

    const updatedUser = await this.userModel.updateOne(
      { _id: id, roleId: { $ne: godRole._id } },
      { ...userData },
    );

    if (updatedUser.matchedCount === 0) {
      throw new NotFoundException("User not found!");
    }

    return "OK!";
  }

  async deleteUser(id: string) {
    const godRole = await this.roleModel.findOne({ name: "GOD" });
    if (!godRole) throw new NotFoundException("No god role?");
    const deletedUser = await this.userModel.deleteOne({
      _id: id,
      roleId: { $ne: godRole._id },
    });
    if (!deletedUser || deletedUser.deletedCount === 0)
      throw new NotFoundException("User not found!");
    return "OK!";
  }
}
