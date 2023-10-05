import { useQuery } from '@apollo/client';
import { GET_STARED_REPOSITORIES } from '../../endpoints/queries';
import { IStaredRepository } from '../../utils/types/queryTypes';
import { Text, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { RepositoryCard, RepositoryCardSkeleton } from '../../components';
import useUserStore from '../../utils/store/UserStore';

export const StarRepositoryList = () => {
  const { userLogin } = useParams();

  const { data, loading, error } = useQuery<IStaredRepository>(
    GET_STARED_REPOSITORIES,
    {
      variables: { login: userLogin },
    }
  );

  const { starsCount } = useUserStore(state => ({
    starsCount: state.starsCount,
  }));

  if (loading) {
    return (
      <Flex
        direction='column'
        rowGap='20px'>
        {[...Array(starsCount ? starsCount : 6)].map((_, index) => {
          return (
            <RepositoryCardSkeleton
              hasButtonStar
              hasDateInfo
              key={index}
            />
          );
        })}
      </Flex>
    );
  }

  if (error) return <Text>Error - {error.message}</Text>;

  return (
    <Flex
      direction='column'
      rowGap='20px'>
      {data?.user.starredRepositories.edges.map(item => {
        const currentItem = item.node;

        return (
          <RepositoryCard
            key={currentItem.id}
            id={currentItem.id}
            description={currentItem.description}
            visibility={currentItem.visibility}
            languages={currentItem.languages}
            nameWithOwner={
              currentItem.owner.login !== userLogin && currentItem.nameWithOwner
                ? currentItem.nameWithOwner
                : null
            }
            name={
              currentItem.owner.login === userLogin ? currentItem.name : null
            }
            pushedAt={currentItem.pushedAt}
            hasStarLink={{
              stargazerCount: currentItem.stargazerCount,
              viewerHasStarred: currentItem.viewerHasStarred,
            }}
            hasStarButton={{
              stargazerCount: currentItem.stargazerCount,
              viewerHasStarred: currentItem.viewerHasStarred,
              hideStargazerCount: true,
            }}
          />
        );
      })}
    </Flex>
  );
};
