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
