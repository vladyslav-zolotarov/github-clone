import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../../endpoints/queries';
import { IRepository } from '../../utils/types/queryTypes';
import { Text, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { RepositoryCard, RepositoryCardSkeleton } from '../../components';
import useUserStore from '../../utils/store/UserStore';

export const RepositoryList = () => {
  const { userLogin } = useParams();

  const { data, loading, error } = useQuery<IRepository>(GET_REPOSITORIES, {
    variables: { login: userLogin },
  });

  const { repositoriesCount } = useUserStore(state => ({
    repositoriesCount: state.repositoriesCount,
  }));

  if (loading) {
    return (
      <Flex
        direction='column'
        rowGap='20px'>
        {[...Array(repositoriesCount ? repositoriesCount : 6)].map(
          (_, index) => {
            return (
              <RepositoryCardSkeleton
                hasButtonStar
                hasDateInfo
                key={index}
              />
            );
          }
        )}
      </Flex>
    );
  }

  if (error) return <Text>Error - {error.message}</Text>;

  return (
    <Flex
      direction='column'
      rowGap='20px'>
      {data?.user.repositories.edges.map(item => {
        const currentItem = item.node;

        return (
          <RepositoryCard
            key={currentItem.id}
            id={currentItem.id}
            description={currentItem.description}
            visibility={currentItem.visibility}
            languages={currentItem.languages}
            name={currentItem.name}
            pushedAt={currentItem.pushedAt}
            isStarButton={{
              stargazerCount: currentItem.stargazerCount,
              viewerHasStarred: currentItem.viewerHasStarred,
            }}
          />
        );
      })}
    </Flex>
  );
};
