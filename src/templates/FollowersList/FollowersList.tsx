import { IFollowers } from '../../utils/types/types';
import { GET_FOLLOWERS } from '../../endpoints/queries';
import { useQuery } from '@apollo/client';
import { Text, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { UserCard } from '../../components';

export const FollowersList = () => {
  const { userLogin } = useParams();

  const { data, loading, error } = useQuery<IFollowers>(GET_FOLLOWERS, {
    variables: { login: userLogin },
  });

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error - {error.message}</Text>;

  return (
    <Flex
      direction='column'
      rowGap='20px'>
      {data &&
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
