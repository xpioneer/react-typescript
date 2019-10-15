import * as React from 'react'
import { Layout, Icon, Popover } from 'antd'

const { Header } = Layout

interface IHeaderProps {
  props: any
}

export default class HeaderComponent extends React.Component<IHeaderProps> {


  render(){
    const {collapsed, toggleMenu, lang, toggleLang, logout} = this.props.props
    
    return (<Header style={{
      background: '#fff',
      padding: 0,
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{flex: '1 1 0'}}>
        <Icon
          style={{cursor: 'pointer'}}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggleMenu}/>
      </div>
      <div style={{paddingRight: 12}}>
        <Popover trigger="click" placement="bottomRight" content={
          <div className="user-menu">
            <div onClick={() => toggleLang(lang)}>{lang ? 'English' : '中文'}</div>
            <div onClick={logout}>退出登录</div>
          </div>
        }>
          <Icon
            style={{cursor: 'pointer', fontSize: 24}}
            type='user'/>
        </Popover>
      </div>
    </Header>)
  }
}

