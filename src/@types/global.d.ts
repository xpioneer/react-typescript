import { MessageApi } from 'antd/lib/message'
import { NotificationApi } from 'antd/lib/notification'
import { RouteComponentProps } from 'react-router-dom'
import { AxiosInstance } from 'axios'

declare global {
  export const $http: AxiosInstance
  
  export const $msg: MessageApi
  
  export const $notice: NotificationApi
  
  export interface IProps extends RouteComponentProps {
    [key: string]: any
  }
}