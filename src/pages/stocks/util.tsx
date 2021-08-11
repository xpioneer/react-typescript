import React, { useState, useEffect } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Stock, EMarket, EBlock } from '../../types/stock'
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