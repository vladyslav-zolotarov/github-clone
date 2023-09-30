import {
  AdditionalInformation,
  FileFolderList,
} from '../../templates/Repository';
import { Grid, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { IRepositoryInfo } from '../../utils/types/queryTypes';
import { GET_REPOSITORY_INFO } from '../../endpoints/queries';
import { RepositoryHeader } from '../../templates/Repository';

export const RepositoryPage = () => {
  const { userLogin, repositoryName } = useParams();

  const { data, error, loading } = useQuery<IRepositoryInfo>(
    GET_REPOSITORY_INFO,
    {
      variables: { name: repositoryName, owner: userLogin },
    }
  );

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error ...</Text>;

  return (
    <Grid
      gap='20px'
      w='full'
      templateColumns='1fr 260px'>
      <Grid gridArea='1 / span 2'>
        {data && <RepositoryHeader data={data} />}
      </Grid>

      <FileFolderList />
      {data && <AdditionalInformation data={data} />}
    </Grid>
  );
};
