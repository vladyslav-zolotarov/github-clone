import { Text, Flex } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { IRepositoryInfoTree } from '../../../utils/types/queryTypes';
import 'github-markdown-css';
import { memo } from 'react';

type ReadMeProps = IRepositoryInfoTree['repository']['object']['entries'][0];

export const ReadMe = memo(({ data }: { data: ReadMeProps }) => {
  if (data.name !== 'README.md') {
    return;
  }

  return (
    <Flex
      w='full'
      padding='20px'
      rounded='md'
      direction='column'
      className='markdown-body'>
      <Text
        as='span'
        margin='0'
        fontWeight='medium'>
        {data.name}
      </Text>
      <ReactMarkdown className='markdown'>{data.object.text}</ReactMarkdown>
    </Flex>
  );
});
