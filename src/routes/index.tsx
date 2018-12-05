import * as React from 'react'
import { Route, Switch } from 'react-router-dom';
import { RouteProps } from 'react-router-dom'
import NotFound  from '@components/notFound'

const {lazy, Suspense} = React

const Dashboard = lazy(() => import( /* webpackChunkName:"dashboard" */ '@pages/dashboard/dashboard'))
const Chart = lazy(() => import( /* webpackChunkName:"charts" */ '@pages/charts'))
const LogApi = lazy(() => import( /* webpackChunkName:"logApi" */ '@pages/logs/api'))
const LogErrors = lazy(() => import( /* webpackChunkName:"logErrors" */ '@pages/logs/errors'))
const ArticleList = lazy(() => import( /* webpackChunkName:"articleList" */ '@pages/article/articleList'))
const ArticleEdit = lazy(() => import( /* webpackChunkName:"articleEdit" */ '@pages/article/articleEdit'))
const ArticleCreate = lazy(() => import( /* webpackChunkName:"articleCreate" */ '@pages/article/articleCreate'))
const Demo = lazy(() => import( /* webpackChunkName:"demo" */ '@pages/demo/demo'))

interface IRouteProps extends RouteProps{
  auth?: boolean
}

export const routes: IRouteProps[] = [
  {
    path: '/home',
    exact: true,
    auth: true,
    component: Dashboard
  },
  {
    path: '/home/charts',
    exact: true,
    auth: true,
    component: Chart
  },
  {
    path: '/home/log-api',
    exact: true,
    auth: true,
    component: LogApi
  },
  {
    path: '/home/log-errors',
    exact: true,
    auth: true,
    component: LogErrors
  },
  {
    path: '/home/blog-article',
    exact: true,
    auth: true,
    component: ArticleList
  },
  {
    path: '/home/blog-articleEdit/:id',
    exact: true,
    auth: true,
    component: ArticleEdit
  },
  {
    path: '/home/blog-articleCreate',
    exact: true,
    auth: true,
    component: ArticleCreate
  },
  {
    path: '/home/demos',
    exact: true,
    auth: true,
    component: Demo
  },
  {
    path: '*',
    component: NotFound
  },
]

const Routes = <Suspense fallback={<div>loading...</div>}>
  <Switch>
  {
    routes.map(r => {
      const {path, exact, component} = r
      const LazyCom = component
      return <Route key={path + ''} exact={exact} path={path} render={(props: any) => <LazyCom {...props}/>}/>
    })
  }
  </Switch>
</Suspense>

export default Routes