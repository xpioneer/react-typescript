import * as React from 'react'
import { Layout } from 'antd'
import { inject, observer } from 'mobx-react'
import { AuthorizedRoutes } from 'routes/authorizedRoutes'
import { HeaderComponent } from './components/header'
import Footer from './components/footer'
import { ConfigProvider } from 'antd'
import SiderBar from './components/siderbar'
import { useAppStore } from '@/stores/global'

const { Content } = Layout

const HomePage: React.FC = () => {

  const [{
    authorized
  }] = useAppStore()


  return (
      <Layout>
        <SiderBar/>
        <Layout>
          <HeaderComponent/>
          <Content className='pd16'>
            <AuthorizedRoutes authorized={authorized}/>
          </Content>
          <Footer/>
        </Layout>
      </Layout>
  )
}

export default HomePage