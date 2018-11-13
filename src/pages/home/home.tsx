import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import {inject, observer} from 'mobx-react'
import Dashboard from '@pages/dashboard/dashboard'
import NotFound from '@components/notFound'
import { Demo } from '../demo/demo'
import Sider from '@components/shared/sider'
import Header from '@components/shared/header'
import Footer from '@components/shared/footer'

const { Content } = Layout

@inject('homeStore')
@observer
export default class Home extends React.Component<IProps> {

  render(){
    const {homeStore} = this.props
    
    return (
      <Layout>
        <Sider {...homeStore}/>
        <Layout>
          <Header {...homeStore}/>
          <Content style={{ margin: '16px 12px', padding: 16, background: '#fff', minHeight: 480 }}>
            <Router>
              <Switch>
                <Route path="/home" component={Dashboard}></Route>
                {/* <Redirect from="/" to="/home"></Redirect> */}
                <Route path="/demo" component={Demo}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Router>
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    )
  }
}

// interface IProps {
//   homeStore: any
// }