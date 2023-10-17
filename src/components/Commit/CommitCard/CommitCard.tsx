import { Card, CardBody, Flex, Heading, Text } from '@chakra-ui/react';
import { IRepositoryCommitList } from '../../../utils/types/queryTypes';
import { UserAvatar } from '../..';
import {
  differenceInCalendarDays,
  format,
  formatDistanceToNow,
} from 'date-fns';

type CommitCardProps =
  IRepositoryCommitList['repository']['object']['history']['edges'][0];

export const CommitCard = (props: CommitCardProps) => {
  const { node } = props;

  console.log({ node });

  return (
    <Card
      size='sm'
      variant='outline'>
      <CardBody>
        <Heading
          as='h3'
          size='sm'
          marginBottom='5px'>
          {node.messageHeadline}
          {node.messageBody}
        </Heading>
        {node.author ? (
          <Flex
            gap='10px'
            alignItems='center'>
            <UserAvatar
              height='20px'
              width='20px'
              name={node.author.name}
              src={node.author.avatarUrl}
            />
            <Text
              fontWeight='medium'
              fontSize='sm'>
              {node.author.name}
            </Text>

            <Text
              color='blackAlpha.700'
              fontWeight='medium'
              fontSize='sm'>
              <Text
                as='span'
                mr='5px'>
                commited
              </Text>
              {differenceInCalendarDays(
                new Date(),
                new Date(`${node.authoredDate}`)
              ) < 14 ? (
                <>
                  {formatDistanceToNow(new Date(`${node.authoredDate}`), {
                    includeSeconds: true,
                  })}
                  <Text
                    ml='4px'
                    as='span'>
                    ago
                  </Text>
                </>
              ) : (
                <Text as='span'>
                  on
                  <Text
                    ml='4px'
                    as='span'>
                    {format(new Date(`${node.authoredDate}`), 'dd MMM yyyy')}
                  </Text>
                </Text>
              )}
            </Text>
          </Flex>
        ) : null}
      </CardBody>
    </Card>
  );
};
