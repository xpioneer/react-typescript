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
  Tag,
} from 'antd'
import { Color } from 'antd/lib/color-picker'
import {
  UserOutlined,
  SunFilled,
  MoonFilled,
} from '@ant-design/icons'
import { useAppStore, setLang, setDark, setPrimary } from 'stores'
import { onLogout } from 'services/account'
import { LangI18n } from 'types/global'
import { storage } from '@/utils/tools'
import { COLOR_PRIMARY_KEY, CUSTOM_DARK_MODE, PRIMARY_COLOR } from '@/constants'


const { Header } = Layout

export const HeaderComponent: React.FC = () => {

  const [{
    lang,
    dark,
    colorPrimary,
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
            })
          }
        })
      }
    },
  ]

  const onChangePrimary = (color: string) => {
    storage.set(COLOR_PRIMARY_KEY, color)
    dispatch(setPrimary(color))
  }

  const onToggleDark = () => {
    const value = !dark
    storage.set(CUSTOM_DARK_MODE, `${value ? 1 : 0}`)
    dispatch(setDark(value))
  }

  return (<Header className='pdr16'>
    <Flex justify="flex-end">
      <Space align='center'>
        <Flex>
          <ColorPicker
            panelRender={(panel) => (
              <Space direction="vertical">
                  <Space>
                    Default: <Tag
                    style={{cursor: 'pointer'}}
                    color={PRIMARY_COLOR}
                    onClick={() => onChangePrimary(PRIMARY_COLOR)}
                  >{PRIMARY_COLOR}</Tag>
                  </Space>
                  <Space>
                    Current: <Tag color={colorPrimary}>{colorPrimary}</Tag>
                  </Space>
                {panel}
              </Space>
            )}
            value={colorPrimary}
            onChangeComplete={(value) => onChangePrimary(value.toHexString())}
          />
        </Flex>
        <Button
          ghost
          shape="circle"
          icon={ dark ? <MoonFilled /> : <SunFilled/> }
          onClick={onToggleDark}
        />
        <Dropdown menu={{items}} arrow>
          <Button ghost shape="circle" icon={<UserOutlined />} />
        </Dropdown>
      </Space>
    </Flex>
  </Header>)
}
