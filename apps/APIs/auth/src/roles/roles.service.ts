import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Role, RoleDocument } from "./schemas/roles.schema";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { User, UserDocument } from "src/users/schemas/user.schema";
import { AssignRoleDto } from "./dto/assign-role.dto";

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const createdRole = new this.roleModel(createRoleDto);
    return createdRole.save();
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async findOne(id: string): Promise<Role> {
    return this.roleModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.roleModel
      .findOneAndUpdate({ _id: id }, updateRoleDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Role> {
    return this.roleModel.findOneAndDelete({ _id: id }).exec();
  }

  async assignRole(assignRoleDto: AssignRoleDto): Promise<User> {
    const { userId, roleId } = assignRoleDto;
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    user.roleId = new Types.ObjectId(roleId);
    return user.save();
  }
}
