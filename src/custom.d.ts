import { MessageInstance } from 'antd/lib/message/interface'
import { NotificationInstance } from 'antd/lib/notification/interface'
import { AxiosStatic } from 'axios'

declare global {

  const $http: AxiosStatic

  const $msg: MessageInstance
  
  const $notice: NotificationInstance
  
  interface ICommonProps<P extends AnyObject = any> {
    [key: string]: P
  }
}
