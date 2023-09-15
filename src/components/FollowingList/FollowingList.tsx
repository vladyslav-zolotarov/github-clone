import { IFollowing } from '../../utils/types/types';
import { GET_FOLLOWING } from '../../endpoints/queries';
import { useQuery } from '@apollo/client';
import { Link, Card, CardHeader, Text, Flex, Button } from '@chakra-ui/react';
import { BiBuildingHouse, BiMap } from 'react-icons/bi';
import { useFollowToggler } from '../../hooks/useFollowToggler';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar } from '../../components';

export const FollowingList = () => {
  const { userLogin } = useParams();

  const { data, loading, error } = useQuery<IFollowing>(GET_FOLLOWING, {
    variables: { login: userLogin },
  });

  const { clickedBtnId, followLoading, unfollowLoading, handleFollowToggler } =
    useFollowToggler();

  const navigate = useNavigate();

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error - {error.message}</Text>;

  return (
    <Flex
      direction='column'
      rowGap='20px'>
      {data &&
        data.user.following.nodes.map((following, index) => {
          return (
            <Card
              key={following.id}
              size='sm'
              variant='outline'
              p='10px'>
              <CardHeader>
                <Flex gap='20px'>
                  <Avatar
                    size='md'
                    name={following.name}
                    src={following.avatarUrl}
                  />
                  <Flex direction='column'>
                    <Flex
                      gap='10px'
                      alignItems='center'>
                      <Link
                        onClick={() =>
                          navigate(`/user/${following.login}/overview`, {
                            replace: true,
                          })
                        }>
                        <Text fontSize='md'>{following.name}</Text>
                      </Link>

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
                    {following.viewerCanFollow && (
                      <Button
                        onClick={() =>
                          handleFollowToggler(
                            index,
                            following.id,
                            following.viewerIsFollowing
                          )
                        }
                        isLoading={
                          clickedBtnId === index
                            ? followLoading || unfollowLoading
                            : false
                        }
                        loadingText='Loading'
                        spinnerPlacement='end'
                        size='sm'
                        variant='outline'>
                        {following.viewerIsFollowing ? 'Unfollow' : 'Follow'}
                      </Button>
                    )}
                  </Flex>
                </Flex>
              </CardHeader>
            </Card>
          );
        })}
    </Flex>
  );
};
