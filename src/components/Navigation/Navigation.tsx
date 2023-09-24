import { NavLink, useParams } from 'react-router-dom';
import { Flex, Button, Circle, Text } from '@chakra-ui/react';
import { BiBookReader, BiBookBookmark } from 'react-icons/bi';
import { GoProjectRoadmap } from 'react-icons/go';
import { FiPackage, FiStar } from 'react-icons/fi';
import { IUserInfoForNavigation } from '../../utils/types/types';

type IUserInfoForNavigationState = Pick<IUserInfoForNavigation, 'user'>;

export const Navigation = ({ user }: IUserInfoForNavigationState) => {
  const { userLogin } = useParams();

  const activeNavLinkStyle = (isActive: boolean) => {
    return {
      borderBottom: isActive ? '2px solid' : '2px solid transparent',
    };
  };

  return (
    <Flex>
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
          {user.repositories.totalCount ? (
            <Circle
              size='23px'
              bg='blackAlpha.200'>
              <Text
                fontSize='xs'
                fontWeight='semibold'>
                {user.repositories.totalCount - 1}
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
          {user.projects.totalCount ? (
            <Circle
              size='23px'
              bg='blackAlpha.200'>
              <Text
                fontSize='xs'
                fontWeight='semibold'>
                {user.projects.totalCount}
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
          {user.packages.totalCount ? (
            <Circle
              size='23px'
              bg='blackAlpha.200'>
              <Text
                fontSize='xs'
                fontWeight='semibold'>
                {user.packages.totalCount}
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
          {user.starredRepositories.totalCount ? (
            <Circle
              size='23px'
              bg='blackAlpha.200'>
              <Text
                fontSize='xs'
                fontWeight='semibold'>
                {user.starredRepositories.totalCount - 1}
              </Text>
            </Circle>
          ) : null}
        </Button>
      </NavLink>
    </Flex>
  );
};
