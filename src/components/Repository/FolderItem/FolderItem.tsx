import { Flex, Text } from '@chakra-ui/react';
import { FcFolder } from 'react-icons/fc';
import { IRepositoryInfoTree } from '../../../utils/types/queryTypes';
import { memo } from 'react';

type FolderItemProps =
  IRepositoryInfoTree['repository']['object']['entries'][0];

export const FolderItem = memo(({ data }: { data: FolderItemProps }) => {
  return (
    <Flex
      alignItems='center'
      gap='10px'>
      <FcFolder />
      <Text>{data.name}</Text>
    </Flex>
  );
});
