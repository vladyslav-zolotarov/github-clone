import { gql } from '@apollo/client';

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
      repositories(first: 20, orderBy: { field: UPDATED_AT, direction: DESC }) {
        edges {
          node {
            id
            name
            description
            updatedAt
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

export const GET_FOLLOWERS = gql`
  query GetFollowers($login: String!) {
    user(login: $login) {
      id
      followers(first: 10) {
        nodes {
          login
          name
          id
          avatarUrl(size: 100)
          bio
          location
          company
        }
      }
    }
  }
`;

export const GET_FOLLOWING = gql`
  query GetFollowing($login: String!) {
    user(login: $login) {
      id
      following(first: 10) {
        nodes {
          login
          name
          id
          avatarUrl(size: 100)
          bio
          location
          company
        }
      }
    }
  }
`;
