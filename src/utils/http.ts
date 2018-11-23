import axios from 'axios'

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
  // config.headers['SourceHead'] = 'H5'
  return config
}, error => {
  return Promise.reject(error)
})

$http.interceptors.response.use(response => {
  return Promise.resolve(response.data)
}, error => {
  return Promise.reject(error.response.data)
})

export default $http
