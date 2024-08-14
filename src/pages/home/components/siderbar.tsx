import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { XRouteProps, LeftMenuConfig } from '../../../routes/pageRoutes'
import styles from './siderbar.scss'

const { Sider } = Layout
const { SubMenu } = Menu

const DEFAULT_PATH_LEN = 2


const setMenuKeys = (paths: string[], end = DEFAULT_PATH_LEN) => `/${paths.slice(0, end).join('/')}`

const LeftMenu = (props: ICommonProps) => {
  const { location, history } = props
  const [openKeys, setOpenKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const [menuList, setMenuList] = useState<XRouteProps[]>([])

  useEffect(() => {
    const { pathname } = location
    // window.USER.headerMenuKey为头部菜单选中项，根据配置拿到对应左侧菜单，过滤出有权限的左侧菜单
    const pathList = pathname.split('/').filter(p => p)
    const realMenus = LeftMenuConfig()

    console.log(pathList, 'realMenus', realMenus, pathname)
    // 路由更新时更新左侧菜单选中和展开项
    if (realMenus.length > 0) {
      setMenuList(realMenus)
      const openKeys = setMenuKeys(pathList, 1)
      const isTopMenu = realMenus.findIndex(item => item.path === pathname) >= 0

      setOpenKeys([openKeys])
      if (isTopMenu) {
        setSelectedKeys([openKeys])
      } else {
        setSelectedKeys([setMenuKeys(pathList)])
      }
    }
  }, [location.pathname])

  const onOpenChange = (keys: string[]): void => {
    setOpenKeys(keys)
  }

  return (
    <Sider collapsible width={220} style={{minHeight: '100vh'}}>
      <div className={styles.logo}>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348">
            <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
            <g stroke="#61dafb" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2"/>
              <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
              <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
            </g>
          </svg>
        </div>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={onOpenChange}
        style={{ height: '100%', borderRight: 0 }}
      >
        {menuList.map((item) => {
          if (item.subRoute && item.subRoute.length > 0) {
            return (
              <SubMenu key={String(item.path)} title={item.title} icon={item.icon}>
                {item.subRoute.map(child => (
                  <Menu.Item key={String(child.path)} icon={child.icon}>
                    <Link to={String(child.path)}>{child.title}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            )
          }
          return (
            <Menu.Item key={String(item.path)} icon={item.icon}>
              <Link to={String(item.path)}>{item.title}</Link>
            </Menu.Item>
          )
        })}
      </Menu>
    </Sider>
  )
}

export default withRouter(LeftMenu)
