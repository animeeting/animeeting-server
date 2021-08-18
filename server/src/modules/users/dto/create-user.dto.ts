import { IsEmail, Length } from 'class-validator';

export class ICreateUserDTO {
  @Length(2, 100)
  name: string;

  @Length(2, 100)
  nickname: string;

  @IsEmail()
  @Length(0, 200)
  email: string;

  @Length(8, 24)
  password: string;
}
