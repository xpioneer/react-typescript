import * as React from 'react'
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react'
import Routes from '../../routes'
import Sider from '@components/shared/sider'
import Header from '@components/shared/header'
import Footer from '@components/shared/footer'
import { LocaleProvider } from 'antd'

const { Content } = Layout

@inject('homeStore')
@observer
class Home extends React.Component<IProps> {

  render(){
    const {homeStore} = this.props
    
    return (<LocaleProvider locale={homeStore.lang}>
      <Layout>
        <Sider {...homeStore}/>
        <Layout>
          <Header props={homeStore}/>
          <Content style={{ margin: '16px 12px', padding: 16, background: '#fff', minHeight: 520 }}>
          { Routes(homeStore.authorized) }
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    </LocaleProvider>)
  }
}

export default Home