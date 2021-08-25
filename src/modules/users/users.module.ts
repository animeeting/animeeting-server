import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.model';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    {
      provide: 'USERS_REPOSITORY',
      useClass: UsersRepository,
    },
  ],
  controllers: [UsersController],
  exports: [
    {
      provide: 'USERS_REPOSITORY',
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}
