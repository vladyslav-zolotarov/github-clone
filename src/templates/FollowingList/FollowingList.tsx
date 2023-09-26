import { IFollowing } from '../../utils/types/types';
import { GET_FOLLOWING } from '../../endpoints/queries';
import { useQuery } from '@apollo/client';
import { Text, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { UserCard } from '../../components';

export const FollowingList = () => {
  const { userLogin } = useParams();

  const { data, loading, error } = useQuery<IFollowing>(GET_FOLLOWING, {
    variables: { login: userLogin },
  });

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error - {error.message}</Text>;

  return (
    <Flex
      direction='column'
      rowGap='20px'>
      {data &&
        data.user.following.nodes.map(following => {
          return (
            <UserCard
              key={following.id}
              user={following}
            />
          );
        })}
    </Flex>
  );
};
