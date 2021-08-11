import { MessageApi } from 'antd/lib/message'
import { NotificationApi } from 'antd/lib/notification'
import { RouteComponentProps } from 'react-router-dom'
import { AxiosStatic } from 'axios'


declare global {
  
  export const $msg: MessageApi
  
  export const $notice: NotificationApi
  
  export interface IProps extends RouteComponentProps {
    [key: string]: any
  }

  interface IResponseData<T = any> {
    data: T
    msg: string
    status: number
  }

  interface IPageData<T = any> {
    data: T[]
    meta: {
      count?: number
      page: number
      pageSize: number
      total?: number
      totalPage?: number
      showTotal?: (total: number) => React.ReactNode
    }
    msg?: string
    status?: number
  }

  type IPageParams = Pick<IPageData['meta'], 'page' | 'pageSize'>
  
  interface IOption<V = any, L = string> {
    label: L
    value: V
  }
}