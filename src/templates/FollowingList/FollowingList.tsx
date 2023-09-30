import { IFollowing } from '../../utils/types/queryTypes';
import { GET_FOLLOWING } from '../../endpoints/queries';
import { useQuery } from '@apollo/client';
import { Text, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { UserCard, UserCardSkeleton } from '../../components';

export const FollowingList = () => {
  const { userLogin } = useParams();

  const { data, loading, error } = useQuery<IFollowing>(GET_FOLLOWING, {
    variables: { login: userLogin },
  });

  if (loading) {
    return (
      <Flex
        direction='column'
        rowGap='20px'>
        {[...Array(6)].map((_, index) => {
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
