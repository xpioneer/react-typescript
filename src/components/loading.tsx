import * as React from 'react'
import { Spin } from 'antd'

interface ILoadingProps {
  size?: 'small' | 'default' | 'large'
}

export default class Loading extends React.Component<ILoadingProps> {

  render() {
    const { size = 'default' } = this.props

    return (
      <div style={{
        minHeight: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Spin size={size}/>
      </div>
    )
  }
}