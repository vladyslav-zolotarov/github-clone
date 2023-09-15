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

interface RepositoryCardProps {
  id: string;
  name: string;
  description: string;
  languages: [
    {
      name: string;
      id: string;
      color: string;
    },
  ];

  visibility: string;
}

export const RepositoryCard = (props: RepositoryCardProps) => {
  const { id, name, description, languages, visibility } = props;

  return (
    <Card
      id={id}
      size='sm'
      variant='outline'
      p='15px'>
      <CardHeader p='5px'>
        <Flex
          gap='10px'
          alignItems='center'>
          <Link
            color='#0969da'
            onClick={
              () => console.log('terst')
              // navigate(`/${userLogin}/${repository.node.name}`, {
              //   replace: true,
              // })
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
        {languages.map(language => {
          return (
            <Flex
              key={language.id}
              alignItems='center'
              gap='4px'>
              <Circle
                size='10px'
                background={language.color}
              />
              <Text
                fontSize='12px'
                fontWeight='medium'
                color='blackAlpha.700'>
                {language.name}
              </Text>
            </Flex>
          );
        })}
      </CardFooter>
    </Card>
  );
};
