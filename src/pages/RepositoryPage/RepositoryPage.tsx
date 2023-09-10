import { Grid } from '@chakra-ui/react';
import { AdditionalInformation, FileFolderList } from '../../components';

export const RepositoryPage = () => {
  return (
    <Grid
      gap='20px'
      w='full'
      templateColumns='1fr minmax(0, 260px) '>
      <FileFolderList />
      <AdditionalInformation />
    </Grid>
  );
};
