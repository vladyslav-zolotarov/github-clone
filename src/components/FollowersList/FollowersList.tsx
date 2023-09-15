import { IFollowers } from '../../utils/types/types';
import { GET_FOLLOWERS } from '../../endpoints/queries';
import { useQuery } from '@apollo/client';
import { Link, Card, CardHeader, Text, Flex, Button } from '@chakra-ui/react';
import { BiBuildingHouse, BiMap } from 'react-icons/bi';
import { useFollowToggler } from '../../hooks/useFollowToggler';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '..';

export const FollowersList = () => {
  const { userLogin } = useParams();

  const { data, loading, error } = useQuery<IFollowers>(GET_FOLLOWERS, {
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
        data.user.followers.nodes.map((follower, index) => {
          return (
            <Card
              key={follower.id}
              size='sm'
              variant='outline'
              p='10px'>
              <CardHeader>
                <Flex gap='20px'>
                  <Avatar
                    size='md'
                    name={follower.name}
                    src={follower.avatarUrl}
                  />
                  <Flex direction='column'>
                    <Flex
                      gap='10px'
                      alignItems='center'>
                      <Link
                        onClick={() =>
                          navigate(`/user/${follower.login}/overview`, {
                            replace: true,
                          })
                        }>
                        <Text fontSize='md'>{follower.name}</Text>
                      </Link>
                      <Text
                        color='blackAlpha.700'
                        fontSize='sm'>
                        {follower.login}
                      </Text>
                    </Flex>
                    {follower.bio && (
                      <Text
                        color='blackAlpha.700'
                        fontSize='sm'>
                        {follower.bio}
                      </Text>
                    )}

                    <Flex gap='10px'>
                      {follower.company && (
                        <Flex alignItems='center'>
                          <BiBuildingHouse />
                          <Text
                            color='blackAlpha.700'
                            fontSize='sm'>
                            {follower.company}
                          </Text>
                        </Flex>
                      )}
                      {follower.location && (
                        <Flex alignItems='center'>
                          <BiMap />
                          <Text
                            color='blackAlpha.700'
                            fontSize='sm'>
                            {follower.location}
                          </Text>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>
                  <Flex ml='auto'>
                    {follower.viewerCanFollow && (
                      <Button
                        onClick={() =>
                          handleFollowToggler(
                            index,
                            follower.id,
                            follower.viewerIsFollowing
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
                        {follower.viewerIsFollowing ? 'Unfollow' : 'Follow'}
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
