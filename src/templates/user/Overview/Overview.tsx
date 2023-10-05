import { useQuery } from '@apollo/client';
import { GET_PINNED_ITEMS_REPOSITORY } from '../../../endpoints/queries';
import { useParams } from 'react-router-dom';
import { IPinnedItemsRepository } from '../../../utils/types/queryTypes';
import { Flex, Grid, Heading, Text } from '@chakra-ui/react';
import {
  ContributionCalendar,
  RepositoryCard,
  RepositoryCardSkeleton,
} from '../../../components';
import useUserStore from '../../../utils/store/UserStore';

export const Overview = () => {
  const { userLogin } = useParams();
  const {
    data: pinnedRepositoryData,
    loading: pinnedRepositoryLoading,
    error: pinnedRepositoryError,
  } = useQuery<IPinnedItemsRepository>(GET_PINNED_ITEMS_REPOSITORY, {
    variables: { login: userLogin },
  });

  const { pinnedRepositoriesCount } = useUserStore(state => ({
    pinnedRepositoriesCount: state.pinnedRepositoriesCount,
  }));

  if (pinnedRepositoryError) return <Text>Error...</Text>;

  return (
    <Flex direction='column'>
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
              {pinnedRepositoryData &&
              !pinnedRepositoryLoading &&
              pinnedRepositoryData.user.itemShowcase.hasPinnedItems
                ? 'Pinned'
                : 'Popular repositories'}
            </Heading>
          </Grid>
          {pinnedRepositoryData &&
          !pinnedRepositoryLoading &&
          pinnedRepositoryData.user.itemShowcase.items.edges.length ? (
            pinnedRepositoryData.user.itemShowcase.items.edges.map(item => {
              const currentItem = item.node;

              return (
                <RepositoryCard
                  key={currentItem.id}
                  id={currentItem.id}
                  description={currentItem.description}
                  visibility={currentItem.visibility}
                  languages={currentItem.languages}
                  nameWithOwner={
                    currentItem.owner.login !== userLogin &&
                    currentItem.nameWithOwner
                      ? currentItem.nameWithOwner
                      : null
                  }
                  name={
                    currentItem.owner.login === userLogin
                      ? currentItem.name
                      : null
                  }
                  icon={true}
                  hasStarIcon={{
                    stargazerCount: currentItem.stargazerCount,
                    viewerHasStarred: currentItem.viewerHasStarred,
                  }}
                />
              );
            })
          ) : (
            <>
              {[
                ...Array(pinnedRepositoriesCount ? pinnedRepositoriesCount : 4),
              ].map((_, index) => {
                return <RepositoryCardSkeleton key={index} />;
              })}
            </>
          )}
        </>
      </Grid>

      <ContributionCalendar />
    </Flex>
  );
};
