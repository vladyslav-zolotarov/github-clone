import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';

export const Layout = () => {
  return (
    <Flex direction='column'>
      <Header />
      <Flex
        w='full'
        maxW='1200px'
        gap='20px'
        m='50px auto'
        direction='column'>
        <Outlet />
      </Flex>
    </Flex>
  );
};
