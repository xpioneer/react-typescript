import * as React from 'react'
import { RouteObject, Link } from 'react-router-dom'
import { NotFound }  from '@components/notFound'
import {
  AreaChartOutlined, BarChartOutlined, BulbOutlined,
  DollarOutlined, ExperimentOutlined, FileSearchOutlined,
  BookOutlined, FormOutlined, FrownOutlined, FundOutlined,
  HomeOutlined, MehOutlined, SmileOutlined, StockOutlined,
  LineChartOutlined, BaiduOutlined, GlobalOutlined,
  SmileFilled,
} from '@ant-design/icons'
// import ThreejsIcon from '@/assets/icons/threejs.svg'
import {ThreejsIcon} from '@/assets/icons/threejs'
import { MenuProps } from 'antd'

const {lazy} = React

const Dashboard = lazy(() => import( /* webpackChunkName:"dashboard" */ '@pages/dashboard/dashboard'))
const Chart = lazy(() => import( /* webpackChunkName:"charts" */ '@pages/charts'))
const LogApi = lazy(() => import( /* webpackChunkName:"logApi" */ '@pages/logs/apiNew'))
const GeoLog = lazy(() => import( /* webpackChunkName:"geography" */ '@pages/logs/geography'))
const LogErrors = lazy(() => import( /* webpackChunkName:"logErrors" */ '@pages/logs/errorsNew'))
const ArticleList = lazy(() => import( /* webpackChunkName:"articleList" */ '@pages/article'))
const ArticleDetail = lazy(() => import( /* webpackChunkName:"articleDetail" */ '@pages/article/detail'))
// const ArticleCreate = lazy(() => import( /* webpackChunkName:"articleCreate" */ '@pages/article/articleCreate'))
const ArticleTypeList = lazy(() => import( /* webpackChunkName:"articleTypeList" */ '@pages/articleType'))
const ArticleTypeDetail = lazy(() => import( /* webpackChunkName:"articleTypeDeital" */ '@pages/articleType/detail'))
// const ArticleTypeCreate = lazy(() => import( /* webpackChunkName:"articleTypeCreate" */ '@pages/articleType/articleTypeCreate'))
const TagList = lazy(() => import( /* webpackChunkName:"tagList" */ '@pages/tag'))
const TagDetail = lazy(() => import( /* webpackChunkName:"tagEdit" */ '@pages/tag/detail'))
// const TagCreate = lazy(() => import( /* webpackChunkName:"tagCreate" */ '@pages/tag/tagCreate'))
const CommentList = lazy(() => import( /* webpackChunkName:"commentList" */ '@pages/comment'))
const CommentDetail = lazy(() => import( /* webpackChunkName:"commentDetail" */ '@pages/comment/detail'))
const LeaveMsgList = lazy(() => import( /* webpackChunkName:"leaveMsgList" */ '@pages/leaveMsg'))
const LeaveMsgDetail = lazy(() => import( /* webpackChunkName:"leaveMsgDetail" */ '@pages/leaveMsg/detail'))
const UserList = lazy(() => import( /* webpackChunkName:"userList" */ '@pages/user'))
const UserDetail = lazy(() => import( /* webpackChunkName:"userEdit" */ '@pages/user/detail'))
// const UserCreate = lazy(() => import( /* webpackChunkName:"userCreate" */ '@pages/user/userCreate'))
const BallList = lazy(() => import( /* webpackChunkName:"ballList" */ '@pages/lottery/ballListNew'))
const BallDetail = lazy(() => import( /* webpackChunkName:"ballDetail" */ '@pages/lottery/detail'))
// const BallEdit = lazy(() => import( /* webpackChunkName:"ballEdit" */ '@pages/lottery/ballEdit'))
const BallTrend = lazy(() => import( /* webpackChunkName:"ballTrend" */ '@pages/lottery/trend'))
const BallChart = lazy(() => import( /* webpackChunkName:"ballChart" */ '@pages/lottery/chart'))
const StockList = lazy(() => import( /* webpackChunkName:"StockList" */ '@pages/stocks'))
const StockDetail = lazy(() => import( /* webpackChunkName:"StockDetail" */ '@pages/stocks/detail'))
const StockHistories = lazy(() => import( /* webpackChunkName:"StockList" */ '@pages/stocks/history'))
// const StockHistoriesDetail = lazy(() => import( /* webpackChunkName:"StockList" */ '@pages/stocks/historyDetail'))
const StockKLine = lazy(() => import( /* webpackChunkName:"StockKLine" */ '@pages/stocks/kLine'))
const ThreeJS = lazy(() => import( /* webpackChunkName:"ThreeJS" */ '@pages/threejs'))
const FaceRecognition = lazy(() => import( /* webpackChunkName:"Face" */ '@pages/face'))

