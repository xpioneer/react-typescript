import * as React from 'react'
import DayChart from './day'
import styles from './style.module.scss'

export default function ChartPage() {

  return (
    <div className={styles.chartW}>
      <h2>Date Matrix and Line Graphs of Requests from Around the World</h2>
      <DayChart />
    </div>
  )
}
