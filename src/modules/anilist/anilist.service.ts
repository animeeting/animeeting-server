import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { anilistApi } from '../../apis/anilist.api';
import { getAnimeQuery, getAnimesQuery } from '../../apis/graphql/animes.query';

@Injectable()
export class AnilistService {
  async getAnimes(title: string) {
    const response = await anilistApi.post('/', {
      query: getAnimesQuery(title),
    });

    const animes = response.data.data.Page.media;

    return animes;
  }

  async getAnime(id: number) {
    try {
      const response = await anilistApi.post('/', {
        query: getAnimeQuery(id),
      });

      const anime = response.data.data.Media;

      return anime;
    } catch (error) {
      throw new HttpException('Anime not found!', HttpStatus.NOT_FOUND);
    }
  }
}
