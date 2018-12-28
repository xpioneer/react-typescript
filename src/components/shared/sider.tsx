import * as React from 'react'
import { NavLink, Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout
const {Item, SubMenu} = Menu

interface ISiderProps extends RouteComponentProps {
  collapsed?: boolean
}

const MenuList = [{
  key:'1', title:'Home', path: '/home', icon:'home'
},{
  key:'2', title:'Charts', path: '/home/charts', icon:'area-chart'
},{
  key:'3', title:'Log', icon:'file-search',
  children: [{
    key: '3-0', title: 'API', path: '/home/log-api', icon: 'meh'
  },{
    key: '3-1', title: 'Errors', path: '/home/log-errors', icon: 'frown'
  }]
},{
  key:'4', title:'Essay', icon:'book',
  children: [{
    key: '4-0', title: '文章', path: '/home/blog-article', icon: 'form'
  },{
    key: '4-1', title: '文章类型', path: '/home/blog-type', icon: 'form'
  },{
    key: '4-2', title: '标签', path: '/home/blog-tag', icon: 'form'
  },{
    key: '4-3', title: '评论', path: '/home/blog-comment', icon: 'form'
  },{
    key: '4-4', title: '留言', path: '/home/blog-message', icon: 'form'
  },{
    key: '4-5', title: '用户', path: '/home/blog-user', icon: 'user'
  }]
},{
  key:'99', title:'Demo', path: '/home/demos', icon:'bulb'
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
