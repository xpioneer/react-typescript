import React, { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject
} from 'react-router-dom'
import useAntApp from 'components/message'
import Loading from '@components/loading'
import { routes } from './routeConf'
import { Progress } from '@/components/progress'

const Home = lazy(() => import(/* webpackChunkName:"home" */ '@pages/home/home'))
const Login = lazy(() => import(/* webpackChunkName:"login" */ '@pages/login'))
const Register = lazy(() => import( /* webpackChunkName:"register" */'@pages/register'))

const globalRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: '',
    element: <Home />,
    children: routes.map(item => {
      item.element = <Suspense fallback={<Progress />}>{item.element}</Suspense>
      return item
    }),
  }
]
export const Routes: React.FC = () => {
  const app = useAntApp() // just init
  const router = createBrowserRouter(globalRoutes)

  return <Suspense fallback={<Loading size="large"/>}>
    <RouterProvider router={router}/>
  </Suspense>
}
