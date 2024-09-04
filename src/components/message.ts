import { App } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import type { ModalStaticFunctions } from 'antd/es/modal/confirm'
import type { NotificationInstance } from 'antd/es/notification/interface'

let message: MessageInstance
let notification: NotificationInstance
let modal: Omit<ModalStaticFunctions, 'warn'>

export default function useAntApp() {
  const app = App.useApp()
  message = app.message
  modal = app.modal
  notification = app.notification
  return { message, notification, modal }
}

export { message, notification, modal }