
export interface APILog {
  host: string

  path: string

  url: string

  params: any

  method: string

  origin: string

  hostname: string

  headers: any

  resHeaders: any

  resData: any

  time: number

  protocol: string

  status: number

  msg: string

  client: string
}

export type RequestStatus = 'default' | 'success' | 'warning' | 'error'

export type APIQuery = {
  url: string
  path: string
  createdAt: string
  _createdAt?: [Date, Date]
}