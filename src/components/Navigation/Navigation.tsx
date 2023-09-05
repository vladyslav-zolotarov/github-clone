import { NavLink, useParams } from 'react-router-dom';
import { Tabs, TabList, Tab } from '@chakra-ui/react';

export const Navigation = () => {
  const { userLogin } = useParams();

  return (
    <Tabs colorScheme='blackAlpha'>
      <TabList>
        <NavLink to='/home-page'>
          <Tab>HomePage</Tab>
        </NavLink>
        <NavLink to={`/user/${userLogin}/overview`}>
          <Tab>Overview</Tab>
        </NavLink>
        <NavLink to={`/user/${userLogin}/repositories`}>
          <Tab>Repositories</Tab>
        </NavLink>
      </TabList>
    </Tabs>
  );
};
