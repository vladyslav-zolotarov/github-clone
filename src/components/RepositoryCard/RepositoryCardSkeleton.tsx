import {
  Card,
  CardHeader,
  Flex,
  CardBody,
  CardFooter,
  Skeleton,
  Circle,
} from '@chakra-ui/react';
import { Badge } from '..';
import { StarButton } from '../Buttons';
import { HTMLAttributes } from 'react';

interface RepositoryCardSkeletonState
  extends HTMLAttributes<HTMLButtonElement> {
  hasButtonStar?: boolean;
  hasDateInfo?: boolean;
}

export const RepositoryCardSkeleton = ({
  hasButtonStar,
  hasDateInfo,
}: RepositoryCardSkeletonState) => {
  return (
    <Card
      size='sm'
      variant='outline'
      p='15px'>
      <CardHeader p='5px'>
        <Flex
          gap='5px'
          alignItems='center'>
          <Skeleton
            height='13px'
            width='100px'
          />
          <Badge visibility={'public'} />
          {hasButtonStar && (
            <Flex ml='auto'>
              <StarButton
                id={''}
                viewerHasStarred={false}
                stargazerCount={0}
                variant='starButton'
              />
            </Flex>
          )}
        </Flex>
      </CardHeader>
      <CardBody p='5px'>
        <Skeleton
          height='18px'
          width='350px'
        />
      </CardBody>
      <CardFooter p='9px'>
        <Flex
          gap='10px'
          alignItems='center'>
          <Flex
            alignItems='center'
            gap='4px'>
            <Circle
              size='10px'
              background='blackAlpha.700'
            />
            <Skeleton
              height='13px'
              width='100px'
            />
            {hasDateInfo && (
              <Skeleton
                height='13px'
                width='100px'
              />
            )}
          </Flex>
        </Flex>
      </CardFooter>
    </Card>
  );
};
