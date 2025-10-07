import React, { useEffect } from 'react'
import { ConfigProvider, theme as antdTheme, App, ThemeConfig } from 'antd'
import zh_CN from 'antd/lib/locale/zh_CN'
import en_US from 'antd/lib/locale/en_US'
import zh_TW from 'antd/lib/locale/zh_TW'
import { useAppStore } from '@/stores'
import { Routes } from './pageRoutes'
import { LangI18n, Theme } from '@/types/global'
import { PREFERS_COLOR_SCHEME_DARK } from '@/constants'
import { useTheme } from '@/stores/hooks'
import { useThemeConfig } from '@/utils/themeConfig'

const AntdLocale: Record<LangI18n, typeof zh_CN> = {
  zh_CN,
  en_US,
  zh_TW,
}

export const Navigation: React.FC = () => {
  const [{ lang, theme, colorPrimary }, dispatch] = useAppStore()
  const themeConfig = useThemeConfig()

  useEffect(() => {
    const matchMedia = window.matchMedia(PREFERS_COLOR_SCHEME_DARK)
    // document.body.setAttribute('theme', theme)

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
      componentSize="middle"
      locale={AntdLocale[lang]}
      theme={{
        algorithm: theme === Theme.Dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          ...themeConfig.token,
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
