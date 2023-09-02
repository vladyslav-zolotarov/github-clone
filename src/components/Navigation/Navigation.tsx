import { NavLink } from 'react-router-dom'
import { Tabs, TabList, Tab } from '@chakra-ui/react'


export const Navigation = () => {
    const USER_LOGIN = 'vladyslav-zolotarov';

    return (
        <Tabs colorScheme='blackAlpha'>
            <TabList>
                <NavLink to='/home-page'>
                    <Tab>
                        HomePage
                    </Tab>
                </NavLink>
                {/* <NavLink to={`/user/${USER_LOGIN}`}>
                    <Tab>
                        User
                    </Tab>
                </NavLink> */}
                <NavLink to={`/user/${USER_LOGIN}/repositories`}>
                    <Tab>
                        Repositories
                    </Tab>
                </NavLink>
            </TabList>
        </Tabs>
    );
};