import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { ClassicSignInDto } from "./dto/classic-sign-in.dto";
import { ClassicSignUpDto } from "./dto/classic-sign-up.dto";
import { Auth } from "./schemas/auth.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import getAuthWithUserAggregation from "src/helpers/getAuthWithUserAggregation";
import getUserWithRoleAggregation from "src/helpers/getUserWithRoleAggregation";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async verifyAuth({
    email,
    username,
  }: {
    email?: string;
    username?: string;
  }): Promise<
    Auth & {
      _id: Types.ObjectId;
      user: {
        _id: Types.ObjectId;
        username: string;
        email: string;
        isAdmin: boolean;
      };
    }
  > {
    const auth: (Auth & {
      _id: Types.ObjectId;
      user: {
        _id: Types.ObjectId;
        username: string;
        email: string;
        isAdmin: boolean;
      };
    })[] = await this.authModel.aggregate(
      getAuthWithUserAggregation({ email, username }),
    );

    return auth[0];
  }

  async classicSignIn({ password, email }: ClassicSignInDto): Promise<any> {
    const authExists = await this.verifyAuth({ email });
    if (!authExists)
      throw new UnauthorizedException("No account with these credentials!");

    if (authExists.password !== password) {
      throw new UnauthorizedException("Wrong credentials!");
    }
    const user = (
      await this.userModel.aggregate(
        getUserWithRoleAggregation(new Types.ObjectId(authExists.user._id)),
      )
    )[0];
    const payload = { userId: user._id, email: user.email, role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async classicSignUp({
    email,
    username,
    password,
  }: ClassicSignUpDto): Promise<any> {
    const authExists = await this.verifyAuth({ username, email });
    if (authExists)
      throw new UnauthorizedException(
        "An account with these credentials already exists!",
      );
    const newAuth = await this.createAuth({
      email,
      password,
      username,
    });
    const payload = { authId: newAuth.id, username: newAuth.username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async createAuth(authData: ClassicSignUpDto) {
    const newAuthData = {
      ...authData,
      createdAt: new Date(),
    };

    const userExist = await this.usersService.verifyUser(authData.email);

    if (userExist) {
      const savedAuth = await this.updateUserWithAuth(newAuthData, userExist);
      return savedAuth;
    }

    const savedAuth = await this.createUserWithAuth(newAuthData);

    return savedAuth;
  }

  async createNewAuth(authData: ClassicSignUpDto, userId: Types.ObjectId) {
    const savedAuth = new this.authModel({
      ...authData,
      userId,
    });
    return await savedAuth.save();
  }

  async createUserWithAuth(authData: ClassicSignUpDto) {
    const newUser = new this.userModel({
      email: authData.email,
      username: authData.username,
      createdAt: new Date(),
    });
    const savedUser = await newUser.save();

    const savedAuth = await this.createNewAuth(authData, savedUser._id);

    savedUser.auths.push(savedAuth._id);
    await savedUser.save();

    return savedAuth;
  }
  async updateUserWithAuth(
    authData: ClassicSignUpDto,
    user: User & {
      _id: Types.ObjectId;
    },
  ) {
    const savedAuth = await this.createNewAuth(authData, user._id);
    user.auths.push(savedAuth._id);
    await this.userModel.updateOne(
      {
        _id: user._id,
      },
      { auths: user.auths },
    );
    return savedAuth;
  }
}
