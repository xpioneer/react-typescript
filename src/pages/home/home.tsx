import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Dashboard from '@pages/dashboard/dashboard'
import NotFound from '@components/notFound'
import { Demo } from '../demo/demo'

const { Header, Sider, Content, Footer } = Layout

const style = {}

export default class Home extends React.Component {

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render(){
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo">
            <div></div>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '16px 12px', padding: 16, background: '#fff', minHeight: 480 }}>
            <Router>
              <Switch>
                <Route path="/" exact component={Dashboard}></Route>
                <Route path="/demo" exact component={Demo}></Route>
                {/* <Route component={NotFound}></Route> */}
              </Switch>
            </Router>
          </Content>
          <Footer style={{ background: '#fff', textAlign: 'center' }}>Copyright by Keefe</Footer>
        </Layout>
      </Layout>
    )
  }
}