// demos
const Demo = lazy(() => import( /* webpackChunkName:"demo" */ '@pages/demos/demoNew'))
const DemoMobx = lazy(() => import( /* webpackChunkName:"demoMobx" */ '@pages/demos/demoMobx'))
const DemoRedux = lazy(() => import( /* webpackChunkName:"demoRedux" */ '@pages/demos/demoRedux'))

type XRouteObject = RouteObject & {
  title?: string
  icon?: React.ReactNode
  meta?: {
    title: string;
  }
  subRoute?: XRouteObject[]
}

/**
 * 子级页面路由的path请保持与父级path有相同的Menu前缀，确保菜单选中
 */
const routesConf: XRouteObject[] = [
  {
    title: 'Dashboard',
    path: '',
    icon: <HomeOutlined/>,
    element: <Dashboard />,
  },
  {
    title: 'Charts',
    path: 'charts',
    icon: <AreaChartOutlined/>,
    element: <Chart />,
  },
  {
    title: 'ThreeJS',
    path: 'threejs',
    icon: <ThreejsIcon />,
    element: <ThreeJS />,
  },
  {
    title: 'Log',
    icon: <FileSearchOutlined/>,
    path: 'log',
    subRoute: [
      {
        title: 'API',
        path: 'api',
        icon: <MehOutlined/>,
        element: <LogApi />,
      },
      {
        title: 'Errors',
        path: 'errors',
        icon: <FrownOutlined/>,
        element: <LogErrors />,
      },
      {
        title: 'Geography',
        path: 'geo',
        icon: <BaiduOutlined />,
        element: <GeoLog />,
      },
    ]
  },
  {
    title: 'Blog',
    icon: <BookOutlined/>,
    path: 'blog',
    subRoute: [
      {
        title: 'Essay',
        path: 'article',
        icon: <FormOutlined/>,
        element: <ArticleList />,
      },
      {
        path: 'article-new',
        element: <ArticleDetail />,
      },
      {
        path: 'article/:id',
        element: <ArticleDetail />,
      },
      {
        title: 'Type',
        path: 'type',
        icon: <FormOutlined/>,
        element: <ArticleTypeList />,
      },
      {
        path: 'type-new',
        element: <ArticleTypeDetail />,
      },
      {
        path: 'type/:id',
        element: <ArticleTypeDetail />,
      },
      {
        title: 'Tag',
        path: 'tag',
        icon: <FormOutlined/>,
        element: <TagList />,
      },
      {
        path: 'tag-new',
        element: <TagDetail />,
      },
      {
        path: 'tag/:id',
        element: <TagDetail />,
      },
      {
        title: 'Comment',
        path: 'comment',
        icon: <FormOutlined/>,
        element: <CommentList />,
      },
      {
        path: 'comment/:id',
        element: <CommentDetail />,
      },
      {
        title: 'Message',
        path: 'message',
        icon: <FormOutlined/>,
        element: <LeaveMsgList />,
      },
      {
        path: 'message/:id',
        element: <LeaveMsgDetail />,
      },
      {
        title: 'User',
        path: 'user',
        icon: <FormOutlined/>,
        element: <UserList />,
      },
      {
        path: 'user-new',
        element: <UserDetail />,
      },
      {
        path: 'user/:id',
        element: <UserDetail />,
      },
    ]
  },
  {
    title: 'Lottery',
    path: 'lottery',
    icon: <SmileOutlined/>,
    subRoute: [
      {
        title: 'DoubleBall',
        path: 'ball',
        icon: <DollarOutlined/>,
        element: <BallList />,
      },
      {
        path: 'ball-create',
        element: <BallDetail />,
      },
      {
        path: 'ball/:id',
        element: <BallDetail />,
      },
      {
        title: 'Trend',
        path: 'trend',
        icon: <FundOutlined/>,
        element: <BallTrend />,
      },
      {
        title: 'Chart',
        path: 'chart',
        icon: <BarChartOutlined/>,
        element: <BallChart />,
      }
    ]
  },
  {
    title: 'Stocks',
    path: 'stocks',
    icon: <StockOutlined/>,
    subRoute: [
      {
        title: 'Stocks',
        path: 'list',
        icon: <StockOutlined/>,
        element: <StockList />,
      },
      {
        path: 'list/:id',
        element: <StockDetail />,
      },
      {
        title: 'Trade History',
        path: 'hitory',
        icon: <FundOutlined/>,
        element: <StockHistories />,
      },
      {
        title: 'KLine History',
        path: 'kline',
        icon: <LineChartOutlined />,
        element: <StockKLine />,
      },
    ]
  },
  {
    title: 'Face',
    path: 'face',
    icon: <SmileFilled />,
    element: <FaceRecognition />
  },
  {
    title: 'Demos',
    path: 'demos',
    icon: <BulbOutlined/>,
    subRoute: [
      {
        title: 'Demo Page',
        path: 'demo',
        icon: <ExperimentOutlined/>,
        element: <Demo />,
      },
      {
        title: 'Redux',
        path: 'redux',
        icon: <ExperimentOutlined/>,
        element: <DemoRedux />,
      },
      {
        title: 'Mobx',
        path: 'mobx',
        icon: <ExperimentOutlined/>,
        element: <DemoMobx />,
      },
    ]
  },
]

