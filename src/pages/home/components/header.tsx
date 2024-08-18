import * as React from 'react'
import { Layout, Popover, Space } from 'antd'
import {
  MenuFoldOutlined, MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useAppStore, setLang } from 'stores/store'
import { onLogout } from 'services/account'
import { LangI18n } from 'types/global'


const { Header } = Layout

export const HeaderComponent: React.FC = () => {

  const [{
    lang,
  },
  dispatch
  ] = useAppStore()


  return (<Header style={{
    // background: '#fff',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }}>
    {/* <div style={{flex: '1 1 0'}} onClick={toggleMenu}> */}
    {/* {collapsed ? <MenuFoldOutlined/> : <MenuFoldOutlined/>} */}
    {/* <Icon
        style={{cursor: 'pointer'}}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggleMenu}/> */}
    {/* </div> */}
    <Space style={{paddingRight: 12}}>
      <Popover placement="bottomRight" content={
        <div className="user-menu">
          <div onClick={() => setLang(lang)}>{LangI18n[lang]}</div>
          <div onClick={onLogout}>退出登录</div>
        </div>
      }>
        <UserOutlined style={{color: '#fff'}}/>
        {/* <Icon
          style={{cursor: 'pointer', fontSize: 24}}
          type='user'/> */}
      </Popover>
    </Space>
  </Header>)
}
