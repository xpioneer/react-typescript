
export interface ErrorLog {
  id: string

  host: string

  ip: string

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

  errors: string[]

  createdAt: string
}


export type ErrorQuery = {
  url: string
  path: string
  msg: string
  createdAt: string
  _createdAt?: [Date, Date]
}