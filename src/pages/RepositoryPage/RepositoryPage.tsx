import { Grid } from '@chakra-ui/react';
import {
  AdditionalInformation,
  FileFolderList,
  RepositoryHeader,
} from '../../components';

export const RepositoryPage = () => {
  return (
    <Grid
      gap='20px'
      w='full'
      templateColumns='1fr 260px'>
      <Grid gridArea='1 / span 2'>
        <RepositoryHeader />
      </Grid>
      <FileFolderList />
      <AdditionalInformation />
    </Grid>
  );
};
