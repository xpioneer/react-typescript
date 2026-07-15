import axios from 'axios'
import { AxiosResponse, AxiosError } from 'axios'
import { storage } from '@utils/tools'
import { JWT_TOKEN } from '@constants/index'
import helper from './httpHelper'
import { APISource } from '@/types/demo'
import { message as $msg } from '@components/message'

export const $http = axios.create({
  baseURL: '',
  responseType: 'json',
  timeout: 60000 * 2
})

$http.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + storage.get(JWT_TOKEN)
  if (config.baseURL?.startsWith(APISource.Quantification)) {
    config.data = helper.transformKeysToSnake(config.data)
    config.params = helper.transformKeysToSnake(config.params)
  }
  return config
}, error => {
  return Promise.reject(error)
})

$http.interceptors.response.use(response => {
  helper.successHelper(response)
  // console.log('response>>:', response)
  if (response.data.errors) {
    return Promise.reject(response.data.data)
  } else {
    return Promise.resolve(response.data) // status:200, normal
  }
}, (error: AxiosError<IResponseData>) => {
  // console.log(error, 'error')
  if (error.response && /^[456]\d{2}$/.test(`${error.response.status}`)) {
    helper.errorHelper(error.response)
  } else {
    $msg.error(error.toString()) // other err: code error
  }
  return Promise.reject(error.response?.data)
})

export default $http
