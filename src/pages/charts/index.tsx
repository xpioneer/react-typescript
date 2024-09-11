import * as React from 'react'
import DayChart from './day'
import styles from './style.module.scss'

export default function ChartPage() {

  return (
    <div className={styles.chartW}>
      <h2>Request for information from around the world</h2>
      <DayChart />
    </div>
  )
}
