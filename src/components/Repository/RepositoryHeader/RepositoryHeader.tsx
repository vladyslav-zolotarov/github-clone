import {
  Flex,
  Heading,
  Text,
  Badge,
  Avatar,
  Button,
  ButtonGroup,
  IconButton,
  Circle,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { IRepositoryInfo } from '../../../utils/types/types';
import { GET_REPOSITORY_INFO } from '../../../endpoints/endpoint';
import { useParams } from 'react-router-dom';
import { ImStarEmpty, ImStarFull } from 'react-icons/im';
import { RiArrowDownSLine } from 'react-icons/ri';

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

      <Flex alignItems='center'>
        <ButtonGroup
          isAttached
          variant='outline'
          size='sm'>
          <Button gap='10px'>
            {data?.repository.viewerHasStarred ? (
              <ImStarFull
                size='16px'
                color='#eac54f'
              />
            ) : (
              <ImStarEmpty size='16px' />
            )}
            <Text fontSize='sm'>
              {data?.repository.viewerHasStarred ? 'Stared' : 'Star'}
            </Text>
            <Circle
              size='21px'
              background='blackAlpha.100'
              color='black'>
              <Text fontSize='xs'>{data?.repository.stargazerCount}</Text>
            </Circle>
          </Button>
          <IconButton
            aria-label='Add to friends'
            icon={<RiArrowDownSLine />}
          />
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};
