import React, { useState, useRef } from 'react'
import { Row, Col, Form, Button, Spin } from 'antd'
import { IBall } from '@models/ball'
import * as Echart from 'echarts/core'
import { LegendComponent, TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'
import { BarChart, LineChart  } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { useChart } from './useChart'
// // 引入柱状图
// require('echarts/lib/chart/bar')
// require('echarts/lib/chart/line')
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
// require('echarts/lib/component/legend')

Echart.use([
  BarChart,
  LineChart,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer
])
const BallChart: React.FC = () => {

  const { loading, redRef, blueRef, chartRef } = useChart()

  return <Spin spinning={loading}>
    <div>
      <h3>红蓝球历史出现次数</h3>
      <Row>
        <Col span={16}>
          <div className='chart-w' style={{borderRight: 'none'}} ref={redRef}></div>
        </Col>
        <Col span={8}>
          <div className='chart-w' ref={blueRef}></div>
        </Col>
      </Row>
      <h3>红球历史出现分布图</h3>
      <Row>
        <Col span={24}>
          <div className='chart-w' style={{borderRight: 'none'}} ref={chartRef}></div>
        </Col>
      </Row>
    </div>
  </Spin>
}

export default BallChart
