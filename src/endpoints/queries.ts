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
      repositories(first: 20, orderBy: { field: PUSHED_AT, direction: DESC }) {
        edges {
          node {
            id
            name
            description
            pushedAt
            languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
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
          viewerCanFollow
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
          viewerIsFollowing
          viewerCanFollow
        }
      }
    }
  }
`;

export const GET_REPOSITORY_INFO = gql`
  query getRepositoryInfoTree($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      id
      name
      visibility
      viewerHasStarred
      stargazerCount

      watchers {
        totalCount
      }

      forkCount
      forkingAllowed

      owner {
        id
        avatarUrl(size: 50)
        login
      }

      description
      languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
        totalCount
        totalSize
        edges {
          node {
            name
            id
            color
          }
          size
        }
      }
    }
  }
`;

export const GET_REPOSITORY_INFO_TREE = gql`
  query getRepositoryInfoTree($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      object(expression: "HEAD:") {
        ... on Tree {
          id
          entries {
            extension
            lineCount
            path
            pathRaw
            size
            type
            mode
            name
            nameRaw
            oid
            object {
              ... on Blob {
                id
                text
              }
            }
          }
          oid
        }
      }
    }
  }
`;

export const GET_REPOSITORY_INFO_COMMIT = gql`
  query getRepositoryInfoCommit($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      object(expression: "HEAD") {
        ... on Commit {
          message
          abbreviatedOid
          committedDate
          history {
            totalCount
            edges {
              node {
                message
              }
            }
          }
        }
      }
    }
  }
`;

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
