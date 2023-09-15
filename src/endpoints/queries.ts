import { gql } from '@apollo/client';

export const GET_PINNED_ITEMS_REPOSITORY = gql`
  query getPinnedItemsRepository($login: String!) {
    user(login: $login) {
      pinnedItems(first: 10) {
        edges {
          node {
            ... on Repository {
              id
              name
              description
              languages(orderBy: { field: SIZE, direction: DESC }, first: 1) {
                nodes {
                  name
                  id
                  color
                }
              }
              visibility
            }
          }
        }
      }
    }
  }
`;
