import * as React from 'react'

export default class Dashboard extends React.Component {
  render () {
    return <div>
      <p>Welcome to Dashboard!</p>
      <div>GraphQL Application. </div>
      <p style={{width: '400PX', height: 40, fontSize: '24px'}}>测试rem</p>
      <div>66px</div>
      <div className="testcss">9999</div>
    </div>
  }
}