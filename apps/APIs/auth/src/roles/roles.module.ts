import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { Role, RoleSchema } from "./schemas/roles.schema";
import { User, UserSchema } from "src/users/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
