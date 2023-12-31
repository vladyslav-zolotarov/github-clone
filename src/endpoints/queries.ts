import { gql } from '@apollo/client';

export const GET_USER_INFO_FOR_NAVIGATION = gql`
  query getUserInfoForNavigation($login: String!) {
    user(login: $login) {
      login
      repositories {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      projects {
        totalCount
      }
      packages {
        totalCount
      }
    }
  }
`;

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
      isViewer
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      itemShowcase {
        items(first: 100) {
          totalCount
        }
      }

      organizations(first: 5) {
        edges {
          node {
            avatarUrl
            id
            name
            login
          }
        }
      }

      pronouns
      websiteUrl
      socialAccounts(first: 10) {
        totalCount
        edges {
          node {
            displayName
            provider
            url
          }
        }
      }

      status {
        emojiHTML
        emoji
        expiresAt
        message
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
            nameWithOwner
            owner {
              login
            }
            description
            pushedAt
            stargazerCount
            viewerHasStarred
            languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                node {
                  name
                  color
                  id
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

export const GET_STARED_REPOSITORIES = gql`
  query getRepositories($login: String!) {
    user(login: $login) {
      starredRepositories(first: 100) {
        edges {
          node {
            id
            description
            name
            nameWithOwner
            owner {
              login
            }
            pushedAt
            stargazerCount
            viewerHasStarred
            languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                node {
                  name
                  color
                  id
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
          author {
            avatarUrl
            user {
              login
            }
          }

          messageHeadline
          messageBody

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

export const GET_REPOSITORY_COMMIT_LIST = gql`
  query getRepositoryInfoCommit($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      object(expression: "HEAD") {
        ... on Commit {
          history {
            edges {
              node {
                author {
                  name
                  avatarUrl
                  date
                  email
                }
                comments {
                  totalCount
                }
                authoredDate
                oid
                abbreviatedOid
                authoredByCommitter
                messageBody
                messageHeadline
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
      itemShowcase {
        hasPinnedItems
        items(first: 6) {
          totalCount
          edges {
            node {
              ... on Repository {
                id
                name
                nameWithOwner
                owner {
                  login
                }
                description
                stargazerCount
                viewerHasStarred
                languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
                  edges {
                    node {
                      name
                      color
                      id
                    }
                  }
                }
                visibility
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_CONTRIBUTION_CALENDAR_INFO = gql`
  query contributionCalendarInfo($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          colors
          isHalloween
          months {
            firstDay
            name
            totalWeeks
            year
          }
          totalContributions
          weeks {
            contributionDays {
              color
              contributionCount
              contributionLevel
              date
              weekday
            }
            firstDay
          }
        }
      }
    }
  }
`;

export const GET_CONTRIBUTION_COLLECTION_INFO = gql`
  query contributionsCollection($login: String!) {
    user(login: $login) {
      contributionsCollection {
        startedAt
        endedAt
        contributionYears

        latestRestrictedContributionDate

        doesEndInCurrentMonth
        earliestRestrictedContributionDate

        isSingleDay
        joinedGitHubContribution {
          url
        }

        firstIssueContribution {
          ... on Contribution {
            url
          }
        }

        commitContributionsByRepository {
          repository {
            name
          }
          contributions {
            totalCount
          }
          resourcePath
          url
        }

        contributionCalendar {
          totalContributions
        }
        totalCommitContributions
      }
    }
  }
`;

export const GET_VIEWER = gql`
  query getViewer {
    viewer {
      email
    }
  }
`;
