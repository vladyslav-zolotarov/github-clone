import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { HeaderLayout } from './HeaderLayout/HeaderLayout';

export const AppLayout = () => {
  return (
    <Flex direction='column'>
      <HeaderLayout />
      <Flex
        w='full'
        maxW='1200px'
        gap='20px'
        m='20px auto'
        direction='column'>
        <Outlet />
      </Flex>
    </Flex>
  );
};
