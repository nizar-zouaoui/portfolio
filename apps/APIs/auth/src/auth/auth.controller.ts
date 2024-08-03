import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ClassicSignInDto } from "./dto/classic-sign-in.dto";
import { ClassicSignUpDto } from "./dto/classic-sign-up.dto";
import { IAuthController } from "./auth.controller.interface";

@Controller("auth")
export class AuthController implements IAuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("classic/login")
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  classicSignIn(@Body() classicSignInDto: ClassicSignInDto) {
    return this.authService.classicSignIn(classicSignInDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("classic/sign-up")
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  classicSignUp(@Body() classicSignUpDto: ClassicSignUpDto) {
    return this.authService.classicSignUp(classicSignUpDto);
  }
}
