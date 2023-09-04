import { IFollowing } from '../../utils/types/types';
import { GET_FOLLOWING } from '../../endpoints/endpoint';
import { useQuery } from '@apollo/client';
import { Card, CardHeader, Image, Text, Flex, Button } from '@chakra-ui/react';
import { BiBuildingHouse, BiMap } from 'react-icons/bi';

export const FollowingList = () => {
  const login = 'vladyslav-zolotarov';
  const { data, loading, error } = useQuery<IFollowing>(GET_FOLLOWING, {
    variables: { login },
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
            <Card
              key={following.id}
              size='sm'
              variant='outline'
              p='10px'>
              <CardHeader>
                <Flex gap='20px'>
                  <Image
                    rounded={'50%'}
                    boxSize='50px'
                    src={following.avatarUrl}
                    alt={following.name}
                  />
                  <Flex direction='column'>
                    <Flex
                      gap='10px'
                      alignItems='center'>
                      <Text fontSize='md'>{following.name}</Text>
                      <Text
                        color='blackAlpha.700'
                        fontSize='sm'>
                        {following.login}
                      </Text>
                    </Flex>
                    {following.bio && (
                      <Text
                        color='blackAlpha.700'
                        fontSize='sm'>
                        {following.bio}
                      </Text>
                    )}

                    <Flex gap='10px'>
                      {following.company && (
                        <Flex alignItems='center'>
                          <BiBuildingHouse />
                          <Text
                            color='blackAlpha.700'
                            fontSize='sm'>
                            {following.company}
                          </Text>
                        </Flex>
                      )}
                      {following.location && (
                        <Flex alignItems='center'>
                          <BiMap />
                          <Text
                            color='blackAlpha.700'
                            fontSize='sm'>
                            {following.location}
                          </Text>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>

                  <Flex ml='auto'>
                    <Button
                      size='sm'
                      variant='outline'>
                      Unfollow
                    </Button>
                  </Flex>
                </Flex>
              </CardHeader>
            </Card>
          );
        })}
    </Flex>
  );
};
