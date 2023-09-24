import { Button, Flex, Text } from '@chakra-ui/react';
import { IUserInfoForNavigation } from '../../utils/types/types';
import { NavLink } from 'react-router-dom';

type IUserInfoForNavigationState = Pick<IUserInfoForNavigation, 'user'>;

export const HeaderTopBelt = ({ user }: IUserInfoForNavigationState) => {
  return (
    <Flex>
      <NavLink to={`/user/${user.login}/overview`}>
        <Button
          marginBottom='10px'
          variant='ghost'>
          <Text
            fontSize='md'
            fontWeight='semibold'>
            {user.login}
          </Text>
        </Button>
      </NavLink>
    </Flex>
  );
};
