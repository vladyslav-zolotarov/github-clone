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
