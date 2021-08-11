import { Module } from '@nestjs/common';
import { AnilistModule } from './modules/anilist/anilist.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AnilistModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
