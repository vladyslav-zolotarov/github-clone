import { Flex, Text } from '@chakra-ui/react';
import { ImStarEmpty } from 'react-icons/im';
import { Link } from 'react-router-dom';

interface StarLinkProps {
  id: string;
  viewerHasStarred: boolean;
  stargazerCount: number;
}

export const StarLink = ({
  id,
  viewerHasStarred,
  stargazerCount,
}: StarLinkProps) => {
  return (
    <Link to={`/stars/${id}`}>
      <Flex
        alignItems='center'
        color='blackAlpha.700'
        gap='5px'>
        {viewerHasStarred ? (
          <ImStarEmpty
            size='15px'
            color='#eac54f'
          />
        ) : null}
        <Text
          fontSize='sm'
          fontWeight='medium'>
          {stargazerCount.toLocaleString('en-US')}
        </Text>
      </Flex>
    </Link>
  );
};
