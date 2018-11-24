import * as React from 'react'
import { NavLink, Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout
const {Item, SubMenu} = Menu

interface ISiderProps extends RouteComponentProps {
  collapsed?: boolean
}

const MenuList = [{
  key:'1', title:'首页', path:'/', icon:'user'
},{
  key:'2', title:'图表', path:'/charts', icon:'area-chart'
},{
  key:'3', title:'日志', icon:'file-search',
  children: [{
    key: '3-0', title: 'API', path: '/log-api', icon: 'meh'
  },{
    key: '3-1', title: 'Errors', path: '/log-errors', icon: 'frown'
  }]
},{
  key:'99', title:'测试', path:'/demos', icon:'bulb'
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
          MenuList.map(m => {
            return m.children ? <SubMenu key={m.key} title={<span><Icon type={m.icon} /><span>{m.title}</span></span>}>
              {
                m.children.map(mc => {
                  return <Item key={mc.key}>
                    <Link to={mc.path}>
                      <Icon type={mc.icon} />
                      <span>{mc.title}</span>
                    </Link>
                  </Item>
                })
              }
            </SubMenu> : <Item key={m.key}>
              <Link to={m.path}>
                <Icon type={m.icon} />
                <span>{m.title}</span>
              </Link>
            </Item>
          })
        }
      </Menu>
    </Sider>)
  }
}

export default withRouter(SiderComponent)
