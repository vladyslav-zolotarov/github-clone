import { Flex, Heading, Text, Badge, Avatar } from '@chakra-ui/react';
import { IRepositoryInfo } from '../../../utils/types/types';

import { StarButton } from '../../../components';

interface RepositoryHeaderProps {
  data: IRepositoryInfo;
}

export const RepositoryHeader = ({ data }: RepositoryHeaderProps) => {
  return (
    <Flex
      paddingBlock='20px'
      borderBottom='1px'
      borderColor='blackAlpha.300'
      justifyContent='space-between'
      alignItems='center'>
      <Flex
        gap='10px'
        alignItems='center'>
        <Avatar
          size='xs'
          name={data?.repository.owner.login}
          src={data?.repository.owner.avatarUrl}
        />
        <Heading size='md'>{data?.repository.name}</Heading>

        <Badge
          variant='outline'
          colorScheme='blackAlpha'
          borderRadius='20px'
          padding='1px 8px'
          color='blackAlpha.700'>
          <Text
            fontSize='10px'
            textTransform='lowercase'>
            {data?.repository.visibility}
          </Text>
        </Badge>
      </Flex>

      <Flex
        alignItems='center'
        gap='10px'>
        <StarButton
          id={data?.repository.id}
          viewerHasStarred={data?.repository.viewerHasStarred}
          stargazerCount={data?.repository.stargazerCount}
        />
      </Flex>
    </Flex>
  );
};
