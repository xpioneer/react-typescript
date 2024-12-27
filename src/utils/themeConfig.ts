import { PRIMARY_COLOR } from '@/constants'
import { useAppStore } from '@/stores'
import { Theme } from '@/types/global'
import { theme as antdTheme, ThemeConfig } from 'antd'
import { AliasToken } from 'antd/lib/theme/interface'
import { debounce, merge } from 'lodash'
import { useEffect, useState } from 'react'

type PartialAliasToken = Partial<AliasToken>

const breakPoint: PartialAliasToken = {
  screenXXL: 3024,
  screenXXLMin: 3024,
  screenXLMax: 3023,
  screenXL: 2560,
  screenXLMin: 2560,
  screenLGMax: 2559,
  screenLG: 1920,
  screenLGMin: 1920,
  screenMDMax: 1919,
  screenMD: 1440,
  screenMDMin: 1440,
  screenSMMax: 1439,
  screenSM: 992,
  screenSMMin: 992,
  screenXSMax: 991,
  screenXS: 768,
  screenXSMin: 480,
}

const getTokenConfig = (): ThemeConfig => {
  const width = document.body.clientWidth
  const config: ThemeConfig = {
    token: {
      fontSize: 12,
      controlHeight: 24,
    },
  }
  if (width >= breakPoint.screenXXL!) {
    config.token = {
      fontSize: 26,
      controlHeight: 60,
    }
  } else if (width >= breakPoint.screenXL!) {
    config.token = {
      fontSize: 22,
      controlHeight: 50,
    }
  } else if (width >= breakPoint.screenLG!) {
    config.token = {
      fontSize: 16,
      controlHeight: 40,
    }
  } else if (width >= breakPoint.screenMD!) {
    config.token = {
      fontSize: 14,
      controlHeight: 32,
    }
  } else if (width >= breakPoint.screenSM!) {
    config.token = {
      fontSize: 13,
      controlHeight: 28,
    }
  }
  return merge(config, breakPoint)
}

export const useThemeConfig = () => {
  const [themeConfig, setThemeConfig] = useState(getTokenConfig())

  useEffect(() => {
    const onResize = debounce(() => {
      setThemeConfig(getTokenConfig())
    }, 350)
    window.onresize = onResize
    return () => {
      window.onresize = null
    }
  }, [])

  return themeConfig
}
