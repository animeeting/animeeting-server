import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './infra/database/config/ormconfig';
import { AnilistModule } from './modules/anilist/anilist.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), AnilistModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
