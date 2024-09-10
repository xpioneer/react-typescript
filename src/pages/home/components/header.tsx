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
  Segmented,
  SegmentedProps,
  theme as antdTheme,
  ConfigProvider,
} from 'antd'
import {
  UserOutlined,
  SunOutlined,
  MoonOutlined,
  AppleOutlined,
} from '@ant-design/icons'
import { useAppStore, setLang, setPrimary } from 'stores'
import { onLogout } from 'services/account'
import { LangI18n, Theme } from 'types/global'
import { storage } from '@/utils/tools'
import { COLOR_PRIMARY_KEY, PRIMARY_COLOR } from '@/constants'
import { useTheme } from '@/stores/hooks'


const { Header } = Layout

export const HeaderComponent: React.FC = () => {

  const {
    token,
  } = antdTheme.useToken();

  const [{
    lang,
    theme,
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

  return (<Header className='pdr16'>
    <Flex justify="flex-end">
      <Space align='center'>
        <Flex>
          <ColorPicker
            panelRender={(panel) => (
              <Space direction="vertical">
                  <Space>
                    Default: <Tag
                    title='Click to set as default'
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
        <Segmented
          value={theme}
          onChange={(value) => useTheme(value as Theme, dispatch)}
          options={Object.values(Theme).map(i => ({
            value: i,
            icon: i === Theme.Light ? <SunOutlined /> : <MoonOutlined />,
          }))
        }
        />
        <Dropdown menu={{items}} arrow>
          <Button type="primary" ghost shape="circle" icon={<UserOutlined />} />
        </Dropdown>
      </Space>
    </Flex>
  </Header>)
}
