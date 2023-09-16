export interface IPinnedItemsRepository {
  user: {
    pinnedItems: {
      edges: [
        {
          node: {
            id: string;
            name: string;
            description: string;
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
