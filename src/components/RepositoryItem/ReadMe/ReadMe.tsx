import { Text, Flex } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { IRepositoryInfo } from '../../../utils/types/types';
import 'github-markdown-css';

type ReadMeProps = IRepositoryInfo['repository']['object']['entries'][0];

export const ReadMe = ({ data }: { data: ReadMeProps }) => {
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
};
