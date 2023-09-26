import { Grid } from '@chakra-ui/react';
import { User } from '../../components';

interface UserLayoutProps extends React.ComponentPropsWithoutRef<'div'> {}

export const UserLayout = (props: UserLayoutProps) => {
  const { children } = props;

  return (
    <Grid
      gap='20px'
      w='full'
      templateColumns='260px 1fr'>
      <User />
      {children}
    </Grid>
  );
};
