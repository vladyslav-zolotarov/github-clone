import { gql } from '@apollo/client';

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
