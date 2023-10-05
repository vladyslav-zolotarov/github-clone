import { Flex, Text } from '@chakra-ui/react';
import { ImStarEmpty } from 'react-icons/im';
import { Link } from 'react-router-dom';

interface StarLinkProps {
  id: string;
  stargazerCount: number;
}

export const StarLink = ({ id, stargazerCount }: StarLinkProps) => {
  return (
    <Link to={`/stars/${id}`}>
      <Flex
        alignItems='center'
        color='blackAlpha.700'
        gap='5px'>
        <ImStarEmpty
          size='15px'
          color='#eac54f'
        />
        <Text
          fontSize='sm'
          fontWeight='medium'>
          {stargazerCount.toLocaleString('en-US')}
        </Text>
      </Flex>
    </Link>
  );
};
