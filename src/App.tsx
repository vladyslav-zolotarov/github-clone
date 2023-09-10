import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Grid } from '@chakra-ui/react';
import { HomePage, RepositoryPage } from './pages/index';
import { Layout } from './layouts/Layout';
import { User } from './components';
import { Followers, Following, Overview, Repositories } from './templates/user';

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
              templateColumns='minmax(0, 260px) 1fr'>
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
              templateColumns='minmax(0, 260px) 1fr'>
              <User />
              <Repositories />
            </Grid>
          ),
        },
        {
          path: 'user/:userLogin/followers',
          element: (
            <Grid
              gap='20px'
              w='full'
              templateColumns='minmax(0, 260px) 1fr'>
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
              templateColumns='minmax(0, 260px) 1fr'>
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
