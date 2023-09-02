import { Flex } from '@chakra-ui/react'
import { Outlet } from "react-router-dom";
import { Navigation } from '../components';

export const Layout = () => {

    return (
        <Flex maxW="1200px" gap='20px' m="50px auto" direction='column'>
            <Navigation />
            <Outlet />
        </Flex>
    );
}