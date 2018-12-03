import axios from 'axios'
import { storage } from '@utils/tools'
import { JWT_TOKEN } from '@constants/index'

const $http = axios.create({
  baseURL: '',
  transformResponse: [function (data) {
    if (typeof data === 'string') {
      return JSON.parse(data)
    }
    return data
  }],
  timeout: 30000
})

$http.interceptors.request.use(config => {
  config.headers['Authorization'] = 'Bearer ' + storage.get(JWT_TOKEN)
  return config
}, error => {
  return Promise.reject(error)
})

$http.interceptors.response.use(response => {
  const {config: {url}, data: {errors}} = response
  if(url === '/graphql' && errors) {
    $msg.error(errors[0].message)
  }
  return Promise.resolve(response.data)
}, error => {
  return Promise.reject(error.response.data)
})

export default $http
