import { IFollowers } from '../../utils/types/queryTypes';
import { GET_FOLLOWERS } from '../../endpoints/queries';
import { useQuery } from '@apollo/client';
import { Text, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { UserCard, UserCardSkeleton } from '../../components';
import useUserStore from '../../utils/store/UserStore';

export const FollowersList = () => {
  const { userLogin } = useParams();

  const { data, loading, error } = useQuery<IFollowers>(GET_FOLLOWERS, {
    variables: { login: userLogin },
  });

  const { followersCount } = useUserStore(state => ({
    followersCount: state.followersCount,
  }));

  if (loading) {
    return (
      <Flex
        direction='column'
        rowGap='20px'>
        {[...Array(followersCount ? followersCount : 6)].map((_, index) => {
          return <UserCardSkeleton key={index} />;
        })}
      </Flex>
    );
  }

  if (error) return <Text>Error - {error.message}</Text>;

  return (
    <Flex
      direction='column'
      rowGap='20px'>
      {data &&
        !loading &&
        data.user.followers.nodes.map(follower => {
          return (
            <UserCard
              key={follower.id}
              user={follower}
            />
          );
        })}
    </Flex>
  );
};
