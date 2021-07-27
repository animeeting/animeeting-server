export const getAnimesQuery = (title: string) => `
  query {
    Page {
      media(${title && `search: "${title}", `}type: ANIME) {
        id
        title {
          romaji
        }
        bannerImage
        coverImage {
          extraLarge
          color
        }
        episodes
        description
        startDate {
          month
          year
        }
        endDate {
          month
          year
        }
        format
        isAdult
      }
    }
  }
`;
