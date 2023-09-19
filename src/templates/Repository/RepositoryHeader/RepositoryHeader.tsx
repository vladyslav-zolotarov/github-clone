import { Flex, Heading } from '@chakra-ui/react';
import { IRepositoryInfo } from '../../../utils/types/types';

import { Avatar, Badge } from '../../../components';
import {
  ForkButton,
  PinButton,
  StarButton,
  WatchButton,
} from '../../../components/Buttons';
import { GET_REPOSITORY_INFO } from '../../../endpoints/queries';

interface RepositoryHeaderProps {
  data: IRepositoryInfo;
}

export const RepositoryHeader = ({ data }: RepositoryHeaderProps) => {
  return (
    <Flex
      paddingBottom='20px'
      borderBottom='1px'
      borderColor='blackAlpha.300'
      justifyContent='space-between'
      alignItems='center'>
      <Flex
        gap='10px'
        alignItems='center'>
        <Avatar
          name={data?.repository.owner.login}
          src={data?.repository.owner.avatarUrl}
        />
        <Heading size='md'>{data?.repository.name}</Heading>
        <Badge visibility={data?.repository.visibility} />
      </Flex>

      <Flex
        alignItems='center'
        gap='10px'>
        <PinButton />
        <WatchButton totalCount={data?.repository.watchers.totalCount} />
        <ForkButton
          forkCount={data?.repository.forkCount}
          forkingAllowed={data?.repository.forkingAllowed}
        />
        <StarButton
          id={data?.repository.id}
          viewerHasStarred={data?.repository.viewerHasStarred}
          stargazerCount={data?.repository.stargazerCount}
          endpointQueryUpdate={GET_REPOSITORY_INFO}
          variant='starButton'
        />
      </Flex>
    </Flex>
  );
};
