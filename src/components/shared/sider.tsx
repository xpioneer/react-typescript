import * as React from 'react'
import { NavLink, Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout

interface ISiderProps extends RouteComponentProps {
  collapsed?: boolean
}

const MenuList = [{
  key:'1', title:'首页', path:'/', icon:'user'
},{
  key:'2', title:'图表', path:'/charts', icon:'video-camera'
},{
  key:'3', title:'测试', path:'/demos', icon:'bulb'
}]

class SiderComponent extends React.Component<ISiderProps> {

  componentWillReceiveProps() {
    // console.log('willReceiveProps')
  }

  componentWillUpdate(props: any){
    // console.log('willUpdate')
  }

  componentDidMount(){
    // console.log('didMount')
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
        {
          MenuList.map(m => <Menu.Item key={m.key}>
            <Link to={m.path}>
              <Icon type={m.icon} />
              <span>{m.title}</span>
            </Link>
          </Menu.Item>)
        }
      </Menu>
    </Sider>)
  }
}

export default withRouter(SiderComponent)
