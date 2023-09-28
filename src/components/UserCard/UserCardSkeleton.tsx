import { Button, Card, CardHeader, Flex, Skeleton } from '@chakra-ui/react';
import { UserAvatar } from '..';

export const UserCardSkeleton = () => {
  return (
    <Card
      size='sm'
      variant='outline'
      p='10px'>
      <CardHeader>
        <Flex gap='20px'>
          <UserAvatar size='md' />
          <Flex direction='column'>
            <Flex
              gap='10px'
              alignItems='center'
              marginBottom='5px'>
              <Skeleton
                height='13px'
                width='100px'
              />
              <Skeleton
                height='13px'
                width='100px'
              />
            </Flex>

            <Skeleton
              marginBottom='5px'
              height='13px'
              width='210px'
            />

            <Flex gap='10px'>
              <Skeleton
                height='13px'
                width='100px'
              />

              <Skeleton
                height='13px'
                width='100px'
              />
            </Flex>
          </Flex>
          <Flex ml='auto'>
            <Button
              size='sm'
              variant='outline'>
              Follow
            </Button>
          </Flex>
        </Flex>
      </CardHeader>
    </Card>
  );
};
