import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CommitsPage, HomePage, RepositoryPage } from './pages/index';
import { AppLayout } from './layouts/AppLayout';
import { FollowersList } from './components';
import { Overview } from './templates/User';
import { UserLayout } from './layouts/UserLayout/UserLayout';
import { Grid } from '@chakra-ui/react';
import { FollowingList } from './templates/FollowingList/FollowingList';
import { RepositoryList } from './templates/RepositoryList/RepositoryList';
import { StarRepositoryList } from './templates/StarRepositoryList/StarRepositoryList';

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <AppLayout />,
      children: [
        {
          path: 'home-page',
          element: <HomePage />,
        },
        {
          path: 'user/:userLogin/overview',
          element: (
            <UserLayout>
              <Overview />
            </UserLayout>
          ),
        },
        {
          path: 'user/:userLogin/stars',
          element: (
            <UserLayout>
              <StarRepositoryList />
            </UserLayout>
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
          path: '/:userLogin/:repositoryName/commits',
          element: (
            <Grid
              gap='20px'
              w='full'>
              <CommitsPage />
            </Grid>
          ),
        },
        {
          path: 'user/:userLogin/repositories',
          element: (
            <UserLayout>
              <RepositoryList />
            </UserLayout>
          ),
        },
        {
          path: 'user/:userLogin/followers',
          element: (
            <UserLayout>
              <FollowersList />
            </UserLayout>
          ),
        },
        {
          path: 'user/:userLogin/following',
          element: (
            <UserLayout>
              <FollowingList />
            </UserLayout>
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
