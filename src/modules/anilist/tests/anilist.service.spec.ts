import { HttpException, HttpStatus } from '@nestjs/common';
import { anilistApi } from 'src/apis/anilist.api';
import {
  anime,
  animeResponse,
  animesResponse,
} from 'src/shared/utils/mocks/anilist';

import { AnilistService } from '../anilist.service';

const anilistService = new AnilistService();

describe('Anilist Service', () => {
  it('should be able to return a anime list', async () => {
    jest
      .spyOn(anilistApi, 'post')
      .mockImplementationOnce(() => Promise.resolve(animesResponse));

    const [response] = await anilistService.getAnimes('Haikyuu!!');

    expect(response.id).toBe(anime.id);
  });

  it('should be able to return a anime', async () => {
    jest
      .spyOn(anilistApi, 'post')
      .mockImplementationOnce(() => Promise.resolve(animeResponse));

    const response = await anilistService.getAnime(99);

    expect(response.title.romaji).toBe(anime.title.romaji);
  });

  it('should be able to return an unexistent anime', async () => {
    jest
      .spyOn(anilistApi, 'post')
      .mockImplementationOnce(() => Promise.reject('error'));

    try {
      await anilistService.getAnime(99);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Anime not found!');
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });
});
