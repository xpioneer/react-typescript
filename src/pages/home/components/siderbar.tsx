import React, { useState, useEffect } from 'react'
import { Link, useLocation, } from 'react-router-dom'
import { Layout, Menu, theme } from 'antd'
import { MenuItem, LeftMenuConfig } from 'routes/routeConf'
import styles from './siderbar.module.scss'

const { Sider } = Layout
const { SubMenu } = Menu

const DEFAULT_PATH_LEN = 2


const setMenuKeys = (paths: string[], end = DEFAULT_PATH_LEN) => paths.slice(0, end)

export const SiderBar: React.FC = () => {
  const { token: { fontSize, fontSizeLG, controlHeight, colorPrimary } } = theme.useToken()
  const { pathname } = useLocation()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [menuList, setMenuList] = useState<MenuItem[]>(LeftMenuConfig())

  useEffect(() => {
    // window.USER.headerMenuKey为头部菜单选中项，根据配置拿到对应左侧菜单，过滤出有权限的左侧菜单
    const pathList = pathname.split('/').filter(p => p)

    // console.log(pathList, 'realMenus', menuList, pathname)
    // 路由更新时更新左侧菜单选中和展开项
    const _openKeys = setMenuKeys(pathList, 1)
    const _selectedKeys = setMenuKeys(pathList).slice(-1)
    setOpenKeys(_openKeys)
    setSelectedKeys(_selectedKeys.length ? _selectedKeys : [''])
  }, [pathname])

  const onOpenChange = (keys: string[]): void => {
    setOpenKeys(keys)
  }

console.log(colorPrimary, '>>>colorPrimary')
  return (
    <Sider collapsible width={Math.max(controlHeight * 6, 220)}>
      <div className={styles.logo} style={{ height: controlHeight * 2 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-25 -25 50 50"
          style={{ width: fontSize * 2 }}
        >
          <circle cx="0" cy="0" r="4.45" fill="#61dafb" />
          <g stroke="#61dafb" strokeWidth="2.1" fill="none">
            <ellipse rx="23.91" ry="9" />
            <ellipse rx="23.91" ry="9" transform="rotate(60)" />
            <ellipse rx="23.91" ry="9" transform="rotate(120)" />
          </g>
        </svg>
        <div className={styles.title} style={{ fontSize: fontSizeLG }}>
          My Zone{controlHeight}
        </div>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={onOpenChange}
        items={menuList}
      />
    </Sider>
  )
}

// export default withRouter(LeftMenu)
