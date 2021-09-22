import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { ormConfig } from './infra/database/config';
import { AnilistModule } from './modules/anilist/anilist.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    MikroOrmModule.forRoot(ormConfig),
    AnilistModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
