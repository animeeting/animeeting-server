import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { jwtConfig } from '../../config/auth';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expireIn },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
