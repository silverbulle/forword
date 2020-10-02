import axios from 'axios'
import qs from 'query-string'

// 错误信息的响应方法
const errorHandle = (status, other) => {
  switch (status) {
    case 400:
      console.log('400')
      break
    case 401:
      console.log('401')
      break
    case 403:
      console.log('403')
      break
    case 404:
      console.log('404')
      break
    default:
      console.log(other)
      break
  }
}

// 创建axios对象
const instance = axios.create({
  timeout: 5000 // 请求超时
})

// 全局配置
instance.defaults.baseURL = 'http://39.105.91.30:6669'
// instance.defaults.headers.common ['Authorization'] = AUTH_TOKEN;
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 创建请求拦截和响应拦截
instance.interceptors.request.use(config => {
  if (confirm.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
},
error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response),
  error => {
    const { response } = error
    if (response) {
      errorHandle(response.status, response.data)
      return Promise.reject(response)
    } else {
      console.log('请求中断或没有网络')
    }
  }
)

export default axios
