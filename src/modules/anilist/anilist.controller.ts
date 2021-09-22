import { Controller, Get, Param, Query } from '@nestjs/common';

import { AnilistService } from './anilist.service';

@Controller('anilist')
export class AnilistController {
  constructor(private readonly anilistService: AnilistService) {}

  @Get('/animes')
  async listAnimes(@Query('title') title: string) {
    const animes = await this.anilistService.getAnimes(title);

    return animes;
  }

  @Get('/animes/:id')
  async showAnime(@Param('id') id: string) {
    const anime = await this.anilistService.getAnime(Number(id));

    return anime;
  }
}
