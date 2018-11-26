import * as React from 'react'
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react'
import Dashboard from '@pages/dashboard/dashboard'
import Chart from '@pages/charts'
import LogApi from '@pages/logs/api'
import LogErrors from '@pages/logs/errors'
import ArticleList from '@pages/article/articleList'
import ArticleDetail from '@pages/article/articleDetail'
import NotFound from '@components/notFound'
import { Demo } from '../demo/demo'
import Sider from '@components/shared/sider'
import Header from '@components/shared/header'
import Footer from '@components/shared/footer'
import { LocaleProvider } from 'antd'

const { Content } = Layout

@inject('homeStore')
@observer
class Home extends React.Component<IProps> {

  render(){
    const {homeStore} = this.props
    
    return (<LocaleProvider locale={homeStore.lang}>
      <Layout>
        <Sider {...homeStore}/>
        <Layout>
          <Header props={homeStore}/>
          <Content style={{ margin: '16px 12px', padding: 16, background: '#fff', minHeight: 520 }}>
            <Switch>
              <Route exact path="/" component={Dashboard}></Route>
              <Route exact path="/charts" component={Chart}></Route>
              <Route exact path="/log-api" component={LogApi}></Route>
              <Route exact path="/log-errors" component={LogErrors}></Route>
              <Route exact path="/blog-article" component={ArticleList}></Route>
              <Route exact path="/blog-articleDetail/:id" component={ArticleDetail}></Route>
              <Route exact path="/demos" component={Demo}></Route>
              <Route path="*" component={NotFound}></Route>
            </Switch>
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    </LocaleProvider>)
  }
}

export default Home