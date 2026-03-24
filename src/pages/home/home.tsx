import * as React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { HeaderComponent } from './components/header'
import Footer from './components/footer'
import { SiderBar } from './components/siderbar'
import { useAppState } from '@/stores'
import classNames from 'classnames'
import styles from './style.module.scss'

const { Content } = Layout

const HomePage: React.FC = () => {

  const {
    authorized
  } = useAppState()


  return (
      <Layout>
        <SiderBar/>
        <Layout className={styles.right}>
          <HeaderComponent/>
          <Content className={classNames('pd16', styles.main)}>
            <Outlet />
          </Content>
          <Footer/>
        </Layout>
      </Layout>
  )
}

export default HomePage