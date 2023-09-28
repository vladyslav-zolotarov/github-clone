import { Card, CardHeader, Flex, Button, Text, Link } from '@chakra-ui/react';
import { BiBuildingHouse, BiMap } from 'react-icons/bi';
import { UserAvatar } from '..';
import { useFollowToggler } from '../../hooks/useFollowToggler';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  user: {
    login: string;
    name: string;
    id: string;
    avatarUrl: string;
    bio: string;
    location: string;
    company: string;
    viewerIsFollowing: boolean;
    viewerCanFollow: boolean;
  };
}

export const UserCard = (data: UserCardProps) => {
  const navigate = useNavigate();

  const { clickedBtnId, followLoading, unfollowLoading, handleFollowToggler } =
    useFollowToggler();

  return (
    <Card
      size='sm'
      variant='outline'
      p='10px'>
      <CardHeader>
        <Flex gap='20px'>
          <UserAvatar
            size='md'
            name={data.user.name}
            src={data.user.avatarUrl}
          />
          <Flex direction='column'>
            <Flex
              gap='10px'
              alignItems='center'>
              <Link
                onClick={() =>
                  navigate(`/user/${data.user.login}/overview`, {
                    replace: true,
                  })
                }>
                <Flex
                  gap='10px'
                  alignItems='center'>
                  {data.user.name ? (
                    <Text fontSize='md'>{data.user.name}</Text>
                  ) : null}
                  {data.user.login ? (
                    <Text
                      color='blackAlpha.700'
                      fontSize='sm'>
                      {data.user.login}
                    </Text>
                  ) : null}
                </Flex>
              </Link>
            </Flex>
            {data.user.bio ? (
              <Text
                color='blackAlpha.700'
                fontSize='sm'>
                {data.user.bio}
              </Text>
            ) : null}

            <Flex gap='10px'>
              {data.user.company ? (
                <Flex alignItems='center'>
                  <BiBuildingHouse />
                  <Text
                    color='blackAlpha.700'
                    fontSize='sm'>
                    {data.user.company}
                  </Text>
                </Flex>
              ) : null}
              {data.user.location ? (
                <Flex alignItems='center'>
                  <BiMap />
                  <Text
                    color='blackAlpha.700'
                    fontSize='sm'>
                    {data.user.location}
                  </Text>
                </Flex>
              ) : null}
            </Flex>
          </Flex>
          <Flex ml='auto'>
            {data.user.viewerCanFollow ? (
              <Button
                onClick={() =>
                  handleFollowToggler(data.user.id, data.user.viewerIsFollowing)
                }
                isLoading={
                  clickedBtnId === data.user.id
                    ? followLoading || unfollowLoading
                    : false
                }
                loadingText='Loading'
                spinnerPlacement='end'
                size='sm'
                variant='outline'>
                {data.user.viewerIsFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            ) : null}
          </Flex>
        </Flex>
      </CardHeader>
    </Card>
  );
};
