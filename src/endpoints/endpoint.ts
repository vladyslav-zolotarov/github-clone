import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser($login: String!) {
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
  query getRepositories($login: String!) {
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
  query getFollowers($login: String!) {
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
          viewerIsFollowing
        }
      }
    }
  }
`;

export const GET_FOLLOWING = gql`
  query getFollowing($login: String!) {
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

export const FOLLOW_USER = gql`
  mutation followUser($userId: ID!) {
    followUser(input: { userId: $userId }) {
      clientMutationId
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation unfollowUser($userId: ID!) {
    unfollowUser(input: { userId: $userId }) {
      clientMutationId
    }
  }
`;
