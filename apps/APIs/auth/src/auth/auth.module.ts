import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { Auth, AuthSchema } from "./schemas/auth.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/schemas/user.schema";
// import { User } from "src/users/schemas/user.entity";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Auth.name,
        schema: AuthSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60d" },
    }),
  ],
})
export class AuthModule {}
