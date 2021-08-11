import { Body, Controller, Get, Post } from '@nestjs/common';
import { ICreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() { name, email, nickname, password }: ICreateUserDTO,
  ) {
    const user = await this.usersService.createUser({
      name,
      email,
      nickname,
      password,
    });

    return user;
  }

  @Get()
  async listAllUsers() {
    return this.usersService.listAllUsers();
  }
}
