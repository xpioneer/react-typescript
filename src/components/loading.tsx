import * as React from 'react'
import { Spin } from 'antd'

interface ILoadingProps {
  size?: 'small' | 'default' | 'large'
}

export default class Loading extends React.Component<ILoadingProps> {

  state = {
    id: '123'
  }

  render () {
    const { size = 'default' } = this.props

    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Spin size={size}/>
      </div>
    )
  }
}

const component =  new Loading({size: 'default'})