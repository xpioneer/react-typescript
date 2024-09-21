import React, { useEffect } from 'react'
import { useData } from './useData'
import styles from './style.module.scss'
import { Col, Row } from 'antd'

export default function Dashboard() {
  const {
    visitRef,
    geoRef,
    earthRef,
    pathRef,
    statusRef,
    earthBDRef,
  } = useData()

  return <div className={styles.dashboard}>
    <h2>Request for Information from Around the World</h2>
    <div className={styles.chart} style={{height: 600}} ref={visitRef}></div>
    <div className={styles.chart} style={{height: 600}} ref={geoRef}></div>
    <div className={styles.chart} style={{height: 600}} ref={earthRef}></div>
    <div className={styles.chart} ref={pathRef}></div>
    <div className={styles.chart} ref={statusRef}></div>
    <div className={styles.chart} style={{height: 600}} ref={earthBDRef}></div>
  </div>
}