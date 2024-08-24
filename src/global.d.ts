import { MessageInstance } from 'antd/lib/message/interface'
import { NotificationInstance } from 'antd/lib/notification/interface'
import { RouteComponentProps } from 'react-router-dom'
import { AxiosStatic } from 'axios'


declare global {

  const $http: AxiosStatic
  
  const $msg: MessageInstance
  
  const $notice: NotificationInstance
  
  interface ICommonProps<P = AnyObject> extends RouteComponentProps<P>, AnyObject {
    [key: string]: any
  }

  interface IResponseData<T = any> {
    data: T
    msg: string
    status: number
  }

  type AnyObject<T = any> = Record<string, T>

  type GraphQLResponse<T = any, IsPageData = null> = {
    data: {
      [key in string]: IsPageData extends boolean ? IPageData<T> : T
    }
  }

  type XExtends<T, K extends string | number | symbol, V = any> = T & { [P in K]: V }
  
  interface IPager {
    count: number
    current: number
    page: number
    pageSize: number
    total: number
    totalPage: number
    showTotal: (total: number) => React.ReactNode
  }

  interface IPageData<T = any> {
    list?: T[]
    data: T[]
    meta: Partial<IPager>
    msg?: string
    status?: number
  }

  type IPageParams = Pick<IPageData['meta'], 'page' | 'pageSize'>
  
  interface IOption<V = any, L = string> {
    label: L
    value: V
  }
}


declare const styles: { [className: string]: string }

declare module '*.scss' {
  export default styles;
}

declare module '*.module.scss' {
  export default styles;
}
