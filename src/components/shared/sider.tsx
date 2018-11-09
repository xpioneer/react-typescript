import * as React from 'react'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout

interface ISiderProps {
  collapsed?: boolean
}

export default class SiderComponent extends React.Component<ISiderProps> {
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
          <span>nav 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <span>nav 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="bulb" />
          <span>测试</span>
        </Menu.Item>
      </Menu>
    </Sider>)
  }
}

