import { MessageApi } from 'antd/lib/message'
import { NotificationApi } from 'antd/lib/notification'
import { RouteComponentProps } from 'react-router-dom'
import { AxiosStatic } from 'axios'


declare global {

  const $http: AxiosStatic
  
  const $msg: MessageApi
  
  const $notice: NotificationApi
  
  interface ICommonProps extends RouteComponentProps {
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