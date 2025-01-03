import * as React from 'react'
import { Layout, Flex, theme } from 'antd'

const { Footer } = Layout

export default () => {
  const { token: { boxShadow, paddingSM } } = theme.useToken()
  return <Footer style={{boxShadow, padding: paddingSM}}>
    <Flex justify='center'>
      Copyright by&#160;
      <a target='_blank' href="https://github.com/xpioneer">xpioneer</a>
    </Flex>
  </Footer>
}