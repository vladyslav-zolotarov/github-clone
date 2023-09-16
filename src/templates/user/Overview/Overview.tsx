import { useQuery } from '@apollo/client';
import { GET_PINNED_ITEMS_REPOSITORY } from '../../../endpoints/queries';
import { useParams } from 'react-router-dom';
import { IPinnedItemsRepository } from '../../../utils/types/queryTypes';
import { Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { RepositoryCard } from '../../../components';

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

  console.log('pinnedRepositoryData', pinnedRepositoryData);

  return (
    <Flex direction='column'>
      <Heading
        as='h2'
        size='sm'
        mb='15px'>
        Pinned
      </Heading>

      <Grid
        templateColumns='1fr 1fr'
        gap='20px'>
        {pinnedRepositoryData?.user.pinnedItems.edges.map(item => {
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
            />
          );
        })}
      </Grid>
    </Flex>
  );
};
