import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Grid } from '@chakra-ui/react';
import { HomePage, RepositoryPage } from './pages/index';
import { Layout } from './layouts/Layout';
import { User, RepositoryList } from './components';
import { Followers, Following, Overview } from './templates/User';

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        {
          path: 'home-page',
          element: <HomePage />,
        },
        {
          path: 'user/:userLogin/overview',
          element: (
            <Grid
              gap='20px'
              w='full'
              templateColumns='260px 1fr'>
              <User />
              <Overview />
            </Grid>
          ),
        },
        {
          path: '/:userLogin/:repositoryName',
          element: (
            <Grid
              gap='20px'
              w='full'>
              <RepositoryPage />
            </Grid>
          ),
        },
        {
          path: 'user/:userLogin/repositories',
          element: (
            <Grid
              gap='20px'
              w='full'
              templateColumns='260px 1fr'>
              <User />
              <RepositoryList />
            </Grid>
          ),
        },
        {
          path: 'user/:userLogin/followers',
          element: (
            <Grid
              gap='20px'
              w='full'
              templateColumns='260px 1fr'>
              <User />
              <Followers />
            </Grid>
          ),
        },
        {
          path: 'user/:userLogin/following',
          element: (
            <Grid
              gap='20px'
              w='full'
              templateColumns='260px 1fr'>
              <User />
              <Following />
            </Grid>
          ),
        },
      ],
    },
  ]);

  return (
    <RouterProvider
      router={router}
      fallbackElement={<h1>Loading...</h1>}
    />
  );
}

export default App;
