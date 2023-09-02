import { gql } from '@apollo/client';

// const LOGIN = 'vladyslav-zolotarov';

export const GET_USER = gql`
  query GetUser($login: String!) {
    user(login: $login) {
      id
      email
      createdAt
      bio
      avatarUrl
      company
      login
      name
      location
      followers {
        totalCount
      }
      following {
        totalCount
      }
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query GetRepositories($login: String!) {
    user(login: $login) {
      repositories(first: 20, orderBy: { field: CREATED_AT, direction: DESC }) {
        edges {
          node {
            id
            name
            description
            createdAt
            languages(first: 5) {
              edges {
                node {
                  name
                  color
                }
              }
            }
            visibility
          }
        }
      }
    }
  }
`;
