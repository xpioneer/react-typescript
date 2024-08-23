import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  Layout, Popover, Space,
  Dropdown,
  MenuProps,
} from 'antd'
import {
  MenuFoldOutlined, MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useAppStore, setLang } from 'stores/store'
import { onLogout } from 'services/account'
import { LangI18n } from 'types/global'
import { storage } from '@/utils/tools'


const { Header } = Layout

export const HeaderComponent: React.FC = () => {

  const [{
    lang,
  },
  dispatch
  ] = useAppStore()

  const items: MenuProps['items'] = [
    {
      label: <div onClick={() => setLang(lang)}>{LangI18n[lang]}</div>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: 'Log out',
      key: '9',
      onClick: () => {
        onLogout().then(() => {
          console.log('退出..')
          storage.clear()
          window.location.replace('/login')
        })
      }
    },
  ]


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
      <Dropdown menu={{items}}>
        <UserOutlined/>
      </Dropdown>
    </Space>
  </Header>)
}
