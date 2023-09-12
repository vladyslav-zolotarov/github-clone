import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../../endpoints/endpoint';
import { IRepository } from '../../utils/types/types';
import {
  format,
  formatDistanceToNow,
  differenceInCalendarDays,
} from 'date-fns';
import {
  Card,
  CardHeader,
  CardBody,
  Circle,
  Text,
  Heading,
  Flex,
  Link,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '..';

export const RepositoryList = () => {
  const navigate = useNavigate();
  const { userLogin } = useParams();

  const { data, loading, error } = useQuery<IRepository>(GET_REPOSITORIES, {
    variables: { login: userLogin },
  });

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error - {error.message}</Text>;

  return (
    <Flex
      direction='column'
      rowGap='20px'>
      {data &&
        data.user.repositories.edges.map(repository => {
          return (
            <Card
              key={repository.node.id}
              size='sm'
              variant='outline'
              p='10px'>
              <CardHeader
                borderBottom='1px'
                borderColor='blackAlpha.100'>
                <Flex
                  alignItems='center'
                  gap='5px'>
                  <Link
                    onClick={() =>
                      navigate(`/${userLogin}/${repository.node.name}`, {
                        replace: true,
                      })
                    }>
                    <Heading size='md'>{repository.node.name}</Heading>
                  </Link>

                  <Badge visibility={repository.node.visibility} />
                </Flex>
                <Text fontSize='sm'>{repository.node.description}</Text>
              </CardHeader>
              <CardBody>
                <Flex
                  gap='15px'
                  mb='5px'>
                  {repository.node.languages.edges.map(language => {
                    return (
                      <Flex
                        gap='3px'
                        alignItems='center'
                        key={language.node.name}>
                        <Circle
                          size='10px'
                          bg={language.node.color}
                        />
                        <Text fontSize='sm'>{language.node.name}</Text>
                      </Flex>
                    );
                  })}
                </Flex>
                <Text fontSize='sm'>
                  Updated{' '}
                  {differenceInCalendarDays(
                    new Date(),
                    new Date(`${repository.node.pushedAt}`)
                  ) < 14 ? (
                    formatDistanceToNow(
                      new Date(`${repository.node.pushedAt}`),
                      {
                        includeSeconds: true,
                      }
                    )
                  ) : (
                    <Text as='span'>
                      on
                      <Text
                        ml='4px'
                        as='span'>
                        {format(
                          new Date(`${repository.node.pushedAt}`),
                          'dd MMM yyyy'
                        )}
                      </Text>
                    </Text>
                  )}
                </Text>
              </CardBody>
            </Card>
          );
        })}
      Repository
    </Flex>
  );
};
