import { AxiosResponse } from 'axios'
import { REDIRECT_URL } from '@constants/index'
import { message as $msg } from 'components/message'
import { storage } from './tools'

class HttpHelper {

  public successHelper (res: AxiosResponse<any>): void {
    const url = res.config.url?.split('?')[0]!
    const {data: { errors }} = res
    switch (res.status) {
      case 200 :
        const path = url.split('/api')
        if (path[1] === '/login') {
          $msg.success('登陆成功')
        } else if (path[1] === '/logout') {
          storage.clear(true)
          sessionStorage.clear()
          $msg.success('退出登录成功')
          setTimeout(() => {
            location.href = '/login'
          }, 1000)
        } else if (path[1] === '/upload-file') {
          $msg.success('文件上传成功')
        } else if (path[0] === '/graphql' && errors) {
          $msg.error(errors[0].message) // graphql status:200 response contain errors
        } else {
          $msg.success('操作成功')
        }
        break
      default :
        //
        break
    }
  }

  public errorHelper (err: AxiosResponse): void {
    // console.log(err, 'err.data.msg.statusText')
    const path = err.config.url?.split('?')[0]!
    const data = err.data // server response data
    switch (err.status) {
      case 400 :
        const arr = path.split('/api')
        if (arr[1] === '/login') {
          $msg.error('用户名或密码错误')
        } else if (arr[1] === '/upload-file') {
          $msg.error('文件上传失败')
        } else if (arr[0]) {
          $msg.error(data.errors[0].message || 'graphql params error')
        } else {
          $msg.error(data.msg || err.statusText)
        }
        break
      case 401 :
        storage.clear(true)
        $msg.error('请重新登录')
        sessionStorage.setItem(REDIRECT_URL, location.pathname)
        setTimeout(() => {
          location.href = '/login'
        }, 1000)
        break
      case 403 :
        $msg.error(data.msg || '错误, 禁止访问')
        break
      case 404 :
        $msg.error('未找到, 未找到资源,请检查')
        break
      case 405 :
        $msg.error('错误, 此方法不允许')
        break
      case 406 :
        $msg.error('错误, 此方法不接受,请检查')
        break
      case 500 :
        $msg.error(data.msg || data.errors[0])
        break
      case 503 :
        $msg.error('连接被拒绝, 服务不可用')
        break
      case 504 :
        $msg.error('网关超时, 请与运维小郭联系')
        break
      default :
        $msg.error('错误, 服务端未知错误')
        break
    }
  }
}

export default new HttpHelper