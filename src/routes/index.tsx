import * as React from 'react'
import { Route, Switch } from 'react-router-dom';
import { RouteProps } from 'react-router-dom'
import Dashboard from '@pages/dashboard/dashboard'
import Chart from '@pages/charts'
import LogApi from '@pages/logs/api'
import LogErrors from '@pages/logs/errors'
import ArticleList from '@pages/article/articleList'
import ArticleEdit from '@pages/article/articleEdit'
import ArticleCreate from '@pages/article/articleCreate'
import NotFound from '@components/notFound'

import { Demo } from '@pages/demo/demo'


export const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: Dashboard
  },
  {
    path: '/charts',
    exact: true,
    component: Chart
  },
  {
    path: '/log-api',
    exact: true,
    component: LogApi
  },
  {
    path: '/log-errors',
    exact: true,
    component: LogErrors
  },
  {
    path: '/blog-article',
    exact: true,
    component: ArticleList
  },
  {
    path: '/blog-articleEdit/:id',
    exact: true,
    component: ArticleEdit
  },
  {
    path: '/blog-articleCreate',
    exact: true,
    component: ArticleCreate
  },
  {
    path: '/demos',
    exact: true,
    component: Demo
  },
  {
    path: '*',
    component: NotFound
  },
]

const Routes = () => <Switch>
{
  ...routes.map(r => <Route key={r.path + ''} exact={r.exact} path={r.path} component={r.component}/>)
}
</Switch>

export default Routes