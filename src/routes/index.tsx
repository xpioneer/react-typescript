import React, { useEffect } from 'react'
import { ConfigProvider, theme as antdTheme, App } from 'antd'
import zh_CN from 'antd/lib/locale/zh_CN'
import en_CN from 'antd/lib/locale/en_US'
import { useAppStore } from 'stores'
import { Routes } from './pageRoutes'
import { LangKeys, Theme } from 'types/global'
import { PREFERS_COLOR_SCHEME_DARK } from '@/constants'
import { useTheme } from '@/stores/hooks'


const AntdLocale: Record<LangKeys, typeof zh_CN> = {
  'zh-CN': zh_CN,
  'en-US': en_CN,
}

export const Navigation: React.FC = () => {

  const [{
    lang,
    theme,
    colorPrimary,
  }, dispatch] = useAppStore()

  useEffect(() => {
    const matchMedia = window.matchMedia(PREFERS_COLOR_SCHEME_DARK)

    document.body.setAttribute('theme', theme)

    const onChange = ({ matches }: MediaQueryListEvent) => {
      const changedTheme = matches ? Theme.Dark : Theme.Light
      useTheme(changedTheme, dispatch)
    }
    matchMedia.addEventListener('change', onChange)
    return () => {
      matchMedia.removeEventListener('change', onChange)
    }
  }, [])

  return (
    <ConfigProvider
      componentSize='middle'
      locale={AntdLocale[lang]}
      theme={{
        algorithm: theme === Theme.Dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary,
        },
      }}
    >
      <App>
        <Routes />
      </App>
    </ConfigProvider>
  )
}
