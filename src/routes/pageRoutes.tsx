import * as React from 'react'
import { RouteProps } from 'react-router-dom'
import { NotFound }  from '@components/notFound'
import {
  AreaChartOutlined, BarChartOutlined, BulbOutlined, DollarOutlined, ExperimentOutlined, FileSearchOutlined,
  BookOutlined, FormOutlined, FrownOutlined, FundOutlined, HomeOutlined, MehOutlined, SmileOutlined, StockOutlined
} from '@ant-design/icons'

const {lazy} = React

const Dashboard = lazy(() => import( /* webpackChunkName:"dashboard" */ '@pages/dashboard/dashboard'))
const Chart = lazy(() => import( /* webpackChunkName:"charts" */ '@pages/charts'))
const LogApi = lazy(() => import( /* webpackChunkName:"logApi" */ '@pages/logs/apiNew'))
const LogErrors = lazy(() => import( /* webpackChunkName:"logErrors" */ '@pages/logs/errorsNew'))
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
const StockDetail = lazy(() => import( /* webpackChunkName:"StockDetail" */ '@pages/stocks/detail'))
const StockHistories = lazy(() => import( /* webpackChunkName:"StockList" */ '@pages/stocks/history'))
const StockHistoriesDetail = lazy(() => import( /* webpackChunkName:"StockList" */ '@pages/stocks/historyDetail'))

// demos
const Demo = lazy(() => import( /* webpackChunkName:"demo" */ '@pages/demo/demoNew'))
const DemoMobx = lazy(() => import( /* webpackChunkName:"demo" */ '@pages/demo/demoMobx'))
const DemoRedux = lazy(() => import( /* webpackChunkName:"demo" */ '@pages/demo/demoRedux'))

export interface XRouteProps extends RouteProps {
  title?: string
  icon?: React.ReactNode
  meta?: {
    title: string;
  }
  subRoute?: XRouteProps[]
}

/**
 * 子级页面路由的path请保持与父级path有相同的Menu前缀，确保菜单选中
 */
const routesConf: Partial<XRouteProps>[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <HomeOutlined/>,
    component: Dashboard,
  },
  {
    title: 'Charts',
    path: '/charts',
    icon: <AreaChartOutlined/>,
    component: Chart
  },
  {
    title: 'Log',
    icon: <FileSearchOutlined/>,
    path: '/log',
    subRoute: [
      {
        title: 'API',
        path: '/api',
        icon: <MehOutlined/>,
        component: LogApi
      },
      {
        title: 'Errors',
        path: '/errors',
        icon: <FrownOutlined/>,
        component: LogErrors
      },
    ]
  },
  {
    title: 'Blog',
    icon: <BookOutlined/>,
    path: '/blog',
    subRoute: [
      {
        title: 'Essay',
        path: '/article',
        icon: <FormOutlined/>,
        component: ArticleList
      },
      {
        path: '/article/create',
        component: ArticleCreate
      },
      {
        path: '/article/detail/:id',
        component: ArticleEdit
      },
      {
        title: 'Type',
        path: '/type',
        icon: <FormOutlined/>,
        component: ArticleTypeList
      },
      {
        path: '/type/create',
        component: ArticleTypeCreate
      },
      {
        path: '/type/detail/:id',
        component: ArticleTypeEdit
      },
      {
        title: 'Tag',
        path: '/tag',
        icon: <FormOutlined/>,
        component: TagList
      },
      {
        path: '/tag/create',
        component: TagCreate
      },
      {
        path: '/tag/detail/:id',
        component: TagEdit
      },
      {
        title: 'Comment',
        path: '/comment',
        icon: <FormOutlined/>,
        component: CommentList
      },
      {
        path: '/comment/detail/:id',
        component: CommentEdit
      },
      {
        title: 'Message',
        path: '/message',
        icon: <FormOutlined/>,
        component: LeaveMsgList
      },
      {
        path: '/message/detail/:id',
        component: LeaveMsgEdit
      },
      {
        title: 'User',
        path: '/user',
        icon: <FormOutlined/>,
        component: UserList
      },
      {
        path: '/user/create',
        component: UserCreate
      },
      {
        path: '/user/detail/:id',
        component: UserEdit
      },
    ]
  },
  {
    title: 'Lottery',
    path: '/lottery',
    icon: <SmileOutlined/>,
    subRoute: [
      {
        title: 'DoubleBall',
        path: '/ball',
        icon: <DollarOutlined/>,
        component: BallList
      },
      {
        path: '/ball/create',
        component: BallCreate
      },
      {
        path: '/ball/detail/:id',
        component: BallEdit
      },
      {
        title: 'Trend',
        path: '/trend',
        icon: <FundOutlined/>,
        component: BallTrend
      },
      {
        title: 'Chart',
        path: '/chart',
        icon: <BarChartOutlined/>,
        component: BallChart
      }
    ]
  },
  {
    title: 'Stocks',
    path: '/stocks',
    icon: <StockOutlined/>,
    subRoute: [
      {
        title: 'Stocks',
        path: '/list',
        icon: <StockOutlined/>,
        component: StockList
      },
      {
        path: '/detail/:id',
        component: StockDetail
      },
      {
        title: 'Trade History',
        path: '/hitory',
        icon: <FundOutlined/>,
        component: StockHistories
      }
    ]
  },
  {
    title: 'Demos',
    path: '/demos',
    icon: <BulbOutlined/>,
    subRoute: [
      {
        title: 'Demo Page',
        path: '/demo',
        icon: <ExperimentOutlined/>,
        component: Demo
      },
      {
        title: 'Redux',
        path: '/redux',
        icon: <ExperimentOutlined/>,
        component: DemoRedux
      },
      {
        title: 'Mobx',
        path: '/mobx',
        icon: <ExperimentOutlined/>,
        component: DemoMobx
      },
    ]
  },
]

const routes = routesConf.reduce<XRouteProps[]>((prev, cur) => {
  if (cur.subRoute) {
    let _cur: XRouteProps = {}
    if (cur.component) {
      _cur = {
        title: cur.title,
        path: cur.path,
        component: cur.component,
        meta: cur.meta,
      }
      prev.push(_cur)
    }
    return prev.concat(cur.subRoute.map((item) => {
      const _item = { ...item }
      _item.path = cur.path + String(_item.path)
      return _item
    }))
  }
  return prev.concat(cur)
}, [])

routes.push({
  path: '*',
  component: NotFound
})


const LeftMenuConfig = () => routesConf
  .filter(route => typeof route.title === 'string')
  .map<XRouteProps>(
  (route) => {
    let subRoute: XRouteProps[] = []
    if (route.subRoute && route.subRoute.length > 0) {
      subRoute = route.subRoute
        .filter(_route => typeof _route.title === 'string')
        .map(_route => ({
          path: route.path + String(_route.path),
          title: _route.title,
          icon: _route.icon
        }))
    }
    return {
      icon: route.icon,
      path: route.path,
      title: route.title,
      subRoute,
    }
  }
)


// console.log(routesConf, routes, 'LeftMenuConfig')

export {
  routesConf,
  routes,
  LeftMenuConfig
}
