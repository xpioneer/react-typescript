import * as React from 'react'
import { Layout, Icon } from 'antd'

const { Header } = Layout

interface IHeaderProps {
  collapsed: boolean
  toggleMenu: any
}

export default class HeaderComponent extends React.Component<IHeaderProps> {


  render(){
    const {collapsed, toggleMenu} = this.props
    
    return <Header style={{ background: '#fff', padding: 0 }}>
      <Icon
        className="trigger"
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggleMenu}/>
    </Header>
  }
}

