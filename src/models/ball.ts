import { BaseModel } from './base'

export interface Ball extends BaseModel {

  issue: number

  red1: number

  red2: number

  red3: number
  
  red4: number
  
  red5: number
  
  red6: number

  reds: number[]
  
  blue: number | number[]

  pool: number

  drawDate: string
}

export interface ChartOption {
  name: string
  value: number
}

export interface BallChart {
  reds: ChartOption[]
  blues: ChartOption[]
  redDisList: ChartOption[][]
}