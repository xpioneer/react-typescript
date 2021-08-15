import React, { useState, useEffect } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Stock, EMarket, EBlock } from '../../types/stock'
import { StockHistory } from 'types/stockHistory'
import { Button } from 'antd'

export const listColumns = (): ColumnProps<Stock>[] => {
  return [{
    title: 'ID',
    dataIndex: 'id',
  }, {
    title: '名称',
    dataIndex: 'name',
    width: '120px',
  }, {
    title: '代码',
    dataIndex: 'code'
  }, {
    title: '市场',
    dataIndex: 'market',
    render: (v, data) => EMarket[data.market]
  }, {
    title: '板块',
    dataIndex: 'block',
    render: (v, data) => EBlock[data.block]
  }, {
    title: '操作',
    dataIndex: '',
    width: '30px',
    render: (v, data) => <Button type="link">查看</Button>
  }]
}

export const historyColumns = (): ColumnProps<StockHistory>[] => {
  return [
    {
      title: '名称',
      dataIndex: 'name',
      width: '120px',
      fixed: 'left',
    },
    {
      title: '代码',
      dataIndex: 'code'
    },
    {
      title: '日期',
      dataIndex: 'tradeAt'
    },
    {
      title: '交易量',
      dataIndex: 'volume'
    },
    {
      title: '开盘',
      dataIndex: 'open'
    },
    {
      title: '最高',
      dataIndex: 'high'
    },
    {
      title: '最低',
      dataIndex: 'low'
    },
    {
      title: '收盘',
      dataIndex: 'close'
    },
    {
      title: '涨跌价',
      dataIndex: 'chg'
    },
    {
      title: '涨跌幅',
      dataIndex: 'percent'
    },
    {
      title: '换手率',
      dataIndex: 'turnoverrate'
    },
    {
      title: '成交额',
      dataIndex: 'amount'
    },
    // {
    //   title: '交易量',
    //   dataIndex: 'volume_post'
    // },
    // {
    //   title: '交易量',
    //   dataIndex: 'amount_post'
    // },
    {
      title: '市盈率(TTM)',
      dataIndex: 'pe'
    },
    {
      title: '市净率',
      dataIndex: 'pb'
    },
    {
      title: '市销率',
      dataIndex: 'ps'
    },
    {
      title: 'pcf',
      dataIndex: 'pcf'
    },
    {
      title: '总市值',
      dataIndex: 'market_capital'
    },
    // {
    //   title: '交易量',
    //   dataIndex: 'balance'
    // },
    // {
    //   title: '交易量',
    //   dataIndex: 'hold_volume_cn'
    // },
    // {
    //   title: '交易量',
    //   dataIndex: 'hold_ratio_cn'
    // },
    // {
    //   title: '交易量',
    //   dataIndex: 'net_volume_cn'
    // },
    // {
    //   title: 'xx量',
    //   dataIndex: 'hold_volume_hk'
    // },
    // {
    //   title: '交易量',
    //   dataIndex: 'hold_ratio_hk'
    // },
    // {
    //   title: '交易量',
    //   dataIndex: 'net_volume_hk'
    // },
  //   {
  //     title: '操作',
  //     dataIndex: '',
  //     width: '30px',
  //     render: (v, data) => <Button type="link">查看</Button>
  //  }
  ]
}