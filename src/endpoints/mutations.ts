import { gql } from '@apollo/client';

export const FOLLOW_USER_MUTATION = gql`
  mutation followUser($userId: ID!) {
    followUser(input: { userId: $userId }) {
      clientMutationId
    }
  }
`;

export const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($userId: ID!) {
    unfollowUser(input: { userId: $userId }) {
      clientMutationId
    }
  }
`;

export const ADD_STAR_MUTATION = gql`
  mutation AddStar($starrableId: ID!) {
    addStar(input: { starrableId: $starrableId }) {
      clientMutationId
      starrable {
        stargazerCount
      }
    }
  }
`;

export const REMOVE_STAR_MUTATION = gql`
  mutation RemoveStar($starrableId: ID!) {
    removeStar(input: { starrableId: $starrableId }) {
      clientMutationId
      starrable {
        stargazerCount
      }
    }
  }
`;
