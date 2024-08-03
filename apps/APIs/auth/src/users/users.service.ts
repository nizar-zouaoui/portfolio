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
import { Role } from "src/roles/schemas/roles.schema";
import getFullUserAggregation from "src/helpers/getFullUserAggregation";
import {
  LeanUserDocument,
  LeanAuthDocument,
  LeanRoleDocument,
} from "@nizar-repo/auth-types";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  async getUsers(): Promise<LeanUserDocument[]> {
    const godRole = await this.roleModel.findOne({ name: "GOD" });
    if (!godRole) throw new NotFoundException("No god role?");
    const users = await this.userModel
      .find({ roleId: { $ne: godRole._id } })
      .lean();
    return users;
  }

  async getUserById(
    id: string,
    roleName?: string,
  ): Promise<
    Omit<LeanUserDocument, "roleId" | "auths"> & {
      auths: LeanAuthDocument[];
      role: LeanRoleDocument;
    }
  > {
    const godRole = await this.roleModel.findOne({ name: "GOD" });
    if (!godRole) throw new NotFoundException("No god role?");
    const user = await this.userModel.aggregate<
      Omit<LeanUserDocument, "roleId" | "auths"> & {
        auths: LeanAuthDocument[];
        role: LeanRoleDocument;
      }
    >(
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

  async verifyUser(email: string): Promise<LeanUserDocument> {
    const user: LeanUserDocument = await this.userModel
      .findOne({
        where: { email },
      })
      .lean();

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
  }
}
