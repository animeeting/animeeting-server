import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnilistModule } from './modules/anilist/anilist.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [TypeOrmModule.forRoot(), AnilistModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
