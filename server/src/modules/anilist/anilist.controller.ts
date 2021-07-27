import { Controller, Get, Query } from '@nestjs/common';
import { AnilistService } from './anilist.service';

@Controller('anilist')
export class AnilistController {
  constructor(private readonly anilistService: AnilistService) {}

  @Get('/animes')
  async listAnimes(@Query('title') title: string) {
    return await this.anilistService.getAnimes(title);
  }
}
