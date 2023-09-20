import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import { useQuery } from '@apollo/client';
import { GET_VIEWER } from '../endpoints/queries';

export const Layout = () => {
  const { data, error, loading } = useQuery(GET_VIEWER);

  console.log('GET_VIEWER', data, error, loading);

  return (
    <Flex direction='column'>
      <Header />
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
