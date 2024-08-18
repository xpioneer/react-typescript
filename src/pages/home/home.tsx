import * as React from 'react'
import { Layout } from 'antd'
import { inject, observer } from 'mobx-react'
import { AuthorizedRoutes } from 'routes/authorizedRoutes'
import { HeaderComponent } from './components/header'
import Footer from './components/footer'
import { ConfigProvider } from 'antd'
import SiderBar from './components/siderbar'
import { useAppStore } from '@/stores/global'
import zh_CN from 'antd/lib/locale/zh_CN'
import en_CN from 'antd/lib/locale/en_US'
import { LangKeys } from 'types/global'

const { Content } = Layout

const AntdLocale: Record<LangKeys, typeof zh_CN> = {
  'zh-CN': zh_CN,
  'en-US': en_CN,
}

const HomePage: React.FC = () => {

  const [{
    lang,
    authorized
  }] = useAppStore()

  return (
    <ConfigProvider locale={AntdLocale[lang]}>
      <Layout>
        <SiderBar/>
        <Layout>
          <HeaderComponent/>
          <Content style={{
            // margin: '16px 12px',
            padding: 16,
            // background: '#fff',
            // minHeight: 520
          }}>
            <AuthorizedRoutes authorized={authorized}/>
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default HomePage