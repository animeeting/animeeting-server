export const getAnimesQuery = (title: string) => `
  query {
    Page {
      media(${title && `search: "${title}", `}type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          medium
        }
      }
    }
  }
`;

export const getAnimeQuery = (id: number) => `
  query AnimeMedia{
    Media(id: ${id}){
      id
      title{
        romaji
      }
      status
      description
      format
      startDate{
        day
        month
        year
      }
      endDate{
        day
        month
        year
      }
      season
      episodes
      duration
      trailer{
        id
        site
        thumbnail
      }
      coverImage{
        medium
        color
      }
      bannerImage
      genres
      averageScore
      studios{
        nodes{
          id
          name
          isAnimationStudio
        }
      }
    }
  }
`;
