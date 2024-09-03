import React, { useEffect } from 'react'
import { useData } from './useData'
import styles from './style.module.scss'

export default function Dashboard() {
  const {
    pathRef,
    statusRef,
  } = useData()

  return <div className={styles.dashboard} style={{width: '100%'}}>
    <h2>Welcome to Dashboard!</h2>
    <div className={styles.chart} ref={pathRef}></div>
    <div className={styles.chart} ref={statusRef}></div>
  </div>
}