const routes = routesConf.reduce<RouteObject[]>((prev, cur) => {
  if (cur.subRoute) {
    let _cur: XRouteObject = {}
    if (cur.element) {
      _cur = {
        title: cur.title,
        path: cur.path,
        element: cur.element,
        meta: cur.meta,
      }
      prev.push(_cur)
    }
    return prev.concat(cur.subRoute.map((item) => {
      const _item = { ...item }
      _item.path = cur.path + '/' + String(_item.path)
      return _item
    }))
  }
  return prev.concat(cur)
}, [])

routes.push({
  path: '*',
  element: <NotFound />
})


export type MenuItem = Required<MenuProps>['items'][number];

const LeftMenuConfig = () => routesConf
  .filter(route => typeof route.title === 'string')
  .map(
  (route) => {
    let children: MenuItem[] | undefined = undefined
    if (route.subRoute && route.subRoute.length > 0) {
      children = route.subRoute
        .filter(_route => typeof _route.title === 'string')
        .map<MenuItem>(_route => ({
          // path: route.path + '/' + String(_route.path), 
          key: _route.path!,
          icon: _route.icon,
          label: <Link to={route.path + '/' + String(_route.path)}>{_route.title}</Link>,
          title: _route.title,
        }))
    }
    return {
      key: route.path,
      icon: route.icon,
      label: children ? route.title : <Link to={route.path!}>{route.title}</Link>,
      // path: route.path,
      title: route.title,
      children: children,
    } as MenuItem
  }
)


// console.log(routesConf, routes, 'LeftMenuConfig')

export {
  routesConf,
  routes,
  LeftMenuConfig
}
