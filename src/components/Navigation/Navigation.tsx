import { NavLink, useParams } from 'react-router-dom';
import { Flex, Button } from '@chakra-ui/react';
import { BiBookReader, BiBookBookmark } from 'react-icons/bi';
import { GoProjectRoadmap } from 'react-icons/go';
import { FiPackage, FiStar } from 'react-icons/fi';

export const Navigation = () => {
  const { userLogin } = useParams();

  const activeNavLinkStyle = (isActive: boolean) => {
    return {
      borderBottom: isActive ? '2px solid' : '2px solid transparent',
    };
  };

  return (
    <Flex
      w='full'
      margin='auto'
      maxW='1920px'
      padding='10px 50px 0'
      borderBottom='1px'
      borderColor='blackAlpha.300'
      backgroundColor='blackAlpha'>
      {/* <NavLink
        to='/home-page'
        style={({ isActive }) => activeNavLinkStyle(isActive)}>
        <Button
          marginBottom='10px'
          variant='ghost'>
          HomePage
        </Button>
      </NavLink> */}
      <NavLink
        to={`/user/${userLogin}/overview`}
        style={({ isActive }) => activeNavLinkStyle(isActive)}>
        <Button
          marginBottom='10px'
          variant='ghost'
          gap='10px'>
          <BiBookReader />
          Overview
        </Button>
      </NavLink>
      <NavLink
        to={`/user/${userLogin}/repositories`}
        style={({ isActive }) => activeNavLinkStyle(isActive)}>
        <Button
          marginBottom='10px'
          variant='ghost'
          gap='10px'>
          <BiBookBookmark />
          Repositories
        </Button>
      </NavLink>
      <NavLink
        to={`/user/${userLogin}/repositories`}
        style={({ isActive }) => activeNavLinkStyle(isActive)}>
        <Button
          marginBottom='10px'
          variant='ghost'
          gap='10px'>
          <GoProjectRoadmap />
          Projects
        </Button>
      </NavLink>
      <NavLink
        to={`/user/${userLogin}/repositories`}
        style={({ isActive }) => activeNavLinkStyle(isActive)}>
        <Button
          marginBottom='10px'
          variant='ghost'
          gap='10px'>
          <FiPackage />
          Packages
        </Button>
      </NavLink>
      <NavLink
        to={`/user/${userLogin}/repositories`}
        style={({ isActive }) => activeNavLinkStyle(isActive)}>
        <Button
          marginBottom='10px'
          variant='ghost'
          gap='10px'>
          <FiStar />
          Stars
        </Button>
      </NavLink>
    </Flex>
  );
};
