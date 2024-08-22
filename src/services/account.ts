import { LoginForm, RegisterForm } from "types/account"
import $http from '@utils/http'
import { storage } from "@/utils/tools"
import { JWT_TOKEN } from "@/constants"


export const onLogin = (data: LoginForm) => {
  return $http.post<string>('/api/login', data).then(res => res.data)
}

export const onLogout = () => {
  return $http.post('/api/logout', {}).then((res: any) => {
    storage.remove(JWT_TOKEN)
    location.replace('/login')
  }, err => {
    // $msg.error(err.msg)
  })
}


export const onCreate = (data: LoginForm) => {
  return $http.post<void>('/api/register', data).then(res => res.data)
}
