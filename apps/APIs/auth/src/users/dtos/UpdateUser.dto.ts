import { IsOptional, IsString, IsBoolean } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;
}
