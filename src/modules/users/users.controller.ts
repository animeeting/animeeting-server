import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { ICreateUserDTO } from './dtos/create-user.dto';
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async listAllUsers() {
    return this.usersService.listAllUsers();
  }
}
