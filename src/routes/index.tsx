import React from 'react'
import { ConfigProvider, theme, App } from 'antd'
import zh_CN from 'antd/lib/locale/zh_CN'
import en_CN from 'antd/lib/locale/en_US'
import { useAppStore } from 'stores/store'
import { Routes } from './pageRoutes'
import { LangKeys } from 'types/global'


const AntdLocale: Record<LangKeys, typeof zh_CN> = {
  'zh-CN': zh_CN,
  'en-US': en_CN,
}

export const Navigation: React.FC = () => {

  const [{
    lang,
    dark,
    primary,
  }] = useAppStore()

  return (
    <ConfigProvider
      locale={AntdLocale[lang]}
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: primary,
        },
      }}
    >
      <App>
        <Routes />
      </App>
    </ConfigProvider>
  )
}
