import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { ICreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
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

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get()
  async listAllUsers() {
    return this.usersService.listAllUsers();
  }
}
