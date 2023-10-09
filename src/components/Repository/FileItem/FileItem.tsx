import { Flex, Text } from '@chakra-ui/react';
import { FcFile } from 'react-icons/fc';
import { IRepositoryInfoTree } from '../../../utils/types/queryTypes';
import { memo } from 'react';

type FileItemProps = IRepositoryInfoTree['repository']['object']['entries'][0];

export const FileItem = memo(({ data }: { data: FileItemProps }) => {
  return (
    <Flex
      alignItems='center'
      gap='10px'>
      <FcFile />
      <Text>{data.name}</Text>
    </Flex>
  );
});
