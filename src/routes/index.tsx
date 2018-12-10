import * as React from 'react'
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import NotFound  from '@components/notFound'
import Loading from '@components/loading'

const {lazy, Suspense} = React

const Dashboard = lazy(() => import( /* webpackChunkName:"dashboard" */ '@pages/dashboard/dashboard'))
const Chart = lazy(() => import( /* webpackChunkName:"charts" */ '@pages/charts'))
const LogApi = lazy(() => import( /* webpackChunkName:"logApi" */ '@pages/logs/api'))
const LogErrors = lazy(() => import( /* webpackChunkName:"logErrors" */ '@pages/logs/errors'))
const ArticleList = lazy(() => import( /* webpackChunkName:"articleList" */ '@pages/article/articleList'))
const ArticleEdit = lazy(() => import( /* webpackChunkName:"articleEdit" */ '@pages/article/articleEdit'))
const ArticleCreate = lazy(() => import( /* webpackChunkName:"articleCreate" */ '@pages/article/articleCreate'))
const ArticleTypeList = lazy(() => import( /* webpackChunkName:"articleTypeList" */ '@pages/articleType/articleTypeList'))

const Demo = lazy(() => import( /* webpackChunkName:"demo" */ '@pages/demo/demo'))


export const routes: RouteProps[] = [
  {
    path: '/home',
    exact: true,
    component: Dashboard
  },
  {
    path: '/home/charts',
    exact: true,
    component: Chart
  },
  {
    path: '/home/log-api',
    exact: true,
    component: LogApi
  },
  {
    path: '/home/log-errors',
    exact: true,
    component: LogErrors
  },
  {
    path: '/home/blog-article',
    exact: true,
    component: ArticleList
  },
  {
    path: '/home/blog-articleEdit/:id',
    exact: true,
    component: ArticleEdit
  },
  {
    path: '/home/blog-articleCreate',
    exact: true,
    component: ArticleCreate
  },
  {
    path: '/home/blog-type',
    exact: true,
    component: ArticleTypeList
  },
  {
    path: '/home/demos',
    exact: true,
    component: Demo
  },
  {
    path: '*',
    component: NotFound
  },
]

const Routes = (authorized: boolean) => <Suspense fallback={<Loading/>}>
  <Switch>
  {
    routes.map(r => {
      const {path, exact, component} = r
      const LazyCom = component
      return <Route key={path + ''} exact={exact} path={path} render={(props: any) => (authorized ? <LazyCom {...props}/> : <Redirect to="/login"/>)}/>
    })
  }
  </Switch>
</Suspense>

export default Routes