import { User } from '../../components/User/User';
import { RepositoryList } from '../../components/RepositoryList/RepositoryList'
import { Grid } from '@chakra-ui/react'

export const HomePage = () => {
    return (
        <Grid gap="20px" w="full" templateColumns="1fr 2fr">
            <User />
            <RepositoryList />
        </Grid>
    );
};