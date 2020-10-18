import axios from 'axios'
import qs from 'query-string'

// 错误信息的响应方法
const errorHandle = (status, other) => {
  switch (status) {
    case 400:
      console.log('400')
      break
    case 401:
      alert("权限验证失败，请登陆后使用")
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
// alert("进入request")
localStorage.Authorization =""
// 创建axios对象
const instance = axios.create({
  timeout: 5000 // 请求超时
})

// 全局配置
// instance.defaults.baseURL = 'http://39.105.91.30:6669'
// instance.defaults.headers.common ['Authorization'] = localStorage.getItem('Authorization').replace(/Token/,"");
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 创建请求拦截和响应拦截
instance.interceptors.request.use(config => {
  // config.headers['aaaaatest'] = "test111111111";
  
// if(localStorage)
config.headers['Authorization'] = localStorage.getItem('Authorization').replace(/Token/, ""); // 根据实际情况自行修改    


  // config.headers.Authorization = localStorage.getItem('Authorization');
  // loadingInstance = Loading.service({       // 发起请求时加载全局loading，请求失败或有响应时会关闭
  //   spinner: 'fa fa-spinner fa-spin fa-3x fa-fw',
  //   text: '拼命加载中...'
  // })

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

export default instance;
