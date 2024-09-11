import React, { useEffect, useState } from 'react'
import { useChart } from './useChart'
import { Spin } from 'antd'
import styles from '../style.module.scss'

export default function Chart() {

  const {
    loading,
    heatRef,
    chartRef,
  } = useChart()

  return (
    <Spin spinning={loading}>
      <div className={styles.chart} ref={heatRef} />
      <div className={styles.chart} ref={chartRef} />
    </Spin>
  )
}
