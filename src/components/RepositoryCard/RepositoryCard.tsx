import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Flex,
  Circle,
  Link,
} from '@chakra-ui/react';
import { Badge } from '../../components/index';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import {
  format,
  formatDistanceToNow,
  differenceInCalendarDays,
} from 'date-fns';

interface RepositoryCardProps {
  id: string;
  name: string;
  description: string;
  languages: {
    edges: [
      {
        node: {
          name: string;
          color: string;
          id: string;
        };
      },
    ];
  };

  visibility: string;

  icon?: boolean;
  pushedAt?: string;
}

export const RepositoryCard = (props: RepositoryCardProps) => {
  const { id, name, description, languages, visibility, icon, pushedAt } =
    props;
  const navigate = useNavigate();
  const { userLogin } = useParams();

  const dateContent = () => {
    return (
      <Text
        fontSize='12px'
        fontWeight='medium'
        color='blackAlpha.700'>
        Updated
        {differenceInCalendarDays(new Date(), new Date(`${pushedAt}`)) < 14 ? (
          formatDistanceToNow(new Date(`${pushedAt}`), {
            includeSeconds: true,
          })
        ) : (
          <Text as='span'>
            on
            <Text
              ml='4px'
              as='span'>
              {format(new Date(`${pushedAt}`), 'dd MMM yyyy')}
            </Text>
          </Text>
        )}
      </Text>
    );
  };

  return (
    <Card
      id={id}
      size='sm'
      variant='outline'
      p='15px'>
      <CardHeader p='5px'>
        <Flex
          gap='5px'
          alignItems='center'>
          {icon && <RiGitRepositoryLine color='#858585' />}
          <Link
            color='#0969da'
            onClick={() =>
              navigate(`/${userLogin}/${name}`, {
                replace: true,
              })
            }>
            <Heading
              as='h3'
              size='sm'>
              {name}
            </Heading>
          </Link>
          <Badge visibility={visibility} />
        </Flex>
      </CardHeader>
      <CardBody p='5px'>
        <Text
          fontSize='12px'
          fontWeight='medium'
          color='blackAlpha.700'>
          {description}
        </Text>
      </CardBody>
      <CardFooter p='5px'>
        <Flex
          gap='10px'
          alignItems='center'>
          {languages.edges.map(item => {
            const currentItem = item.node;
            return (
              <Flex
                key={currentItem.id}
                alignItems='center'
                gap='4px'>
                <Circle
                  size='10px'
                  background={currentItem.color}
                />
                <Text
                  fontSize='12px'
                  fontWeight='medium'
                  color='blackAlpha.700'>
                  {currentItem.name}
                </Text>
              </Flex>
            );
          })}

          {pushedAt && dateContent()}
        </Flex>
      </CardFooter>
    </Card>
  );
};
