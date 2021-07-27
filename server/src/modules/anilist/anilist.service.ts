import { Injectable } from '@nestjs/common';
import { anilistApi } from 'src/apis/anilist.api';
import { getAnimesQuery } from 'src/apis/graphql/animes.query';

@Injectable()
export class AnilistService {
  async getAnimes(title: string) {
    const response = await anilistApi.post('/', {
      query: getAnimesQuery(title),
    });

    const animes = response.data.data.Page.media;

    return animes;
  }
}
