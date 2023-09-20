import { Text } from '@chakra-ui/react';
import { AUTH_CLIENT_ID } from '../../utils/token';

export const HomePage = () => {
  return (
    <>
      <Text>HomePage</Text>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${AUTH_CLIENT_ID}`}>
        Login with GitHub
      </a>
    </>
  );
};
