import { NavLink, useParams } from 'react-router-dom';
import { Flex, Button, Circle, Text } from '@chakra-ui/react';
import { BiBookReader, BiBookBookmark } from 'react-icons/bi';
import { GoProjectRoadmap } from 'react-icons/go';
import { FiPackage, FiStar } from 'react-icons/fi';
import { useQuery } from '@apollo/client';
import { GET_USER_INFO_FOR_NAVIGATION } from '../../endpoints/queries';
import { IUserInfoForNavigation } from '../../utils/types/types';

export const Navigation = () => {
  const { userLogin } = useParams();

  const { data } = useQuery<IUserInfoForNavigation>(
    GET_USER_INFO_FOR_NAVIGATION,
    {
      variables: { login: userLogin },
    }
  );

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
          {data?.user.repositories.totalCount ? (
            <Circle
              size='23px'
              bg='blackAlpha.200'>
              <Text
                fontSize='xs'
                fontWeight='semibold'>
                {data?.user.repositories.totalCount - 1}
              </Text>
            </Circle>
          ) : null}
        </Button>
      </NavLink>
      <NavLink
        to={`/user/${userLogin}/projects`}
        style={({ isActive }) => activeNavLinkStyle(isActive)}>
        <Button
          marginBottom='10px'
          variant='ghost'
          gap='10px'>
          <GoProjectRoadmap />
          Projects
          {data?.user.projects.totalCount ? (
            <Circle
              size='23px'
              bg='blackAlpha.200'>
              <Text
                fontSize='xs'
                fontWeight='semibold'>
                {data?.user.projects.totalCount}
              </Text>
            </Circle>
          ) : null}
        </Button>
      </NavLink>
      <NavLink
        to={`/user/${userLogin}/packages`}
        style={({ isActive }) => activeNavLinkStyle(isActive)}>
        <Button
          marginBottom='10px'
          variant='ghost'
          gap='10px'>
          <FiPackage />
          Packages
          {data?.user.packages.totalCount ? (
            <Circle
              size='23px'
              bg='blackAlpha.200'>
              <Text
                fontSize='xs'
                fontWeight='semibold'>
                {data?.user.packages.totalCount}
              </Text>
            </Circle>
          ) : null}
        </Button>
      </NavLink>
      <NavLink
        to={`/user/${userLogin}/stars`}
        style={({ isActive }) => activeNavLinkStyle(isActive)}>
        <Button
          marginBottom='10px'
          variant='ghost'
          gap='10px'>
          <FiStar />
          Stars
          {data?.user.starredRepositories.totalCount ? (
            <Circle
              size='23px'
              bg='blackAlpha.200'>
              <Text
                fontSize='xs'
                fontWeight='semibold'>
                {data?.user.starredRepositories.totalCount - 1}
              </Text>
            </Circle>
          ) : null}
        </Button>
      </NavLink>
    </Flex>
  );
};
