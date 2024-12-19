import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en_US from './en_US.json'
import zh_CN from './zh_CN.json'
import zh_TW from './zh_TW.json'
import { getCurrentLang } from '@/types/global'

const currentLang = getCurrentLang()

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en_US: {
        translation: en_US,
      },
      zh_CN: {
        translation: zh_CN,
      },
      zh_TW: {
        translation: zh_TW,
      },
    },
    lng: currentLang,
    fallbackLng: currentLang,
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })