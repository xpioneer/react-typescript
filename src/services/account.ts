import { LoginForm } from "types/account"
import $http from '@utils/http'


export const onLogin = (data: LoginForm) => {
  return $http.post<string>('/api/login', data).then(res => res.data)
}

export const onLogout = () => {
  return $http.post('/api/logout', {}).then((res: any) => {
    // storage.remove(JWT_TOKEN)
    // location.replace('/login')
  }, err => {
    // $msg.error(err.msg)
  })
}