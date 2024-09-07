import React, { useState } from 'react'
import { Flex, Space, Button, Badge } from 'antd'

const useTest = () => {
  const [count, setCount] = useState(10)
  return {
    count,
    setCount,
  }
}

export const TestComponent: React.FC = () => {
  const { count, setCount } = useTest()
  return <Space>
    <Button onClick={() => setCount(x => --x)}>-</Button>
    <Badge count={count}>test1</Badge>
    <Button onClick={() => setCount(x => ++x)}>+</Button>
  </Space>
}


export const TestComponent2: React.FC = () => {
  const { count, setCount } = useTest()
  return <Space>
    <Button onClick={() => setCount(x => --x)}>-</Button>
    <Badge count={count}>test2</Badge>
    <Button onClick={() => setCount(x => ++x)}>+</Button>
  </Space>
}