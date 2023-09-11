import { Flex, Heading, Text, Badge, Avatar } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { IRepositoryInfo } from '../../../utils/types/types';
import { GET_REPOSITORY_INFO } from '../../../endpoints/endpoint';
import { useParams } from 'react-router-dom';

export const RepositoryHeader = () => {
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
      paddingBlock='15px'
      borderBottom='1px'
      borderColor='blackAlpha.300'>
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
    </Flex>
  );
};
