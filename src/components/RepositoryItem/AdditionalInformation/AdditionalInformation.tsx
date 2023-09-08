import { Flex, Heading, Text } from '@chakra-ui/react';
import { IRepositoryInfoTree } from '../../../utils/types/types';

type AdditionalInformationProps = IRepositoryInfoTree['repository'];

export const AdditionalInformation = ({
  data,
}: {
  data: AdditionalInformationProps;
}) => {
  return (
    <Flex
      direction='column'
      gap='20px'>
      <Heading size='sm'>About</Heading>
      <Text>{data.description}</Text>
    </Flex>
  );
};
