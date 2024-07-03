import { IsEmail, IsString } from "class-validator";

export class ClassicSignInDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
