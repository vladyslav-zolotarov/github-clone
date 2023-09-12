import { Flex, Heading, Text, Circle } from '@chakra-ui/react';
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

  const LANGUAGE_TOTAL_SIZE = data?.repository.languages.totalSize;

  return (
    <Flex
      direction='column'
      gap='20px'>
      <Flex
        direction='column'
        gap='20px'
        paddingBottom='20px'
        borderBottom='1px solid'
        borderColor='blackAlpha.100'>
        <Heading size='sm'>About</Heading>
        <Text
          fontWeight='medium'
          fontSize='sm'>
          {data?.repository.description}
        </Text>
      </Flex>

      <Flex
        direction='column'
        gap='20px'
        paddingBottom='20px'
        borderBottom='1px solid'
        borderColor='blackAlpha.100'>
        <Heading size='sm'>Languages</Heading>

        <Flex
          gap='10px'
          flexWrap='wrap'>
          <Flex
            backgroundColor='blackAlpha.300'
            height='7px'
            width='100%'
            rounded='md'
            overflow='hidden'>
            {data?.repository.languages.edges.map(item => {
              return (
                <Flex
                  key={item.node.name}
                  backgroundColor={item.node.color}
                  height='7px'
                  zIndex={1}
                  width={`${
                    LANGUAGE_TOTAL_SIZE &&
                    ((item.size * 100) / LANGUAGE_TOTAL_SIZE).toFixed(1)
                  }%`}
                />
              );
            })}
          </Flex>
          {data?.repository.languages.edges.map(item => {
            return (
              <Flex
                gap='5px'
                alignItems='center'
                key={item.node.id}>
                <Circle
                  size='10px'
                  bg={item.node.color}
                />
                <Text
                  fontWeight='bold'
                  fontSize='xs'>
                  {item.node.name}
                </Text>
                <Text
                  fontWeight='bold'
                  fontSize='xs'
                  color='blackAlpha.600'>
                  {LANGUAGE_TOTAL_SIZE &&
                    ((item.size * 100) / LANGUAGE_TOTAL_SIZE).toFixed(1)}
                  %
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};
