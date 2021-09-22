import { Module } from '@nestjs/common';

import { AnilistController } from './anilist.controller';
import { AnilistService } from './anilist.service';

@Module({
  providers: [AnilistService],
  controllers: [AnilistController],
})
export class AnilistModule {}
