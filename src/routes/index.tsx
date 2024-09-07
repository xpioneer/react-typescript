import React, { useEffect } from 'react'
import { ConfigProvider, theme, App } from 'antd'
import zh_CN from 'antd/lib/locale/zh_CN'
import en_CN from 'antd/lib/locale/en_US'
import { useAppStore, setDark } from 'stores'
import { Routes } from './pageRoutes'
import { LangKeys } from 'types/global'
import { PREFERS_COLOR_SCHEME_DARK } from '@/constants'


const AntdLocale: Record<LangKeys, typeof zh_CN> = {
  'zh-CN': zh_CN,
  'en-US': en_CN,
}

export const Navigation: React.FC = () => {

  const [{
    lang,
    dark,
    colorPrimary,
  }, dispatch] = useAppStore()

  useEffect(() => {
    const matchMedia = window.matchMedia(PREFERS_COLOR_SCHEME_DARK)

    if(dark && !matchMedia.matches) {
      document.body.setAttribute('theme', 'dark')
    }

    const onChange = ({ matches }: MediaQueryListEvent) => {
      dispatch(setDark(matches))
    }
    matchMedia.addEventListener('change', onChange)
    return () => {
      matchMedia.removeEventListener('change', onChange)
    }
  }, [])

  return (
    <ConfigProvider
      locale={AntdLocale[lang]}
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
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
