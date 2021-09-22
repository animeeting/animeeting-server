import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { jwt } from '../../config';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwt.secret,
      signOptions: { expiresIn: jwt.expiresIn },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
