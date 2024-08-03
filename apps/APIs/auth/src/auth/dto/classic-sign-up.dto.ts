import { IsString, IsEmail } from "class-validator";

export class ClassicSignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
