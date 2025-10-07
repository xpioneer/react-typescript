import React, { useState, useEffect, useRef } from 'react'
import { Row, Col, Form, Spin } from 'antd'
import * as Echart from 'echarts/core'
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
} from 'echarts/components'
import { PieChart, PieSeriesOption, BarChart, BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { LabelLayout } from 'echarts/features'
import { getStockChartCount } from '../../../services/stock'
import { Board, StockStats } from '@/types/stock'

Echart.use([
  PieChart,
  BarChart,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer,
  LabelLayout
])

type EchartsOption = Echart.ComposeOption<
| TitleComponentOption
| TooltipComponentOption
| LegendComponentOption
| PieSeriesOption
| BarSeriesOption
>

export const StockChart: React.FC = () => {

  const chartRef = useRef<HTMLDivElement>(null)

  const setChartOpts = (res: StockStats[]) => {
    const colors = ['#f38181', '#3fc1c9', '#fc5185', '#00DDFF', '#37A2FF', '#FF0087', '#3f72af', '#FFBF00']
    const total = res.reduce((p, c) => {
      return p + Number(c.total)
    }, 0)
    const vals = res.map(i => ({
      name: Board[i.block],
      value: i.total,
    }))
    const options: EchartsOption = {
      title: {
        text: `Stock Blocks(${total})`,
        subtext: 'China A-Share Market',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      grid: [
        {
          top: 60,
          width: '50%',
          bottom: 30,
          left: 60,
          containLabel: true
        },
      ],
      xAxis: {
        name: '数量',
        type: 'value'
      },
      yAxis: {
        name: '板块',
        // type: 'name',
        data: res.map(i => Board[i.block])
      },
      series: [
        {
          // name: '板块统计',
          type: 'bar',
          data: vals,
          barWidth: 28,
          showBackground: true,
          // containLabel: true,
          stack: 'chart',
          silent: true,
          itemStyle: {
            color: (param) => {
              return colors[param.dataIndex % colors.length]
            }
          },
          label: {
            show: true,
            position: 'right'
          },
        },
        {
          name: 'Block',
          type: 'pie',
          radius: '50%',
          center: ["80%", "50%"],
          data: res.map(i => ({name: Board[i.block], value: i.total})),
          itemStyle: {
            color: (param) => {
              return colors[param.dataIndex % colors.length]
            }
          },
        }
      ]
    }
    const stockChart = Echart.init(chartRef.current)
    stockChart.setOption(options)
  }

  useEffect(() => {
    getStockChartCount().then(setChartOpts)
  }, [])


  return (
    <Row>
      <Col span={24}>
        <div style={{ height: 320, backgroundColor: '#fff' }} ref={chartRef}></div>
      </Col>
    </Row>
  )
}
