import { LoginForm } from "types/account"
import $http from '@utils/http'


export const onLogin = (data: LoginForm) => {
  return $http.post<string>('/login', data).then(res => res.data)
}