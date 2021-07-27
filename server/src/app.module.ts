import { Module } from '@nestjs/common';
import { AnilistModule } from './modules/anilist/anilist.module';

@Module({
  imports: [AnilistModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
