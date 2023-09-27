import { Button, Flex, Text } from '@chakra-ui/react';
import { NavLink, useParams } from 'react-router-dom';

export const HeaderTopBelt = () => {
  const { userLogin } = useParams();

  return (
    <Flex>
      <NavLink to={`/user/${userLogin}/overview`}>
        <Button
          marginBottom='10px'
          variant='ghost'>
          <Text
            fontSize='md'
            fontWeight='semibold'>
            {userLogin}
          </Text>
        </Button>
      </NavLink>
    </Flex>
  );
};
