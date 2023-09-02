
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Grid } from '@chakra-ui/react'
import { HomePage } from './pages/HomePage/HomePage'
import { Layout } from './layouts/Layout'
import { FollowersList, RepositoryList, User } from './components'


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
          path: 'user/:userLogin',
          element: <User />,
        },
        {
          path: 'user/:userLogin/repositories',
          element:
            <Grid gap="20px" w="full" templateColumns="minmax(0, 260px) 1fr">
              <User />
              <RepositoryList />
            </Grid>,
        },
        {
          path: 'user/:userLogin/followers',
          element:
            <Grid gap="20px" w="full" templateColumns="minmax(0, 260px) 1fr">
              <User />
              <FollowersList />
            </Grid>
          ,
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} fallbackElement={<h1>Loading...</h1>} />
  )
}

export default App
