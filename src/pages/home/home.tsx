import * as React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { HeaderComponent } from './components/header'
import Footer from './components/footer'
import { SiderBar } from './components/siderbar'
import { useAppState } from '@/stores'
import clsx from 'clsx'
import styles from './style.module.scss'

const { Content } = Layout

const HomePage: React.FC = () => {

  const authorized = useAppState(state => state.authorized)


  return (
    <Layout>
      <SiderBar />
      <Layout className={styles.right}>
        <HeaderComponent />
        <Content className={styles.main}>
          <div className="pd12">
            <Outlet />
          </div>
          <Footer />
        </Content>
      </Layout>
    </Layout>
  )
}

export default HomePage