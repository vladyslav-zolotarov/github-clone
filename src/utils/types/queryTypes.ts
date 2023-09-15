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
              nodes: [
                {
                  name: string;
                  id: string;
                  color: string;
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
