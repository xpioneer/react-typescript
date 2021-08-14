import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { XRouteProps, LeftMenuConfig } from '../../../routes/pageRoutes';


const { Sider } = Layout;
const { SubMenu } = Menu;

const DEFAULT_PATH_LEN = 2;


const setMenuKeys = (paths: string[], end = DEFAULT_PATH_LEN) => `/${paths.slice(0, end).join('/')}`;

const LeftMenu = (props: ICommonProps) => {
  const { location, history } = props;
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [menuList, setMenuList] = useState<XRouteProps[]>([]);

  useEffect(() => {
    const { pathname } = location;
    // window.USER.headerMenuKey为头部菜单选中项，根据配置拿到对应左侧菜单，过滤出有权限的左侧菜单
    const pathList = pathname.split('/').filter(p => p);
    const realMenus = LeftMenuConfig();

    console.log(pathList, 'realMenus', realMenus)
    // 路由更新时更新左侧菜单选中和展开项
    if (realMenus.length > 0) {
      setMenuList(realMenus);
      const openKeys = setMenuKeys(pathList);
      const isTopMenu = realMenus.findIndex(item => item.path === pathname) >= 0;
      const isMenu2 = realMenus.some((item) => {
        if (item.subRoute && item.subRoute.length > 0) {
          return item.subRoute.some(_item => _item.path === pathname);
        }
        return false;
      });

      if (pathname !== '/' && pathList.length >= DEFAULT_PATH_LEN) {
        setOpenKeys([openKeys]);
        if (isTopMenu) {
          setSelectedKeys([openKeys]);
        } else if (isMenu2 || pathList.length > DEFAULT_PATH_LEN + 1) {
          setSelectedKeys([setMenuKeys(pathList, DEFAULT_PATH_LEN + 1)]);
        } else {
          setSelectedKeys([setMenuKeys(pathList)]);
        }
      } else if (pathname === '/' || pathList.length < DEFAULT_PATH_LEN) {
        const keys = (realMenus[0].subRoute && realMenus[0].subRoute.length > 0) ? realMenus[0].subRoute[0].path : realMenus[0].path;
        pathname === '/' && history.replace(String(keys));
        setOpenKeys([keys]);
        setSelectedKeys([keys]);
      }
    }
  }, [location.pathname]);

  const onOpenChange = (keys: string[]): void => {
    setOpenKeys(keys);
  };

  return (
    <Sider collapsible width={200}>
      <div className="logo">
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
                  <Menu.Item key={String(child.path)}>
                    <Link to={String(child.path)}>{child.title}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          }
          return (
            <Menu.Item key={String(item.path)} icon={item.icon}>
              <Link to={String(item.path)}>{item.title}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default withRouter(LeftMenu);
