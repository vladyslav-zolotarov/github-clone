export interface IUserInfoForNavigation {
  user: {
    id: string;
    login: string;
    repositories: {
      totalCount: number;
    };
    starredRepositories: {
      totalCount: number;
    };
    projects: {
      totalCount: number;
    };
    packages: {
      totalCount: number;
    };
  };
}

export interface IUser {
  user: {
    id: string;
    email: string;
    createdAt: string;
    bio: string;
    avatarUrl: string;
    company: string;
    login: string;
    name: string;
    location: string;
    isViewer: boolean;
    followers: {
      totalCount: number;
    };
    following: {
      totalCount: number;
    };
    repositories: {
      totalCount: number;
    };
    starredRepositories: {
      totalCount: number;
    };

    itemShowcase: {
      items: {
        totalCount: number;
      };
    };

    organizations: {
      edges: [
        {
          node: {
            avatarUrl: string;
            id: string;
            name: string;
            login: string;
          };
        },
      ];
    };

    pronouns: string;
    websiteUrl: string;
    socialAccounts: {
      edges: [
        {
          node: {
            displayName: string;
            provider: string;
            url: string;
          };
        },
      ];
    };

    status: {
      emojiHTML: string;
      emoji: string;
      expiresAt: string;
      message: string;
    };
  };
}

export interface IStaredRepository {
  user: {
    starredRepositories: {
      edges: [
        {
          node: {
            id: string;
            nameWithOwner: string;
            name: string;

            owner: {
              login: string;
            };
            description: string;
            pushedAt: string;

            stargazerCount: number;
            viewerHasStarred: boolean;

            languages: {
              edges: [
                {
                  node: {
                    name: string;
                    color: string;
                    id: string;
                  };
                },
              ];
            };
            visibility: string;
          };
        },
      ];
    };
  };
}

export interface IRepository {
  user: {
    id: string;
    repositories: {
      edges: [
        {
          node: {
            id: string;
            name: string;
            nameWithOwner: string;

            owner: {
              login: string;
            };

            description: string;
            pushedAt: string;

            stargazerCount: number;
            viewerHasStarred: boolean;

            languages: {
              edges: [
                {
                  node: {
                    name: string;
                    color: string;
                    id: string;
                  };
                },
              ];
            };
            visibility: string;
          };
        },
      ];
    };
  };
}

export interface IFollowers {
  user: {
    id: string;
    followers: {
      nodes: [
        {
          login: string;
          name: string;
          id: string;
          avatarUrl: string;
          bio: string;
          location: string;
          company: string;
          viewerIsFollowing: boolean;
          viewerCanFollow: boolean;
        },
      ];
    };
  };
}

export interface IFollowing {
  user: {
    id: string;
    following: {
      nodes: [
        {
          login: string;
          name: string;
          id: string;
          avatarUrl: string;
          bio: string;
          location: string;
          company: string;
          viewerIsFollowing: boolean;
          viewerCanFollow: boolean;
        },
      ];
    };
  };
}

export interface IRepositoryInfo {
  repository: {
    id: string;
    name: string;
    visibility: string;
    viewerHasStarred: boolean;
    stargazerCount: number;
    description: string;

    watchers: {
      totalCount: number;
    };

    forkCount: number;
    forkingAllowed: boolean;

    owner: {
      id: string;
      avatarUrl: string;
      login: string;
    };

    languages: {
      totalCount: number;
      totalSize: number;
      edges: [
        {
          node: {
            name: string;
            id: string;
            color: string;
          };
          size: number;
        },
      ];
    };
  };
}

export interface IRepositoryInfoTree {
  repository: {
    object: {
      id: string;
      entries: [
        {
          extension: string;
          lineCount: number;
          path: string;
          pathRaw: string;
          size: number;
          type: string;
          mode: number;
          name: string;
          nameRaw: string;
          oid: string;
          object: {
            id: string;
            text: string;
          };
        },
      ];
    };
  };
}

export interface IRepositoryInfoCommit {
  repository: {
    object: {
      author: {
        avatarUrl: string;
        user: {
          login: string;
        };
      };
      messageHeadline: string;
      messageBody: string;

      message: string;
      abbreviatedOid: string;
      committedDate: string;
      history: {
        totalCount: number;
        edges: {
          node: {
            message: string;
          };
        };
      };
    };
  };
}

export interface IRepositoryCommitList {
  repository: {
    object: {
      history: {
        edges: [
          {
            node: {
              author: {
                name: string;
                avatarUrl: string;
                date: string;
                email: string;
              };
              authoredDate: string;
              oid: string;
              abbreviatedOid: string;
              authoredByCommitter: string;
              messageBody: string;
              messageHeadline: string;
            };
          },
        ];
      };
    };
  };
}

export interface IPinnedItemsRepository {
  user: {
    itemShowcase: {
      hasPinnedItems: boolean;
      items: {
        edges: [
          {
            node: {
              id: string;
              name: string;
              nameWithOwner: string;
              owner: {
                login: string;
              };
              description: string;
              stargazerCount: number;
              viewerHasStarred: boolean;
              languages: {
                edges: [
                  {
                    node: {
                      name: string;
                      color: string;
                      id: string;
                    };
                  },
                ];
              };
              visibility: string;
            };
          },
        ];
      };
    };
  };
}

export interface IContributionCalendarInfo {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        colors: [];
        isHalloween: boolean;
        months: [
          {
            firstDay: string;
            name: string;
            totalWeeks: number;
            year: number;
          },
        ];
        totalContributions: number;
        weeks: [
          {
            contributionDays: [
              {
                color: string;
                contributionCount: number;
                contributionLevel: string;
                date: string;
                weekday: number;
              },
            ];
          },
        ];
        firstDay: string;
      };
    };
  };
}

export interface IContributionsCollectionInfo {
  user: {
    contributionsCollection: {
      startedAt: string;
      endedAt: string;
      contributionYears: [];
    };
  };
}
