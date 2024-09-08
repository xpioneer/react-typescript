import * as React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { HeaderComponent } from './components/header'
import Footer from './components/footer'
import { SiderBar } from './components/siderbar'
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
            <Outlet />
          </Content>
          <Footer/>
        </Layout>
      </Layout>
  )
}

export default HomePage