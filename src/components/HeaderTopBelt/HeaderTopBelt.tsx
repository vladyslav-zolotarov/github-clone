import { Button, Flex, Text } from '@chakra-ui/react';
import { NavLink, useParams } from 'react-router-dom';

export const HeaderTopBelt = () => {
  const { userLogin, repositoryName } = useParams();

  return (
    <Flex
      alignItems='center'
      marginBottom='10px'>
      <NavLink to={`/user/${userLogin}/overview`}>
        <Button
          size='sm'
          variant='ghost'>
          <Text
            fontSize='sm'
            fontWeight='semibold'>
            {userLogin}
          </Text>
        </Button>
      </NavLink>

      {repositoryName ? (
        <>
          <Text>/</Text>
          <Button
            size='sm'
            variant='ghost'>
            <Text
              fontSize='sm'
              fontWeight='bold'>
              {repositoryName}
            </Text>
          </Button>
        </>
      ) : null}
    </Flex>
  );
};
