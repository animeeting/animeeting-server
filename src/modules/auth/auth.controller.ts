import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { IAuthUserDTO } from './dtos/auth-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async authUser(@Body() { account, password }: IAuthUserDTO) {
    return await this.authService.authUser({ account, password });
  }
}
