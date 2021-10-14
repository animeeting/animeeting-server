import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { IRequestUser } from 'src/shared/utils/interfaces';

import { ICreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async listAllUsers() {
    return this.usersService.listAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async showUserProfile(@Request() request: IRequestUser) {
    return this.usersService.showUserProfile(request.user.id);
  }
}
