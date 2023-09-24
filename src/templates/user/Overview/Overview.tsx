import { useQuery } from '@apollo/client';
import { GET_PINNED_ITEMS_REPOSITORY } from '../../../endpoints/queries';
import { useParams } from 'react-router-dom';
import { IPinnedItemsRepository } from '../../../utils/types/queryTypes';
import { Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { ContributionCalendar, RepositoryCard } from '../../../components';

export const Overview = () => {
  const { userLogin } = useParams();
  const {
    data: pinnedRepositoryData,
    loading: pinnedRepositoryLoading,
    error: pinnedRepositoryError,
  } = useQuery<IPinnedItemsRepository>(GET_PINNED_ITEMS_REPOSITORY, {
    variables: { login: userLogin },
  });

  if (pinnedRepositoryLoading) return <Text>Loading...</Text>;

  if (pinnedRepositoryError) return <Text>Error...</Text>;

  return (
    <Flex direction='column'>
      {pinnedRepositoryData?.user.itemShowcase.items.edges.length ? (
        <Grid
          templateColumns='1fr 1fr'
          gap='20px'
          mb='50px'>
          <>
            <Grid gridColumn='1 / span 2'>
              <Heading
                as='h2'
                size='sm'
                fontWeight='medium'>
                {pinnedRepositoryData?.user.itemShowcase.hasPinnedItems
                  ? 'Pinned'
                  : 'Popular repositories'}
              </Heading>
            </Grid>
            {pinnedRepositoryData?.user.itemShowcase.items.edges.map(item => {
              const currentItem = item.node;
              return (
                <RepositoryCard
                  key={currentItem.id}
                  id={currentItem.id}
                  description={currentItem.description}
                  visibility={currentItem.visibility}
                  languages={currentItem.languages}
                  name={currentItem.name}
                  icon={true}
                  isStarIcon={{
                    stargazerCount: currentItem.stargazerCount,
                    viewerHasStarred: currentItem.viewerHasStarred,
                  }}
                />
              );
            })}
          </>
        </Grid>
      ) : (
        <></>
      )}

      <ContributionCalendar />
    </Flex>
  );
};
