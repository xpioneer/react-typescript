import * as React from 'react'
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom'
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
const ArticleTypeEdit = lazy(() => import( /* webpackChunkName:"articleTypeEdit" */ '@pages/articleType/articleTypeEdit'))
const ArticleTypeCreate = lazy(() => import( /* webpackChunkName:"articleTypeCreate" */ '@pages/articleType/articleTypeCreate'))
const TagList = lazy(() => import( /* webpackChunkName:"tagList" */ '@pages/tag/tagList'))
const TagEdit = lazy(() => import( /* webpackChunkName:"tagEdit" */ '@pages/tag/tagEdit'))
const TagCreate = lazy(() => import( /* webpackChunkName:"tagCreate" */ '@pages/tag/tagCreate'))
const CommentList = lazy(() => import( /* webpackChunkName:"commentList" */ '@pages/comment/commentList'))
const CommentEdit = lazy(() => import( /* webpackChunkName:"commentEdit" */ '@pages/comment/commentEdit'))
const LeaveMsgList = lazy(() => import( /* webpackChunkName:"leaveMsgList" */ '@pages/leaveMsg/leaveMsgList'))
const LeaveMsgEdit = lazy(() => import( /* webpackChunkName:"leaveMsgEdit" */ '@pages/leaveMsg/leaveMsgEdit'))
const UserList = lazy(() => import( /* webpackChunkName:"userList" */ '@pages/user/userList'))
const UserEdit = lazy(() => import( /* webpackChunkName:"userEdit" */ '@pages/user/userEdit'))
const UserCreate = lazy(() => import( /* webpackChunkName:"userCreate" */ '@pages/user/userCreate'))
const BallList = lazy(() => import( /* webpackChunkName:"ballList" */ '@pages/lottery/ballList'))
const BallCreate = lazy(() => import( /* webpackChunkName:"ballCreate" */ '@pages/lottery/ballCreate'))
const BallEdit = lazy(() => import( /* webpackChunkName:"ballEdit" */ '@pages/lottery/ballEdit'))
const BallTrend = lazy(() => import( /* webpackChunkName:"ballTrend" */ '@pages/lottery/ballTrend'))
const BallChart = lazy(() => import( /* webpackChunkName:"ballChart" */ '@pages/lottery/ballChart'))
const StockList = lazy(() => import( /* webpackChunkName:"StockList" */ '@pages/stocks'))
const StockHistories = lazy(() => import( /* webpackChunkName:"StockList" */ '@pages/stocks/history'))

// demos
const Demo = lazy(() => import( /* webpackChunkName:"demo" */ '@pages/demo/demo'))
const DemoMobx = lazy(() => import( /* webpackChunkName:"demo" */ '@pages/demo/demoMobx'))
const DemoRedux = lazy(() => import( /* webpackChunkName:"demo" */ '@pages/demo/demoRedux'))
const DemoHooks = lazy(() => import( /* webpackChunkName:"demo" */ '@pages/demo/demoHooks'))


export const routes: RouteProps[] = [
  {
    path: '/home',
    component: Dashboard
  },
  {
    path: '/home/charts',
    component: Chart
  },
  {
    path: '/home/log-api',
    component: LogApi
  },
  {
    path: '/home/log-errors',
    component: LogErrors
  },
  {
    path: '/home/blog-article',
    component: ArticleList
  },
  {
    path: '/home/blog-article/:id',
    component: ArticleEdit
  },
  {
    path: '/home/blog-articleCreate',
    component: ArticleCreate
  },
  {
    path: '/home/blog-type',
    component: ArticleTypeList
  },
  {
    path: '/home/blog-type/:id',
    component: ArticleTypeEdit
  },
  {
    path: '/home/blog-typeCreate',
    component: ArticleTypeCreate
  },
  {
    path: '/home/blog-tag',
    component: TagList
  },
  {
    path: '/home/blog-tagCreate',
    component: TagCreate
  },
  {
    path: '/home/blog-tag/:id',
    component: TagEdit
  },
  {
    path: '/home/blog-comment',
    component: CommentList
  },
  {
    path: '/home/blog-comment/:id',
    component: CommentEdit
  },
  {
    path: '/home/blog-message',
    component: LeaveMsgList
  },
  {
    path: '/home/blog-message/:id',
    component: LeaveMsgEdit
  },
  {
    path: '/home/blog-user',
    component: UserList
  },
  {
    path: '/home/blog-user/:id',
    component: UserEdit
  },
  {
    path: '/home/blog-userCreate',
    component: UserCreate
  },
  {
    path: '/home/lottery-balls',
    component: BallList
  },
  {
    path: '/home/lottery-ball',
    component: BallCreate
  },
  {
    path: '/home/lottery-ball/:id',
    component: BallEdit
  },
  {
    path: '/home/lottery-trend',
    component: BallTrend
  },
  {
    path: '/home/lottery-chart',
    component: BallChart
  },
  {
    path: '/home/demos',
    component: Demo
  },
  {
    path: '/home/demo-mobx',
    component: DemoMobx
  },
  {
    path: '/home/demo-redux',
    component: DemoRedux
  },
  {
    path: '/home/demo-hooks',
    component: DemoHooks
  },
  {
    path: '/home/stocks',
    component: StockList
  },
  {
    path: '/home/stocks-history',
    component: StockHistories
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
        return <Route key={path + ''} exact={exact !== false} path={path} render={(props: any) => (authorized ? <LazyCom {...props}/> : <Redirect to="/login"/>)}/>
      })
    }
  </Switch>
</Suspense>

export default Routes