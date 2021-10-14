import { IsEmail, IsOptional, IsUUID, Length } from 'class-validator';

export class IUpdateProfileDTO {
  @IsOptional()
  @IsUUID('4')
  id: string;

  @Length(2, 100)
  name: string;

  @Length(2, 100)
  nickname: string;

  @IsEmail()
  @Length(0, 200)
  email: string;

  @IsOptional()
  @Length(8, 24)
  password?: string;

  @IsOptional()
  @Length(8, 24)
  old_password?: string;
}
