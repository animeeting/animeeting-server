export const anime = {
  id: 20464,
  title: {
    romaji: 'Haikyuu!!',
  },
  bannerImage:
    'https://s4.anilist.co/file/anilistcdn/media/anime/banner/20464-HbmkPacki4sl.jpg',
  coverImage: {
    extraLarge:
      'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20464-eW7ZDBOcn74a.png',
    color: '#e48635',
  },
  episodes: 25,
  duration: 24,
  description: 'Volleyball Anime',
  startDate: {
    month: 4,
    year: 2014,
  },
  endDate: {
    month: 9,
    year: 2014,
  },
  format: 'TV',
  isAdult: false,
};

export const animesResponse = {
  data: {
    data: {
      Page: {
        media: [anime],
      },
    },
  },
};

export const animeResponse = {
  data: {
    data: {
      Media: anime,
    },
  },
};
