import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RouteProps } from 'react-router-dom'
import NotFound  from '@components/notFound'

const {lazy, Suspense} = React

const Dashboard = lazy(() => import('@pages/dashboard/dashboard'))
const Chart = lazy(() => import('@pages/charts'))
const LogApi = lazy(() => import('@pages/logs/api'))
const LogErrors = lazy(() => import('@pages/logs/errors'))
const ArticleList = lazy(() => import('@pages/article/articleList'))
const ArticleEdit = lazy(() => import('@pages/article/articleEdit'))
const ArticleCreate = lazy(() => import('@pages/article/articleCreate'))
const Demo = lazy(() => import('@pages/demo/demo'))


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

console.log('Demo-----', Demo)

const Routes = <Suspense fallback={<div>loading...</div>}>
  <Switch>
  {
    ...routes.map(r => {
      const {path, exact, component} = r
      const LazyCom = component
      return <Route key={path + ''} exact={exact} path={path} render={(props: any) => <LazyCom {...props}/>}/>
    })
  }
    {/* <Route exact path="/" component={Dashboard}/>
    <Route exact path="/log-api" component={LogApi}/>
    <Route exact path="/demos" component={Demo}/>
    <Route path="*" component={NotFound}/> */}
  </Switch>
</Suspense>

export default Routes