import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { IRequestUser } from 'src/shared/utils/interfaces';

import { ICreateUserDTO } from './dtos/create-user.dto';
import { IUpdateProfileDTO } from './dtos/update-user.dto';
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
  @Put('/profile')
  async updateUser(
    @Request() { user }: IRequestUser,
    @Body()
    { name, nickname, email, password, old_password }: IUpdateProfileDTO,
  ) {
    const updatedUser = await this.usersService.updateUserProfile({
      id: user.id,
      name,
      nickname,
      email,
      password,
      old_password,
    });

    return updatedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async showUserProfile(@Request() request: IRequestUser) {
    return this.usersService.showUserProfile(request.user.id);
  }
}
