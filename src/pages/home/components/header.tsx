import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import {
  App,
  Layout, Space,
  Dropdown,
  MenuProps,
  Button,
  Flex,
  ColorPicker,
} from 'antd'
import { Color } from 'antd/lib/color-picker'
import {
  UserOutlined,
  SunFilled,
  MoonFilled,
} from '@ant-design/icons'
import { useAppStore, setLang, setDark, setPrimary } from 'stores/store'
import { onLogout } from 'services/account'
import { LangI18n } from 'types/global'
import { storage } from '@/utils/tools'
import { PRIMARY_KEY } from '@/constants'


const { Header } = Layout

export const HeaderComponent: React.FC = () => {

  const [{
    lang,
    dark,
    primary,
  },
  dispatch
  ] = useAppStore()

  const { modal } = App.useApp();

  const items: MenuProps['items'] = [
    {
      label: <div onClick={() => setLang(lang)}>{LangI18n[lang]}</div>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: 'Log out',
      key: '9',
      onClick: () => {
        modal.confirm({
          title: 'Are you sure you want to log out?',
          onOk: () => {
            return onLogout().then(() => {
              console.log('退出..')
              storage.clear()
              window.location.replace('/login')
            })
          }
        })
      }
    },
  ]

  const onChangePrimary = (value: Color) => {
    const color = value.toHexString()
    storage.set(PRIMARY_KEY, color)
    dispatch(setPrimary(color))
  }

  return (<Header className='pdr16'>
    <Flex justify="flex-end">
      <Space align='center'>
        <Flex>
          <ColorPicker
            value={primary}
            onChangeComplete={onChangePrimary}
          />
        </Flex>
        <Button
          ghost
          shape="circle"
          icon={ dark ? <MoonFilled /> : <SunFilled/> }
          onClick={() => dispatch(setDark(!dark))}
        />
        <Dropdown menu={{items}} arrow>
          <Button ghost shape="circle" icon={<UserOutlined />} />
        </Dropdown>
      </Space>
    </Flex>
  </Header>)
}
