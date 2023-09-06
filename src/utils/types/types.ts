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
    followers: {
      totalCount: number;
    };
    following: {
      totalCount: number;
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
            description: string;
            updatedAt: string;
            languages: {
              edges: [
                {
                  node: {
                    name: string;
                    color: string;
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
    name: string;
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
