import { Module } from '@nestjs/common';
import { AnilistService } from './anilist.service';
import { AnilistController } from './anilist.controller';

@Module({
  providers: [AnilistService],
  controllers: [AnilistController],
})
export class AnilistModule {}
