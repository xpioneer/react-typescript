import * as React from 'react'
import { NavLink, Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout

interface ISiderProps extends RouteComponentProps {
  collapsed?: boolean
}

class SiderComponent extends React.Component<ISiderProps> {

  goPage = (e: any) => {
    console.log(e, this.props)
    this.props.history.push('/demo')
  }

  render(){
    const {collapsed} = this.props
    
    return (<Sider
      trigger={null}
      collapsible
      collapsed={collapsed}>
      <div className="logo">
        <div></div>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Icon type="user" />
          <span>首页</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <span>图表</span>
        </Menu.Item>
        
        <Menu.Item key="3" onClick={this.goPage}>
          {/* <NavLink to="/demo"> */}
            <Icon type="bulb" />
            <span>测试</span>
          {/* </NavLink>     */}
        </Menu.Item>
      </Menu>
    </Sider>)
  }
}

export default withRouter(SiderComponent)
