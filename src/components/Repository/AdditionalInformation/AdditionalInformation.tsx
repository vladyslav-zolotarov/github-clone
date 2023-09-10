import { Flex, Heading, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { IRepositoryInfo } from '../../../utils/types/types';
import { GET_REPOSITORY_INFO } from '../../../endpoints/endpoint';
import { useParams } from 'react-router-dom';

export const AdditionalInformation = () => {
  const { userLogin, repositoryName } = useParams();

  const { data, error, loading } = useQuery<IRepositoryInfo>(
    GET_REPOSITORY_INFO,
    {
      variables: { name: repositoryName, owner: userLogin },
    }
  );

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error ...</Text>;

  return (
    <Flex
      direction='column'
      gap='20px'>
      <Heading size='sm'>About</Heading>
      <Text>{data?.repository.description}</Text>
    </Flex>
  );
};
