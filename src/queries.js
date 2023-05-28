import { gql } from "graphql-request";

export const getRelease = gql`
  query getRelease($releaseSlug: String!, $soundHandle: String!) {
    mintedRelease(soundHandle: $soundHandle, releaseSlug: $releaseSlug) {
      id
      title
      webappUri
      artist {
        id
        name
      }
      coverImage {
        url
      }
      staticCoverImage {
        url
      }
      price
      eggGame {
        nft {
          serialNumber
        }
      }
      topNftsWithComment {
        songSlot
        comment {
          message
        }
      }
      track {
        id
        revealedAudio {
          url
        }
        normalizedPeaks
      }
    }
  }
`;

export const getNewReleases = gql`
  query getNewReleases {
    releases(
      filter: { mintTimeStatus: [PAST] }
      pagination: { after: null, first: 10 }
    ) {
      edges {
        node {
          id
          title
          webappUri
          price
          quantity
          artist {
            id
            name
          }
          coverImage {
            url
          }
          staticCoverImage {
            url
          }
          topNftsWithComment {
            songSlot
            comment {
              message
            }
          }
          track {
            id
            revealedAudio {
              url
            }
            normalizedPeaks
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const getPlaylist = gql`
  query getNewReleases {
    shelf(id: "1bdf3a2e-4cf4-48d8-82cf-c4fbeab79a4e") {
      orderedReleases {
        edges {
          node {
            release {
              id
              title
              webappUri
              price
              quantity
              artist {
                id
                name
              }
              coverImage {
                url
              }
              staticCoverImage {
                url
              }
              topNftsWithComment {
                songSlot
                comment {
                  message
                }
              }
              track {
                id
                revealedAudio {
                  url
                }
                normalizedPeaks
              }
            }
          }
        }
      }
    }
  }
`;
