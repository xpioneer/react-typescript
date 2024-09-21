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
  } = useData()

  return <div className={styles.dashboard}>
    <h2>Welcome to Dashboard!</h2>
    <div className={styles.chart} style={{height: 600}} ref={visitRef}></div>
    <div className={styles.chart} style={{height: 600}} ref={geoRef}></div>
    <div className={styles.chart} style={{height: 600}} ref={earthRef}></div>
    <Row>
      <Col span={24}>
        <div className={styles.chart} ref={pathRef}></div>
      </Col>
    </Row>
    <div className={styles.chart} ref={statusRef}></div>
  </div>
}