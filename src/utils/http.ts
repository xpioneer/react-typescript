import axios from 'axios'
import { AxiosResponse, AxiosError } from 'axios'
import { storage } from '@utils/tools'
import { JWT_TOKEN } from '@constants/index'
import helper from './httpHelper'

const $http = axios.create({
  baseURL: '',
  responseType: 'json',
  transformResponse: [function (data) {
    return data
  }],
  timeout: 60000 * 2
})

$http.interceptors.request.use(config => {
  config.headers.common['Authorization'] = 'Bearer ' + storage.get(JWT_TOKEN)
  return config
}, error => {
  return Promise.reject(error)
})

$http.interceptors.response.use(response => {
  helper.successHelper(response)
  // console.log(response)
  if (response.data.errors) {
    return Promise.reject(response.data.data)
  } else {
    return Promise.resolve(response.data) // status:200, normal
  }
}, error => {
  if (error.response && /^[456]\d{2}$/.test(error.response.status)) {
    helper.errorHelper(error.response)
  } else {
    $msg.error(error.toString()) // other err: code error
  }
  return Promise.reject(error.response.data)
})

export default $http
