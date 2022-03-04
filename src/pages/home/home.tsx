import * as React from 'react'
import { Layout } from 'antd'
import { inject, observer } from 'mobx-react'
import Routes from '../../routes'
import Header from './components/header'
import Footer from './components/footer'
import { ConfigProvider } from 'antd'
import SiderBar from './components/siderbar'

const { Content } = Layout

@inject('homeStore')
@observer
class Home extends React.Component<ICommonProps> {

  render () {
    const {homeStore} = this.props
    
    return (<ConfigProvider locale={homeStore.lang}>
      <Layout>
        <SiderBar/>
        <Layout>
          <Header props={homeStore}/>
          <Content style={{ margin: '16px 12px', padding: 16, background: '#fff', minHeight: 520 }}>
            { Routes(homeStore.authorized) }
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    </ConfigProvider>)
  }
}

export default Home