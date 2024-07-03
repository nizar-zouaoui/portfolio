import { IsString, IsEmail } from "class-validator";

export class ClassicSignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
