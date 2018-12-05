import { MessageApi } from 'antd/lib/message'
import { RouteComponentProps } from 'react-router-dom'
import { AxiosInstance } from 'axios'

declare global {
  export const $http: AxiosInstance
  
  export const $msg: MessageApi
  
  export interface IProps extends RouteComponentProps {
    [key: string]: any
  }
}