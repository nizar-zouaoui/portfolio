import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Role, RoleDocument } from "./schemas/roles.schema";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { User } from "src/users/schemas/user.schema";
import { AssignRoleDto } from "./dto/assign-role.dto";
import { LeanRoleDocument, LeanUserDocument } from "@nizar-repo/auth-types";

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(User.name) private userModel: Model<LeanUserDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<string> {
    const createdRole = new this.roleModel(createRoleDto);
    await createdRole.save();
    return "OK";
  }

  async findAll(): Promise<LeanRoleDocument[]> {
    return this.roleModel.find().lean();
  }

  async findOne(id: string): Promise<LeanRoleDocument> {
    return this.roleModel.findOne({ _id: id }).lean();
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<string> {
    await this.roleModel
      .findOneAndUpdate({ _id: id }, updateRoleDto, { new: true })
      .exec();
    return "OK";
  }

  async remove(id: string): Promise<string> {
    await this.roleModel.findOneAndDelete({ _id: id }).exec();
    return "OK";
  }

  async assignRole(assignRoleDto: AssignRoleDto): Promise<string> {
    const { userId, roleId } = assignRoleDto;
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    user.roleId = new Types.ObjectId(roleId);
    await user.save();
    return "OK";
  }
}
