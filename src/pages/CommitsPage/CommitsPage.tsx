import { Flex } from '@chakra-ui/react';
import { CommitList } from '../../templates/Repository/CommitList/CommitList';

export const CommitsPage = () => {
  return (
    <Flex direction='column'>
      <Flex>header Commit Page</Flex>
      <CommitList />
    </Flex>
  );
};
